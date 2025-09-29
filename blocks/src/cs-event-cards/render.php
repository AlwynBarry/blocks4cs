<?php

require_once plugin_dir_path( __FILE__ ) . '../inc/class-cs-event-cards-renderer.php';


/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$wrapper_attributes = get_block_wrapper_attributes();
echo sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, \amb_dev\b4cs\b4cs_event_cards_render( $attributes ) );
