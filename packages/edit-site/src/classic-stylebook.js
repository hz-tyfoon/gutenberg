/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import {
	registerCoreBlocks,
	__experimentalGetCoreBlocks,
	__experimentalRegisterExperimentalCoreBlocks,
} from '@wordpress/block-library';
import { dispatch, useSelect } from '@wordpress/data';
import { createRoot, StrictMode } from '@wordpress/element';
import {
	registerLegacyWidgetBlock,
	registerWidgetGroupBlock,
} from '@wordpress/widgets';
import {
	UnsavedChangesWarning,
	privateApis as editorPrivateApis,
} from '@wordpress/editor';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { useResizeObserver } from '@wordpress/compose';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './hooks';
import { store as editSiteStore } from './store';
import Layout from './components/layout';
import { unlock } from './lock-unlock';
import SidebarNavigationScreenMain from './components/sidebar-navigation-screen-main/index.js';
import { StyleBookBody } from './components/style-book';
import { getExamples } from './components/style-book/examples';

const { RouterProvider } = unlock( routerPrivateApis );
const { GlobalStylesProvider } = unlock( editorPrivateApis );

function ClassicStylebookLayout() {
	const [ resizeObserver, sizes ] = useResizeObserver();
	const settings = useSelect(
		( select ) => select( blockEditorStore ).getSettings(),
		[]
	);

	const examples = getExamples();
	const route = {
		name: 'stylebook',
		areas: {
			sidebar: <SidebarNavigationScreenMain />,
			preview: (
				<StyleBookBody
					enableResizing={ false }
					showCloseButton={ false }
					showTabs={ false }
					isSelected={ () => null }
					onSelect={ () => null }
					examples={ examples }
					onClick={ () => null }
					settings={ settings }
					sizes={ sizes }
					goTo={ {} }
				/>
			),
		},
	};
	return (
		<>
			{ resizeObserver }
			<Layout route={ route } />
		</>
	);
}

/**
 * Initializes the classic stylebook.
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} settings Editor settings.
 */
export function initializeClassicStylebook( id, settings ) {
	if ( ! globalThis.IS_GUTENBERG_PLUGIN ) {
		return;
	}
	const target = document.getElementById( id );
	const root = createRoot( target );

	dispatch( blocksStore ).reapplyBlockTypeFilters();
	const coreBlocks = __experimentalGetCoreBlocks().filter(
		( { name } ) => name !== 'core/freeform'
	);
	registerCoreBlocks( coreBlocks );
	dispatch( blocksStore ).setFreeformFallbackBlockName( 'core/html' );
	registerLegacyWidgetBlock( { inserter: false } );
	registerWidgetGroupBlock( { inserter: false } );
	if ( globalThis.IS_GUTENBERG_PLUGIN ) {
		__experimentalRegisterExperimentalCoreBlocks( {
			enableFSEBlocks: true,
		} );
	}

	dispatch( editSiteStore ).updateSettings( settings );

	root.render(
		<StrictMode>
			<GlobalStylesProvider>
				<UnsavedChangesWarning />
				<RouterProvider>
					<ClassicStylebookLayout />
				</RouterProvider>
			</GlobalStylesProvider>
		</StrictMode>
	);

	return root;
}
