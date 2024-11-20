/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import { StyleBookPreview } from '../style-book';

export const classicStylebookRoute = {
	name: 'classic-stylebook',
	match: ( params ) => {
		return (
			params.page &&
			params.page.startsWith( 'gutenberg-classic-stylebook' ) &&
			params.canvas !== 'edit'
		);
	},
	areas: {
		sidebar: (
			<SidebarNavigationScreen
				title={ __( 'Styles' ) }
				description={ __( 'Overview of styled blocks.' ) }
				isRoot
			/>
		),
		preview: <StyleBookPreview />,
		mobile: <StyleBookPreview />,
	},
	widths: {
		content: 380,
	},
};
