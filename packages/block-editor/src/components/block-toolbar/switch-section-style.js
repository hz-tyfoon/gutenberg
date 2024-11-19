/**
 * WordPress dependencies
 */
import {
	ToolbarButton,
	ToolbarGroup,
	Dropdown,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	Icon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { color } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BlockStyles from '../block-styles';
import useStylesForBlocks from '../block-styles/use-styles-for-block';

const POPOVER_PROPS = {
	placement: 'bottom-start',
};

function SwitchSectionStyle( { clientId } ) {
	const { stylesToRender } = useStylesForBlocks( { clientId } );

	if ( ! stylesToRender || stylesToRender.length === 0 ) {
		return null;
	}

	return (
		<Dropdown
			popoverProps={ POPOVER_PROPS }
			renderToggle={ ( { onToggle, isOpen } ) => {
				return (
					<ToolbarGroup>
						<ToolbarButton
							onClick={ () => onToggle( ! isOpen ) }
							aria-expanded={ isOpen }
							label={ __( 'Styles' ) }
						>
							<Icon icon={ color } />
						</ToolbarButton>
					</ToolbarGroup>
				);
			} }
			renderContent={ () => (
				<DropdownContentWrapper
					className="block-editor-block-toolbar-change-design-content-wrapper"
					paddingSize="none"
				>
					<BlockStyles clientId={ clientId } />
				</DropdownContentWrapper>
			) }
		/>
	);
}

export default SwitchSectionStyle;
