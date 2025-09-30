<?php
// This file is generated. Do not modify it manually.
return array(
	'cs-calendar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'b4cs/cs-calendar',
		'version' => '0.1.0',
		'title' => 'Calendar for ChurchSuite',
		'category' => 'widgets',
		'icon' => 'megaphone',
		'description' => 'Display a monthly calendar of Events from ChurchSuite',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'center',
				'wide',
				'full'
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'church_name' => array(
				'type' => 'string',
				'default' => 'demo'
			),
			'categories' => array(
				'type' => 'string',
				'default' => ''
			),
			'q' => array(
				'type' => 'string',
				'default' => ''
			),
			'sequence' => array(
				'type' => 'integer',
				'default' => 0
			),
			'sites' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'blocks4cs',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'script' => array(
			'file:../js/b4cs-scripts.js'
		),
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'cs-event-cards' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'b4cs/cs-event-cards',
		'version' => '0.1.0',
		'title' => 'Event Cards for ChurchSuite',
		'category' => 'widgets',
		'icon' => 'megaphone',
		'description' => 'Display Cards for a set of Events from ChurchSuite',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'center',
				'wide',
				'full'
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'church_name' => array(
				'type' => 'string',
				'default' => 'demo'
			),
			'days_ahead' => array(
				'type' => 'integer',
				'default' => 45
			),
			'num_results' => array(
				'type' => 'integer',
				'default' => 3
			),
			'featured' => array(
				'type' => 'boolean',
				'default' => true
			),
			'categories' => array(
				'type' => 'string',
				'default' => ''
			),
			'q' => array(
				'type' => 'string',
				'default' => ''
			),
			'event_ids' => array(
				'type' => 'string',
				'default' => ''
			),
			'merge' => array(
				'type' => 'string',
				'default' => ''
			),
			'sequence' => array(
				'type' => 'integer',
				'default' => 0
			),
			'sites' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'blocks4cs',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'script' => array(
			
		),
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'cs-event-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'b4cs/cs-event-list',
		'version' => '0.1.0',
		'title' => 'Event List for ChurchSuite',
		'category' => 'widgets',
		'icon' => 'megaphone',
		'description' => 'Display a list of Events from ChurchSuite',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'center',
				'wide',
				'full'
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'church_name' => array(
				'type' => 'string',
				'default' => 'demo'
			),
			'days_ahead' => array(
				'type' => 'integer',
				'default' => 5
			),
			'num_results' => array(
				'type' => 'integer',
				'default' => 20
			),
			'featured' => array(
				'type' => 'boolean',
				'default' => false
			),
			'categories' => array(
				'type' => 'string',
				'default' => ''
			),
			'q' => array(
				'type' => 'string',
				'default' => ''
			),
			'event_ids' => array(
				'type' => 'string',
				'default' => ''
			),
			'merge' => array(
				'type' => 'string',
				'default' => ''
			),
			'sequence' => array(
				'type' => 'integer',
				'default' => 0
			),
			'sites' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'blocks4cs',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'script' => array(
			
		),
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'cs-smallgroups' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'b4cs/cs-smallgroups',
		'version' => '0.1.0',
		'title' => 'Small Groups for ChurchSuite',
		'category' => 'widgets',
		'icon' => 'megaphone',
		'description' => 'Display a Card for each Small Group from ChurchSuite',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'center',
				'wide',
				'full'
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'church_name' => array(
				'type' => 'string',
				'default' => 'demo'
			),
			'sites' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'blocks4cs',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'script' => array(
			
		),
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
