/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
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
 * @param {number}   root0.windowInnerWidth    The height of the inner window
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
	windowInnerWidth,
	isZoomedOut,
	scaleContainerWidth,
} ) {
	const prefersReducedMotion = useReducedMotion();

	const prevScaleRef = useRef( scale );
	const prevFrameSizeRef = useRef( frameSize );
	const prevClientHeightRef = useRef( /* Initialized in the useEffect. */ );

	useEffect( () => {
		if (
			! iframeDocument ||
			// HACK: Checking if isZoomedOut differs from prevIsZoomedOut here
			// instead of the dependency array to appease the linter.
			( scale === 1 ) === ( prevScaleRef.current === 1 )
		) {
			return;
		}

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
			( scrollTopNext + clientHeight / 2 ) * scale +
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
			scrollHeight * ( scale / prevScale ) + frameSize * 2 - clientHeight;

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

		function onZoomOutTransitionEnd() {
			// Remove the position fixed for the animation.
			iframeDocument.documentElement.classList.remove(
				'zoom-out-animation'
			);

			// Update previous values.
			prevClientHeightRef.current = clientHeight;
			prevFrameSizeRef.current = frameSize;
			prevScaleRef.current = scale;

			// Set the final scroll position that was just animated to.
			iframeDocument.documentElement.scrollTop = scrollTopNext;
		}

		let raf;
		if ( prefersReducedMotion ) {
			// Hack: Wait for the window values to recalculate.
			raf = iframeDocument.defaultView.requestAnimationFrame(
				onZoomOutTransitionEnd
			);
		} else {
			iframeDocument.documentElement.addEventListener(
				'transitionend',
				onZoomOutTransitionEnd,
				{ once: true }
			);
		}

		return () => {
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-scroll-top'
			);
			iframeDocument.documentElement.style.removeProperty(
				'--wp-block-editor-iframe-zoom-out-scroll-top-next'
			);
			iframeDocument.documentElement.classList.remove(
				'zoom-out-animation'
			);
			if ( prefersReducedMotion ) {
				iframeDocument.defaultView.cancelAnimationFrame( raf );
			} else {
				iframeDocument.documentElement.removeEventListener(
					'transitionend',
					onZoomOutTransitionEnd
				);
			}
		};
	}, [ iframeDocument, scale, frameSize, prefersReducedMotion ] );

	// Toggle zoom out CSS Classes only when zoom out mode changes. We could add these into the useEffect
	// that controls settings the CSS variables, but then we would need to do more work to ensure we're
	// only toggling these when the zoom out mode changes, as that useEffect is also triggered by a large
	// number of dependencies.
	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		if ( isZoomedOut ) {
			iframeDocument.documentElement.classList.add( 'is-zoomed-out' );
		} else {
			// HACK: Since we can't remove this in the cleanup, we need to do it here.
			iframeDocument.documentElement.classList.remove( 'is-zoomed-out' );
		}

		return () => {
			// HACK: Skipping cleanup because it causes issues with the zoom out
			// animation. More refactoring is needed to fix this properly.
			// iframeDocument.documentElement.classList.remove( 'is-zoomed-out' );
		};
	}, [ iframeDocument, isZoomedOut ] );

	// Calculate the scaling and CSS variables for the zoom out canvas
	useEffect( () => {
		if ( ! iframeDocument ) {
			return;
		}

		// Note: When we initialize the zoom out when the canvas is smaller (sidebars open),
		// initialContainerWidth will be smaller than the full page, and reflow will happen
		// when the canvas area becomes larger due to sidebars closing. This is a known but
		// minor divergence for now.

		// This scaling calculation has to happen within the JS because CSS calc() can
		// only divide and multiply by a unitless value. I.e. calc( 100px / 2 ) is valid
		// but calc( 100px / 2px ) is not.
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
		windowInnerWidth,
		isZoomedOut,
		scaleContainerWidth,
	] );
}
