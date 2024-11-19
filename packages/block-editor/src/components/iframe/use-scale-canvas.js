/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import { useReducedMotion, useResizeObserver } from '@wordpress/compose';

function calculateScale( {
	frameSize,
	containerWidth,
	scaleContainerWidth,
	maxContainerWidth,
} ) {
	return (
		( Math.min( containerWidth, maxContainerWidth ) - frameSize * 2 ) /
		scaleContainerWidth
	);
}

/**
 * Handles scaling the canvas for the zoom out mode and animating between
 * the states.
 *
 * @param {Object}        root0
 * @param {number}        root0.frameSize         The size of the frame around the content.
 * @param {Document}      root0.iframeDocument    The document of the iframe.
 * @param {number}        root0.maxContainerWidth The max width of the canvas to use as the starting scale point.
 * @param {number|string} root0.scale             The scale of the canvas. Can be an decimal between 0 and 1, 1, or 'auto-scaled'.
 *
 * @return {Object} An object containing the following properties:
 *                  isZoomedOut: A boolean indicating if the canvas is zoomed out.
 *                  scaleContainerWidth: The width of the container used to calculate the scale.
 *                  contentResizeListener: A resize observer for the content.
 *                  containerResizeListener: A resize observer for the container.
 */
export function useScaleCanvas( {
	frameSize,
	iframeDocument,
	maxContainerWidth = 750,
	scale,
} ) {
	const [ contentResizeListener, { height: contentHeight } ] =
		useResizeObserver();
	const [ containerResizeListener, { width: containerWidth } ] =
		useResizeObserver();

	const initialContainerWidthRef = useRef( 0 );
	const isZoomedOut = scale !== 1;
	const isAnimatingRef = useRef( false );

	useEffect( () => {
		if ( ! isZoomedOut ) {
			initialContainerWidthRef.current = containerWidth;
		}
	}, [ containerWidth, isZoomedOut ] );

	const scaleContainerWidth = Math.max(
		initialContainerWidthRef.current,
		containerWidth
	);

	const prefersReducedMotion = useReducedMotion();
	const [ isAnimatingZoomOut, setIsAnimatingZoomOut ] = useState( false );
	const isAutoScaled = scale === 'auto-scaled';

	const scaleValue = isAutoScaled
		? calculateScale( {
				frameSize,
				containerWidth,
				maxContainerWidth,
				scaleContainerWidth,
		  } )
		: scale;

	const prevScaleRef = useRef( scaleValue );
	const prevFrameSizeRef = useRef( frameSize );
	const prevClientHeightRef = useRef( /* Initialized in the useEffect. */ );

	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		if ( isZoomedOut ) {
			iframeDocument.documentElement.classList.add( 'is-zoomed-out' );
		}

		setIsAnimatingZoomOut( true );
		isAnimatingRef.current = true;

		return () => {
			iframeDocument.documentElement.classList.remove( 'is-zoomed-out' );
		};
	}, [ iframeDocument, isZoomedOut, setIsAnimatingZoomOut ] );

	// Calculate the scaling and CSS variables for the zoom out canvas
	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		if ( isAutoScaled && prevScaleRef.current !== 1 ) {
			// We need to update the appropriate scale to exit from. If sidebars have been opened since setting the
			// original scale, we will snap to a much smaller scale due to the scale container changing size when exiting.
			// We use containerWidth as the divisor, as scaleContainerWidth will always match the containerWidth when
			// exiting.
			prevScaleRef.current = calculateScale( {
				containerWidth,
				maxContainerWidth,
				scaleContainerWidth: containerWidth,
				frameSize: prevFrameSizeRef.current,
			} );
		}

		if ( isAnimatingZoomOut || isAnimatingRef.current ) {
			// Set the value that we want to animate from.
			// We will update them after we add the animation class on next render.
			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-scale',
				prevScaleRef.current
			);

			// frameSize has to be a px value for the scaling and frame size to be computed correctly.
			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-frame-size',
				`${ prevFrameSizeRef.current }px`
			);
		} else {
			// We will update them after we add the animation class on next render.
			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-scale',
				scaleValue
			);

			// frameSize has to be a px value for the scaling and frame size to be computed correctly.
			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-frame-size',
				`${ frameSize }px`
			);
		}

		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-content-height',
			`${ contentHeight }px`
		);
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-inner-height',
			`${ iframeDocument.documentElement.clientHeight }px`
		);

		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-container-width',
			`${ containerWidth }px`
		);
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-scale-container-width',
			`${ scaleContainerWidth }px`
		);

		let onZoomOutTransitionEnd = () => {};

		if ( isAnimatingZoomOut ) {
			// Unscaled height of the current iframe container.
			const clientHeight = iframeDocument.documentElement.clientHeight;

			// Scaled height of the current iframe content.
			const scrollHeight = iframeDocument.documentElement.scrollHeight;

			// Previous scale value.
			const prevScale = prevScaleRef.current;

			// Unscaled size of the previous padding around the iframe content.
			const prevFrameSize = prevFrameSizeRef.current;

			// Unscaled height of the previous iframe container.
			const prevClientHeight =
				prevClientHeightRef.current ?? clientHeight;

			// We can't trust the set value from contentHeight, as it was measured
			// before the zoom out mode was changed. After zoom out mode is changed,
			// appenders may appear or disappear, so we need to get the height from
			// the iframe at this point when we're about to animate the zoom out.
			// The iframe scrollTop, scrollHeight, and clientHeight will all be
			// accurate. The client height also does change when the zoom out mode
			// is toggled, as the bottom bar about selecting the template is
			// added/removed when toggling zoom out mode.
			const scrollTop = iframeDocument.documentElement.scrollTop;

			// Step 0: Start with the current scrollTop.
			let scrollTopNext = scrollTop;

			// Step 1: Undo the effects of the previous scale and frame around the
			// midpoint of the visible area.
			scrollTopNext =
				( scrollTopNext + prevClientHeight / 2 - prevFrameSize ) /
					prevScale -
				prevClientHeight / 2;

			// Step 2: Apply the new scale and frame around the midpoint of the
			// visible area.
			scrollTopNext =
				( scrollTopNext + clientHeight / 2 ) * scaleValue +
				frameSize -
				clientHeight / 2;

			// Step 3: Handle an edge case so that you scroll to the top of the
			// iframe if the top of the iframe content is visible in the container.
			// The same edge case for the bottom is skipped because changing content
			// makes calculating it impossible.
			scrollTopNext = scrollTop <= prevFrameSize ? 0 : scrollTopNext;

			// This is the scrollTop value if you are scrolled to the bottom of the
			// iframe. We can't just let the browser handle it because we need to
			// animate the scaling.
			const maxScrollTop =
				scrollHeight * ( scaleValue / prevScale ) +
				frameSize * 2 -
				clientHeight;

			// Step 4: Clamp the scrollTopNext between the minimum and maximum
			// possible scrollTop positions. Round the value to avoid subpixel
			// truncation by the browser which sometimes causes a 1px error.
			scrollTopNext = Math.round(
				Math.min(
					Math.max( 0, scrollTopNext ),
					Math.max( 0, maxScrollTop )
				)
			);

			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-scroll-top',
				`${ scrollTop }px`
			);

			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-scroll-top-next',
				`${ scrollTopNext }px`
			);

			iframeDocument.documentElement.classList.add(
				'zoom-out-animation'
			);
			// We can change the scale and frame size here, because that's what we want to animate.
			// We don't want to update these values until the animation class has been added.
			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-frame-size',
				`${ frameSize }px`
			);
			iframeDocument.documentElement.style.setProperty(
				'--wp-block-editor-iframe-zoom-out-scale',
				scaleValue
			);

			onZoomOutTransitionEnd = () => {
				isAnimatingRef.current = false;
				iframeDocument.documentElement.classList.remove(
					'zoom-out-animation'
				);
				setIsAnimatingZoomOut( false );

				// Update previous values.
				prevClientHeightRef.current = clientHeight;
				prevFrameSizeRef.current = frameSize;
				prevScaleRef.current = scaleValue;

				// Set the final scroll position that was just animated to.
				iframeDocument.documentElement.scrollTop = scrollTopNext;

				iframeDocument.documentElement.style.removeProperty(
					'--wp-block-editor-iframe-zoom-out-scroll-top'
				);
				iframeDocument.documentElement.style.removeProperty(
					'--wp-block-editor-iframe-zoom-out-scroll-top-next'
				);
			};

			if ( prefersReducedMotion ) {
				onZoomOutTransitionEnd();
			} else {
				iframeDocument.documentElement.addEventListener(
					'transitionend',
					onZoomOutTransitionEnd,
					{ once: true }
				);
			}
		}

		return () => {
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-scale'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-frame-size'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-content-height'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-inner-height'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-container-width'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-scale-container-width'
			);

			iframeDocument.documentElement.removeEventListener(
				'transitionend',
				onZoomOutTransitionEnd
			);
		};
	}, [
		isAnimatingZoomOut,
		isAutoScaled,
		scaleValue,
		frameSize,
		iframeDocument,
		contentHeight,
		containerWidth,
		maxContainerWidth,
		scaleContainerWidth,
	] );

	return {
		isZoomedOut,
		scaleContainerWidth,
		contentResizeListener,
		containerResizeListener,
	};
}
