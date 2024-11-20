/**
 * WordPress dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { backup } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import SidebarNavigationItem from '../sidebar-navigation-item';

export default function SidebarNavigationScreenDetailsFooter( {
	revisionsCount,
	...otherProps
} ) {
	return (
		<ItemGroup
			size="large"
			className="edit-site-sidebar-navigation-screen-details-footer"
		>
			<SidebarNavigationItem icon={ backup } { ...otherProps }>
				{ sprintf(
					/* translators: %d: Number of Styles revisions. */
					_n( '%d Revision', '%d Revisions', revisionsCount ),
					revisionsCount
				) }
			</SidebarNavigationItem>
		</ItemGroup>
	);
}
