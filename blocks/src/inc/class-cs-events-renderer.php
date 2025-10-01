<?php

namespace amb_dev\b4cs;

require_once plugin_dir_path( __FILE__ ) . 'class-churchsuite.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-json-api.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-renderer.php';

use amb_dev\b4cs\ChurchSuite as ChurchSuite;
use amb_dev\b4cs\Cs_JSON_API as Cs_JSON_API;
use amb_dev\b4cs\Cs_Renderer as Cs_Renderer;


/**
 * An extended class of Cs-Renderer to abstract away common code for Events Rendered
 * 
 * To create a display controller for an events block, extend this class and provide a
 * get_HTML_response() function. The get_HTML_response() function should output
 * the container HTML and then iterate the objects in the $JSON_response parameter,
 * using a View class to output each object.  render() will dispatch to
 * get_HTML_response() with the JSON response either from ChurchSuite or from cache.
 *
 * @link       https://https://github.com/AlwynBarry
 * @since      1.0.0
 *
 * @package    blocks4cs
 * @subpackage blocks4cs/inc
 * @author     Alwyn Barry <alwyn_barry@yahoo.co.uk>
 */
 
abstract class Cs_Events_Renderer extends Cs_Renderer {

	/*
	 * Process the supplied attributes to leave only valid parameters, create the URLs
	 * required for the JSON feed from ChurchSuite and create the means to communicate via
	 * that JSON feed.  Also, create the unique cache key appropriate for this query.
	 * 
	 * NOTE: The constructor does NOT get the JSON response so that we can get a previous
	 *       JSON response from cache if one already exists so we can mitigate any possible
	 * 		 delay for the JSON response and the processing of that response.
	 * 
	 *
 	 * @since	1.0.0
	 * @param	array() $atts		An array of strings representing the attributes of the JSON call
	 * 								Mandatory params: church_name - the ChurchSuite recognised name of the church
	 * 								See Cs_JSON_API::PERMITTED_PARAMS for the params permitted
	 */
	public function __construct( $atts ) {
		// Ensure the featured attribute is properly set, and the days_ahead pseudo
		// attribute is translated to a corresponding ChurchSuite date_end attribute
		self::set_featured( $atts );

		// Now construct using the attributes given
		parent::__construct( $atts, ChurchSuite::EVENTS );
	}

 	/*
	 * A helper function to set the featured attribute to ensure any false value is set to 0
	 * This overcomes a bug where the ToggleControl in Blocks uses an unset value as false
	 * 
	 * @since 1.0.0
	 * @param array $atts		The attributes to be passed on to ChurchSuite
	 * 							This value is modified to set featured to 0 if false
	 */
	protected static function set_featured( array &$atts ) {
		if ( ! $atts[ 'featured' ] ) { $atts[ 'featured' ] = 0; }
	}

	/*
	 * A helper function to set the date_end attribute if the days_ahead pseudo attribute is set,
	 * adjusting for the date_start attribute if it has been set.
	 * 
	 * @since 1.0.0
	 * @param array $atts		The attributes to be passed on to ChurchSuite
	 * 							This value is modified to remove days_ahead and add a calculated date_end
	 */
	protected static function set_date_end( array &$atts ) {
		// Set the start date either to be today or the date_start date if provided
		$date =  new \DateTime();
		if ( isset( $atts[ 'date_start' ] ) ) {
			$date_start = \amb_dev\b4cs\Cs_JSON_API::sanitize_date( $atts[ 'date_start' ] );
			if ( $date_start !== '' ) {
				$date = new \DateTime( $date_start );
			}
		}
		// Set the number of days to look ahead in the event query, defaulting to 5 days
		$days_ahead = 5;
		$date_interval = \DateInterval::createFromDateString('5 days');
		if ( isset( $atts[ 'days_ahead' ] ) ) {
			$days_ahead = \amb_dev\b4cs\Cs_JSON_API::sanitize_natural( $atts[ 'days_ahead' ] );
			// days_ahead is not a CS attribute, so remove it from the list of attributes
			unset( $atts[ 'days_ahead' ] );
			if ( $days_ahead !== '' ) {
				// Calculate the date interval from the days_ahead value given
				$date_interval = \DateInterval::createFromDateString( $days_ahead . ' days' );
			}
		}
		// Calculate the date_end from the date_interval and write the result to the date_end attribute
		$date->add($date_interval);
		$atts[ 'date_end' ] ??= $date->format( 'Y-m-d' );
	}

}
