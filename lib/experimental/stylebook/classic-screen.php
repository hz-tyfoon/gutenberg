<?php
/**
 * Set up a screen to show stylebook for classic themes.
 *
 * @package gutenberg
 */

 /**
  * Add a Styles submenu link for Classic themes. 
  */
function gutenberg_add_styles_link() {
    if ( ! wp_is_block_theme() ) {
        add_theme_page(
            __( 'Styles', 'gutenberg' ),
            __( 'Styles', 'gutenberg' ),
            'edit_theme_options',
            'gutenberg-classic-stylebook',
            'gutenberg_classic_stylebook_render',
            3
        );
    }
}
add_action( 'admin_menu', 'gutenberg_add_styles_link' );

if ( isset( $_GET['page'] ) && 'gutenberg-classic-stylebook' === $_GET['page'] ) {
	// Default to is-fullscreen-mode to avoid jumps in the UI.
	add_filter(
		'admin_body_class',
		static function ( $classes ) {
			return "$classes is-fullscreen-mode";
		}
	);
}

/**
 * Render the Styles page for Classic themes. 
 */

function gutenberg_classic_stylebook_render() {
    $block_editor_context = new WP_Block_Editor_Context( array( 'name' => 'core/edit-site' ) );
    $custom_settings      = array(
		'siteUrl'        => site_url(),
		'styles'         => get_block_editor_theme_styles(),
		'supportsLayout' => wp_theme_has_theme_json(),
	);

	$editor_settings         = get_block_editor_settings( $custom_settings, $block_editor_context );
	$active_global_styles_id = WP_Theme_JSON_Resolver_Gutenberg::get_user_global_styles_post_id();
	$active_theme            = get_stylesheet();

	$preload_paths = array(
		array( '/wp/v2/media', 'OPTIONS' ),
		'/wp/v2/types?context=view',
		'/wp/v2/global-styles/' . $active_global_styles_id . '?context=edit',
		'/wp/v2/global-styles/' . $active_global_styles_id,
		'/wp/v2/global-styles/themes/' . $active_theme,
	);
	block_editor_rest_api_preload( $preload_paths, $block_editor_context );

    // Preload server-registered block schemas.
	wp_add_inline_script(
		'wp-blocks',
		'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . wp_json_encode( get_block_editor_server_block_settings() ) . ');'
	);

	/** This action is documented in wp-admin/edit-form-blocks.php */
	do_action( 'enqueue_block_editor_assets' );
	wp_register_style(
		'wp-gutenberg-classic-stylebook',
		gutenberg_url( 'build/edit-site/classic-stylebook.css', __FILE__ ),
		array( 'wp-components', 'wp-commands', 'wp-edit-site' )
	);
	wp_enqueue_style( 'wp-gutenberg-classic-stylebook' );
	wp_add_inline_script(
		'wp-edit-site',
		sprintf(
			'wp.domReady( function() {
				wp.editSite.initializeClassicStylebook( "gutenberg-classic-stylebook", %s );
			} );',
			wp_json_encode( $editor_settings )
		)
	);
	wp_enqueue_script( 'wp-edit-site' );
	wp_enqueue_media();

    echo '<div id="gutenberg-classic-stylebook" class="edit-site"></div>';
}