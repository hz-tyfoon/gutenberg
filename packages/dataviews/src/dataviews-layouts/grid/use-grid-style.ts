/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import type { Density, ViewGrid } from '../../types';

export default function useGridStyle( view: ViewGrid ) {
	const isXHuge = useViewportMatch( 'xhuge' );
	const isHuge = useViewportMatch( 'huge' );
	const isXlarge = useViewportMatch( 'xlarge' );
	const isMedium = useViewportMatch( 'small' );
	// The `medium` density (default) is handled with css. If another density is selected,
	// we query the viewport to determine the number of columns to display per option.
	if ( ! [ 'comfortable', 'compact' ].includes( view.density as Density ) ) {
		return;
	}

	let gridColumns;
	if ( isXHuge ) {
		gridColumns = { min: 4, max: 6 };
	} else if ( isHuge ) {
		gridColumns = { min: 3, max: 5 };
	} else if ( isXlarge ) {
		gridColumns = { min: 2, max: 4 };
	} else if ( isMedium ) {
		gridColumns = { min: 1, max: 3 };
	} else {
		// Default to mobile.
		gridColumns = { min: 1, max: 2 };
	}
	return {
		gridTemplateColumns: `repeat(${
			view.density === 'compact' ? gridColumns.max : gridColumns.min
		}, minmax(0, 1fr))`,
	};
}
