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
import {
	store as blockEditorStore,
	BlockEditorProvider,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './hooks';
import { store as editSiteStore } from './store';
import Layout from './components/layout';
import { unlock } from './lock-unlock';
import SidebarNavigationScreen from './components/sidebar-navigation-screen/index.js';
import {
	StyleBookBody,
	getExamplesForSinglePageUse,
} from './components/style-book';
import { getExamples } from './components/style-book/examples';

const { RouterProvider } = unlock( routerPrivateApis );
const { GlobalStylesProvider } = unlock( editorPrivateApis );

function ClassicStylebookLayout() {
	const [ resizeObserver, sizes ] = useResizeObserver();
	const settings = useSelect(
		( select ) => select( blockEditorStore ).getSettings(),
		[]
	);

	const { colors, gradients } = useMultipleOriginColorsAndGradients();
	// Exclude the default colors and gradients.
	const themeColors = colors?.filter( ( color ) => color.slug === 'theme' );
	const themeGradients = gradients?.filter(
		( gradient ) => gradient.slug === 'theme'
	);

	const examples = getExamples( {
		colors: themeColors,
		gradients: themeGradients,
		duotones: [], // Classic themes don't support duotone palettes.
	} );

	// Dedupe the examples as they include all categories with repeat sections.
	const examplesForSinglePageUse = getExamplesForSinglePageUse( examples );

	const route = {
		name: 'stylebook',
		areas: {
			sidebar: (
				<SidebarNavigationScreen
					title={ __( 'Styles' ) }
					description={ __( 'Overview of styled blocks.' ) }
					isRoot
				/>
			),
			preview: (
				<StyleBookBody
					enableResizing={ false }
					showCloseButton={ false }
					showTabs={ false }
					examples={ examplesForSinglePageUse }
					settings={ settings }
					sizes={ sizes }
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
					<BlockEditorProvider settings={ settings }>
						<ClassicStylebookLayout />
					</BlockEditorProvider>
				</RouterProvider>
			</GlobalStylesProvider>
		</StrictMode>
	);

	return root;
}
