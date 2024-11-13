/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import { useReducedMotion } from '@wordpress/compose';

/**
 * Handles scaling the canvas for the zoom out mode and animating between
 * the states.
 *
 * @param {Object}   root0
 * @param {number}   root0.contentHeight       The height of the content in the iframe.
 * @param {number}   root0.containerWidth      The width of the container.
 * @param {number}   root0.frameSize           The size of the frame around the content.
 * @param {Document} root0.iframeDocument      The document of the iframe.
 * @param {boolean}  root0.isZoomedOut         Whether the canvas is in zoom out mode.
 * @param {number}   root0.scale               The scale of the canvas.
 * @param {number}   root0.scaleContainerWidth The width of the container at the scaled size.
 */
export function useScaleCanvas( {
	scale,
	frameSize,
	iframeDocument,
	contentHeight,
	containerWidth,
	isZoomedOut,
	scaleContainerWidth,
} ) {
	const prefersReducedMotion = useReducedMotion();
	const [ isAnimatingZoomOut, setIsAnimatingZoomOut ] = useState( false );
	const transitionToRef = useRef( {
		scale,
		frameSize,
	} );
	const prevScaleRef = useRef( scale );
	const prevFrameSizeRef = useRef( frameSize );
	const prevClientHeightRef = useRef( /* Initialized in the useEffect. */ );

	// New state for isZoomedOut in the iframe component. That state is updated when the animation is completed,
	// which causes the rerender to happen. Things that are in refs, now become state. ZoomOutAnimation is a state.
	// ZoomOutAnimation being removed.
	useEffect( () => {
		if ( ! iframeDocument || ! isAnimatingZoomOut ) {
			return;
		}
		const nextScale = transitionToRef.current.scale;
		const nextFrameSize = transitionToRef.current.frameSize;

		// Unscaled height of the current iframe container.
		const clientHeight = iframeDocument.documentElement.clientHeight;

		// Scaled height of the current iframe content.
		const scrollHeight = iframeDocument.documentElement.scrollHeight;

		// Previous scale value.
		const prevScale = prevScaleRef.current;

		// Unscaled size of the previous padding around the iframe content.
		const prevFrameSize = prevFrameSizeRef.current;

		// Unscaled height of the previous iframe container.
		const prevClientHeight = prevClientHeightRef.current ?? clientHeight;

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
			( scrollTopNext + clientHeight / 2 ) * nextScale +
			nextFrameSize -
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
			scrollHeight * ( nextScale / prevScale ) +
			nextFrameSize * 2 -
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

		iframeDocument.documentElement.classList.add( 'zoom-out-animation' );
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-frame-size',
			`${ nextFrameSize }px`
		);

		// We can change the scale and frame size here, because that's what we want to animate.
		// We don't want to update these values until the animation class has been added.
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-scale',
			nextScale
		);

		function onZoomOutTransitionEnd() {
			if ( isAnimatingZoomOut ) {
				setIsAnimatingZoomOut( false );

				// Update previous values.
				prevClientHeightRef.current = clientHeight;
				prevFrameSizeRef.current = nextFrameSize;
				prevScaleRef.current = nextScale;
			}
		}

		if ( prefersReducedMotion ) {
			onZoomOutTransitionEnd();
		} else {
			iframeDocument.documentElement.addEventListener(
				'transitionend',
				onZoomOutTransitionEnd,
				{ once: true }
			);
		}

		return () => {
			iframeDocument.documentElement.classList.remove(
				'zoom-out-animation'
			);
			// Set the final scroll position that was just animated to.
			iframeDocument.documentElement.scrollTop = scrollTopNext;

			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-scroll-top'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-scroll-top-next'
			);

			iframeDocument.documentElement.removeEventListener(
				'transitionend',
				onZoomOutTransitionEnd
			);
		};
	}, [ iframeDocument, prefersReducedMotion, isAnimatingZoomOut ] );

	// Calculate the scaling and CSS variables for the zoom out canvas
	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		// Set the value that we want to animate from.
		// We will update them after we add the animation class on next render.
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-scale',
			scale
		);

		// frameSize has to be a px value for the scaling and frame size to be computed correctly.
		iframeDocument.documentElement.style.setProperty(
			'--wp-block-editor-iframe-zoom-out-frame-size',
			`${ frameSize }px`
		);

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

		transitionToRef.current = {
			scale,
			frameSize,
		};

		return () => {
			// HACK: Skipping cleanup because it causes issues with the zoom out
			// animation. More refactoring is needed to fix this properly.
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-scale'
			// );
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-frame-size'
			// );
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-content-height'
			// );
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-inner-height'
			// );
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-container-width'
			// );
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-scale-container-width'
			// );
		};
	}, [
		scale,
		frameSize,
		iframeDocument,
		contentHeight,
		containerWidth,
		isZoomedOut,
		scaleContainerWidth,
	] );

	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		if ( isZoomedOut ) {
			iframeDocument.documentElement.classList.add( 'is-zoomed-out' );
		}

		setIsAnimatingZoomOut( true );

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

		return () => {
			iframeDocument.documentElement.classList.remove( 'is-zoomed-out' );

			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-scale'
			// );
			// iframeDocument.documentElement.style.removeProperty(
			// 	'--wp-block-editor-iframe-zoom-out-frame-size'
			// );
		};
	}, [ iframeDocument, isZoomedOut, setIsAnimatingZoomOut ] );
}
