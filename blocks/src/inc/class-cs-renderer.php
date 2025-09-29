<?php

namespace amb_dev\b4cs;

require_once plugin_dir_path( __FILE__ ) . 'class-churchsuite.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-json-api.php';

use amb_dev\b4cs\ChurchSuite as ChurchSuite;
use amb_dev\b4cs\Cs_JSON_API as Cs_JSON_API;

/**
 * The base class of the block display created for this plugin.
 * 
 * This class holds the ChurchSuite instance (which constructs and maintains
 * the URL for access to the JSON feed, and the base URL for the events and
 * groups in ChurchSuite for which it returns information), the JSON Api
 * instance, which maintains the data needed to construct the call to the
 * ChurchSuite JSON API, the response array received from the JSON API so
 * that it is only called when needed, and a constructed Key which can be
 * used to access the cache to see if there has been a recent equivalent call
 * to the JSON API whose results can be used instead of new results being created.
 * 
 * The constructor will take the attributes supplied to the renderer, check
 * and sanitize them, and then create the ChurchSuite and JSON API details
 * required to make the JSON API request.  The JSON API request is not made,
 * however, until the render() function is called on the object, and is
 * only made if there is no cached result which can be reused.
 * 
 * In the MVC model, the Cs_Renderer classes are the Controller, with the
 * Event or Group classes the model and the EventView/GroupView etc classes the View.
 * 
 * To create a display controller for a block, extend this class and provide a
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
abstract class Cs_Renderer {
        
 	/**
	 * The common attributes needed to provide any shortcode created by this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      ChurchSuite    $cs				holds the constructed urls to the ChurchSuite account for the JSON feed
	 * @var      Cs_JSON_API	$api			holds the params needed to construct the JSON API call; manages the API call
	 */
	protected ChurchSuite $cs;
	protected Cs_JSON_API $api;
	
	
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
	 * @param	string	$JSON_base	What you are requesting from the ChurchSuite JSON API - one of the
	 * 								constants ChurchSuite::EVENTS or ChurchSuite::GROUPS
	 */
	public function __construct( $atts, $JSON_base = ChurchSuite::EVENTS ) {
		// Get the church name parameter or set to '' if not provided
		// The ChurchSuite constructor will set a default value if needed.
		$church_name = $atts[ 'church_name' ] ?? '';
		// church_name isn't an attribute used by the CS v1 API, so remove from atts
		unset( $atts[ 'church_name' ] );

		// Create the churchsuite JSON URL and get the JSON response
		// The constructor will sanitize both the $church_name and $JSON_base
		// values, and will set default values if these are missing.
		$this->cs = new ChurchSuite( $church_name, $JSON_base );
		// Create the ChurchSuite JSON API object, which will sanitize all
		// of the $atts values we pass to it, using defaults where needed.
		$this->api = new Cs_JSON_API( $this->cs, $atts );
	}

	/*
	 * This is the function the child class must implement that will return the HTML
	 * response from the JSON ChurchSuite response.
	 * 
	 * It should output any container HTML required, and then iterate over the objects
	 * of the JSON response to generate the required HTML, using View instances so
	 * that this function has to provide very little new HTML which merely wraps the
	 * events or groups for output.
	 * 
 	 * @since	1.0.1
 	 * @param	string	$JSON_response	the array of \stdclass objects from the JSON response
 	 * 									from which the HTML will be created for the shortcode response.
	 * @return	string 					The string with the HTML of the shortcode response, or '' if an error
	 */
	protected abstract function get_HTML_response( array $JSON_response ) : string;
	
	/*
	 * Run the shortcode to produce the HTML output
	 * 
	 * Call the JSON API to get an array of \stdclass objects from the ChurchSuite JSON response
	 *     (the JSON response my be from the cache, if a previous call has been cached).
	 * If there is a JSON response, call $this->get_response() to convert it into HTML.
	 * 
  	 * @since	1.0.1
	 * @return	string	a string with the HTML of the ChurchSuite JSON response or a message to try later if an error
	 */
	public function render() : string {
		$output = '';
		// Fetch the \stclass object array into our $JSON_response variable
		$JSON_response = ( $this->api )->get_response();
		if ( ! is_null( $JSON_response ) ) {
			// Sanitize the input by converting the object array into Cs_Event or Cs_Group objects
			// and, for each one, convert into HTML output using an appropriate Cs_View class
			$output = $this->get_HTML_response( $JSON_response );
		}
		if ( $output === '' ) {
			$output = '<div class="cs-warning">'
						. __( 'Cannot fetch data at the moment', 'blocks4cs' )
						. '<div class="cs_error_message">'
						. ( $this->api )->get_response_error()
						. '</div>'
						. '</div>'; 
		}
		return $output;
	}

}
