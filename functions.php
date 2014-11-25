<?php 


function wpse_remove_edit_post_link( $link ) {
    return '';
}
add_filter('edit_post_link', 'wpse_remove_edit_post_link');


// Enqueue Javascript files
function child_load_javascript_files() {

	if ( is_page_template('template-form.php') ) {
		
		wp_register_script( 'upload-form', get_stylesheet_directory_uri().'/upload.min.js', array('jquery'), '', true );
		
		wp_enqueue_script( 'upload-form' );
	}

	wp_register_script( 'modernizr', get_stylesheet_directory_uri().'/modernizr.custom.63321.js', '', '', false );
	wp_register_script( 'respond', get_stylesheet_directory_uri().'/respond.min.js', '', '', true );
	
	wp_enqueue_script( 'modernizr' );
	wp_enqueue_script( 'respond' );
}

add_action( 'wp_enqueue_scripts', 'child_load_javascript_files' );