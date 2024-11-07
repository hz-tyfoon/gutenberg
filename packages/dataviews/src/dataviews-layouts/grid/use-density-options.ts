/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';

export default function useDensityOptions() {
	const isXHuge = useViewportMatch( 'xhuge' );
	const isHuge = useViewportMatch( 'huge' );
	const isXlarge = useViewportMatch( 'xlarge' );
	const isLarge = useViewportMatch( 'large' );
	if ( isXHuge ) {
		return { min: 3, max: 6 };
	}
	if ( isHuge ) {
		return { min: 2, max: 4 };
	}
	if ( isXlarge ) {
		return { min: 2, max: 3 };
	}
	if ( isLarge ) {
		return { min: 1, max: 2 };
	}
	// Default to mobile.
	return { min: 1, max: 2 };
}
