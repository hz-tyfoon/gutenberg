/**
 * WordPress dependencies
 */
import { useEffect, useRef, useCallback } from '@wordpress/element';
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
 * Compute the next scrollTop position after scaling the iframe content.
 *
 * @param {number} scrollTop      Current scrollTop position of the iframe
 * @param {number} scrollHeight   Scaled height of the current iframe content.
 * @param {Object} transitionFrom The starting point of the transition
 * @param {Object} transitionTo   The ending state of the transition
 * @return {number} The next scrollTop position after scaling the iframe content.
 */
function computeScrollTopNext(
	scrollTop,
	scrollHeight,
	transitionFrom,
	transitionTo
) {
	const {
		clientHeight: prevClientHeight,
		frameSize: prevFrameSize,
		scaleValue: prevScale,
	} = transitionFrom;
	const { clientHeight, frameSize, scaleValue } = transitionTo;
	// Step 0: Start with the current scrollTop.
	let scrollTopNext = scrollTop;
	// Step 1: Undo the effects of the previous scale and frame around the
	// midpoint of the visible area.
	scrollTopNext =
		( scrollTopNext + prevClientHeight / 2 - prevFrameSize ) / prevScale -
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
	return Math.round(
		Math.min( Math.max( 0, scrollTopNext ), Math.max( 0, maxScrollTop ) )
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
	const startAnimationRef = useRef( false );
	const animationRef = useRef( null );

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
	const isAutoScaled = scale === 'auto-scaled';

	const scaleValue = isAutoScaled
		? calculateScale( {
				frameSize,
				containerWidth,
				maxContainerWidth,
				scaleContainerWidth,
		  } )
		: scale;

	const transitionFrom = useRef( {
		scaleValue,
		frameSize,
		clientHeight: 0,
		scrollTopNext: 0,
	} );

	const transitionTo = useRef( {
		scaleValue,
		frameSize,
		clientHeight: 0,
		scrollTopNext: 0,
	} );

	const onZoomOutTransitionEnd = useCallback( () => {
		startAnimationRef.current = false;
		animationRef.current = null;

		// Add our final scale and frame size now that the animation is done.
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-scale',
			transitionTo.current.scaleValue
		);
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-frame-size',
			`${ transitionTo.current.frameSize }px`
		);

		iframeDocument.documentElement.classList.remove( 'zoom-out-animation' );

		// Set the final scroll position that was just animated to.
		iframeDocument.documentElement.scrollTop =
			transitionTo.current.scrollTopNext;

		iframeDocument.documentElement.style.removeProperty(
			'--wp-block-editor-iframe-zoom-out-scroll-top'
		);
		iframeDocument.documentElement.style.removeProperty(
			'--wp-block-editor-iframe-zoom-out-scroll-top-next'
		);

		// Update previous values.
		transitionFrom.current = transitionTo.current;
	}, [ iframeDocument ] );

	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		if ( isZoomedOut ) {
			iframeDocument.documentElement.classList.add( 'is-zoomed-out' );
		}

		startAnimationRef.current = true;

		return () => {
			iframeDocument.documentElement.classList.remove( 'is-zoomed-out' );
		};
	}, [ iframeDocument, isZoomedOut ] );

	// Calculate the scaling and CSS variables for the zoom out canvas
	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		if ( isAutoScaled && transitionFrom.current.scaleValue !== 1 ) {
			// We need to update the appropriate scale to exit from. If sidebars have been opened since setting the
			// original scale, we will snap to a much smaller scale due to the scale container changing size when exiting.
			// We use containerWidth as the divisor, as scaleContainerWidth will always match the containerWidth when
			// exiting.
			transitionFrom.current.scaleValue = calculateScale( {
				containerWidth,
				maxContainerWidth,
				scaleContainerWidth: containerWidth,
				frameSize: transitionFrom.current.frameSize,
			} );
		}

		// If we are not going to animate the transition set them directly.
		// Example: Opening sidebars that reduce the scale of the canvas.
		if ( ! startAnimationRef.current ) {
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

		const clientHeight = iframeDocument.documentElement.clientHeight;
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-inner-height',
			`${ clientHeight }px`
		);

		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-container-width',
			`${ containerWidth }px`
		);
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-scale-container-width',
			`${ scaleContainerWidth }px`
		);

		/**
		 * Handle the zoom out animation:
		 * - get the current scroll
		 * - calculate the same scroll position after scaling
		 * - apply fixed positioning to the canvas with a transform offset
		 *   to keep the canvas centered
		 * - animate the scale and padding to the new scale and frame size
		 * - after the animation is complete, remove the fixed positioning
		 *   and set the scroll position that keeps everything centered
		 */

		const prevScale = transitionFrom.current.scaleValue;
		if ( startAnimationRef.current ) {
			// Don't allow a new transition to start again unless it was started by the zoom out mode changing.
			startAnimationRef.current = false;

			if ( animationRef.current ) {
				// When reversing the animation, we'll need to know:
				// - The scroll position we started from before the animation.
				//   Otherwise, it will always report as 0 because of the fixed positioning.
				//   This can be used for the `scrollTopNext` value.
				// - The previous client height, as it's used in the finishing state of the animation.
				animationRef.current.reverse();
				// Swap the transition values so that we can reverse the animation.
				const tempTransitionFrom = transitionFrom.current;
				const tempTransitionTo = transitionTo.current;
				transitionFrom.current = tempTransitionTo;
				transitionTo.current = tempTransitionFrom;
			}

			// Only start a new animation if the scale has changed. Otherwise we're just updating the CSS variables
			// or reversing the animation.
			else if ( scaleValue !== prevScale ) {
				// Unscaled size of the previous padding around the iframe content.
				const prevFrameSize = transitionFrom.current.frameSize;

				// Unscaled height of the previous iframe container.
				const prevClientHeight =
					transitionFrom.current.clientHeight ?? clientHeight;

				// We can't trust the set value from contentHeight, as it was measured
				// before the zoom out mode was changed. After zoom out mode is changed,
				// appenders may appear or disappear, so we need to get the height from
				// the iframe at this point when we're about to animate the zoom out.
				// The iframe scrollTop, scrollHeight, and clientHeight will all be
				// accurate. The client height also does change when the zoom out mode
				// is toggled, as the bottom bar about selecting the template is
				// added/removed when toggling zoom out mode.
				const scrollTop = iframeDocument.documentElement.scrollTop;

				transitionFrom.current = {
					scaleValue: prevScale,
					frameSize: prevFrameSize,
					clientHeight: prevClientHeight,
					scrollTopNext: scrollTop,
				};

				transitionTo.current = {
					scaleValue,
					frameSize,
					clientHeight,
				};

				const scrollTopNext = computeScrollTopNext(
					scrollTop,
					iframeDocument.documentElement.scrollHeight,
					transitionFrom.current,
					transitionTo.current
				);

				transitionTo.current.scrollTopNext = scrollTopNext;

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
				animationRef.current = iframeDocument.documentElement.animate(
					[
						{
							translate: `0 0`,
							scale: prevScale,
							paddingTop: `${ prevFrameSize / prevScale }px`,
							paddingBottom: `${ prevFrameSize / prevScale }px`,
						},
						{
							translate: `0 ${ scrollTop - scrollTopNext }px`,
							scale: scaleValue,
							paddingTop: `${ frameSize / scaleValue }px`,
							paddingBottom: `${ frameSize / scaleValue }px`,
						},
					],
					{
						easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
						duration: 400,
					}
				);

				if ( prefersReducedMotion ) {
					onZoomOutTransitionEnd();
				} else {
					animationRef.current.onfinish = onZoomOutTransitionEnd;
				}
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
		};
	}, [
		onZoomOutTransitionEnd,
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
