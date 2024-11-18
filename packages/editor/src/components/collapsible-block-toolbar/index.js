/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	BlockToolbar,
	store as blockEditorStore,
	privateApis as blockEditorPrivateApis,
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Button, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { next, previous } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const { useHasBlockToolbar } = unlock( blockEditorPrivateApis );

export default function CollapsibleBlockToolbar() {
	const { blockSelectionStart } = useSelect( ( select ) => {
		return {
			blockSelectionStart:
				select( blockEditorStore ).getBlockSelectionStart(),
		};
	}, [] );
	const hasBlockToolbar = useHasBlockToolbar();
	const [ isCollapsed, setIsCollapsed ] = useState( false );

	const hasBlockSelection = !! blockSelectionStart;

	if ( ! hasBlockToolbar ) {
		return null;
	}

	return (
		<>
			<div
				className={ clsx( 'editor-collapsible-block-toolbar', {
					'is-collapsed': isCollapsed || ! hasBlockSelection,
				} ) }
			>
				<BlockToolbar hideDragHandle />
			</div>
			<Popover.Slot name="block-toolbar" />
			<Button
				className="editor-collapsible-block-toolbar__toggle"
				icon={ isCollapsed ? next : previous }
				onClick={ () => {
					setIsCollapsed( ! isCollapsed );
				} }
				label={
					isCollapsed
						? __( 'Show block tools' )
						: __( 'Hide block tools' )
				}
				size="compact"
			/>
		</>
	);
}
