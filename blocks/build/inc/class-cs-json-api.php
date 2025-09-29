<?php

namespace amb_dev\b4cs;

require_once plugin_dir_path( __FILE__ ) . 'class-churchsuite.php';
use amb_dev\b4cs\ChurchSuite as ChurchSuite;

/**
 * Constructs and maintains a JSON API feed url, including all parameter processing
 * Works alongside the ChurchSuite class, which provides the base URL for the
 * ChurchSuite login from which we are accessing the API feed.
 * Provides basic sanitization for all supplied parameters.  For the full range of supported
 * parameters, see https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md#calendar-json-feed
 * 
 * @link       https://https://github.com/AlwynBarry
 * @since      1.0.0
 *
 * @package    blocks4cs
 * @subpackage blocks4cs/inc
 * @author     Alwyn Barry <alwyn_barry@yahoo.co.uk>
 */
class Cs_JSON_API {

    /*
     * The parameters permitted to be given to create the feed request, and their sanitizer functions
     * See https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md#calendar-json-feed
     * for an explanation of these params for both events and groups.
     * 
     * @since 1.0.0
     */
	protected const PARAM_SANITIZERS = [ 'num_results' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural',
										 'merge' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_merge',
										 'date_start' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_date',
										 'date_end' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_date',
										 'featured' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_boolean',
										 'category' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural',
										 'categories' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural_array',
										 'site' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural',
										 'sites' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural_array',
										 'event' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural',
										 'events' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural_array',
										 'q' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_string',
										 'embed_signup' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_boolean',
										 'public_signup' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_boolean',
										 'sequence' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_natural',
										 'page' => '\amb_dev\b4cs\Cs_JSON_API::sanitize_positive'
									   ];
	public readonly array $PERMITTED_PARAMS;
	protected const MERGE_VALUES = array( 'sequence', 'sequence_name', 'signup_to_sequence', 'show_all' );
    /*
     * The default cache time for previous returned results
	 * @since	1.0.0
	 * @access	protected
	 * @const	CACHE_TIME	the preset cache time before a cached result is expired
	 */
    protected const CACHE_TIME = 4 * HOUR_IN_SECONDS;

	/*
	 * The data required from which the feed URL is created
	 * 
	 * @since   1.0.0
	 * @access  protected
	 * @var     ChurchSuite	$cs				An instance of ChurchSuite initialised with the Church Name and JSON feed desired
    * @var		array()		$params			An associative array of string keys and values
     * 										Only keys in PERMITTED_PARAMS will be stored
     * 										Values are sanitized as alphanumeric or date yyyy-mm-dd only
	 */
	protected ChurchSuite $churchsuite;
    protected $params = array();
    protected int $num_results = 0;
    protected string $response_error = '';
    
    /*
     * Construct the initial values, sanitising all input provided to ensure all data is valid.
     * 
     * @since 1.0.0
     * @param	$cs					An instance of ChurchSuite initialised with the Church Name and JSON feed desired
     * @param	array() $atts		An associative array of string keys and values
     * 								Only keys in PERMITTED_PARAMS will be accepted
     * 								Values are sanitized as alpha, numeric or date yyyy-mm-dd only
     */
    public function __construct ( ChurchSuite $cs, array $atts = array() ) {
		// We need to set this constant as in the constructor because it is computed from the constant array
		$this->PERMITTED_PARAMS = array_keys( \amb_dev\b4cs\Cs_JSON_API::PARAM_SANITIZERS );
		// ChurchSuite class contains the church name, feed desired and generators for the URLs required for the feeds
		$this->churchsuite = $cs;
		// Process all the attributes to ensure all values in the params array are sanitized values
		$this->add_params( $atts );
		// Set a default value '0' for num_results not otherwise set in the atts
		$this->set_num_results();
		// Remove featured if not set to '1' ... deals with a CS bug!
		$this->set_featured();
	}

	/*
	 * Set any parameters for the JSON request to ChurchSuite (e.g. featured="1")
	 *
	 * All supplied parameters and their values are santised before being added.
	 * Only valid ChurchSuite JSON parameters are added - invalid/malformed are discarded
	 * 
	 * If a parameter is repeated, either in the parameters passed in or from previous
	 * calls to addParams() the new value will be written over the old value for that parameter
	 * (ie) the final parameter value for any parameter in the array is the one retained.
	 * 
	 * @since 1.0.0
	 * @param	array() $atts		An associative array of string keys and values
     * 								Only keys in PERMITTED_PARAMS will be accepted
     * 								All values are sanitized to the string representation
     * 								of the legal values for their required type.  Illegal
     * 								keys or values are not added to the params
	 */
	public function add_params( array $atts ) : void {
		foreach ( $atts as $key => $value ) {
			$sanitized_key = strtolower( trim( $key ) );
			if ( in_array( $sanitized_key, $this->PERMITTED_PARAMS ) ) {
				$sanitized_value = \amb_dev\b4cs\Cs_JSON_API::PARAM_SANITIZERS[ $sanitized_key ]( $atts[ $key ] );
				if ( $sanitized_value !== '' ) {
					$this->params[ $sanitized_key ] = $sanitized_value;
				}
			}
		}
	}

	/*
	 * Ensure num_results is always set in the query by ensuring it is
	 * added to the params array if it is absent.
	 * NOTE: call only after the add_params() function has been run!
	 * 
	 * @since 1.0.0
	 */ 
	protected function set_num_results() : void {
		if ( ( ! array_key_exists( 'num_results', $this->params ) ) || ( ! isset( $this->params[ 'num_results' ] ) ) ) {
			// Set the default value
			$this->params[ 'num_results' ] = '0';
		}
	}

	/*
	 * Ensure featured is only in the query if set to '1' ... there is an
	 * apparent bug that seems to cause problems if featured is 0, and removing
	 * this parameter means that the default value, which is 0, is used
	 * NOTE: call only after the add_params() function has been run!
	 * 
	 * @since 1.0.0
	 */ 
	protected function set_featured() : void {
		if ( array_key_exists( 'featured', $this->params ) && ( $this->params[ 'featured' ] === '0' ) ) {
			// Remove the 'featured' param, so CS uses the default value '0'
			unset( $this->params[ 'featured' ] );
		}
	}

	/*
	 * Sanitize a boolean string parameter to the string representation of
	 * natural value 0 or 1.  The string provided can be 0, 1, off, on,
	 * false, true, no, yes (upper or lowercase). The return value will be
	 * the string '0' or '1' for false or true, or '' if the provided value
	 * was not one of the legal values.
	 * 
	 * @since 1.0.0
	 * @param string $value		the parameter value to test
	 * @return string			the boolean sanitized to '0' or '1', or
	 * 							'' if the supplied value was not legal.
	 */ 
	protected static function sanitize_boolean( string $value ) : string {
		$filtered = filter_var( $value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE );
		return ( is_null( $filtered ) ? '' : ( ( $filtered ) ? '1' : '0' ) );
	}

	/*
	 * Sanitize a date parameter in yyyy-mm-dd string format.  If an
	 * illegal or malformed date is supplied, the empty string ('') is returned
	 * 
	 * @since 1.0.0
	 * @param string $value		the parameter value to test
	 * @return string			the sanitized value, which is a valid date string,
	 * 							or '' if the supplied value was not a merge param. 
	 */ 
	protected static function sanitize_date( string $value ) : string {
		$validated_date = \DateTime::createFromFormat( 'Y-m-d', $value );
		return ( $validated_date ) ? $validated_date->format('Y-m-d') : '';
	}

	/*
	 * Sanitize a merge parameter.  Returns the parameter value, in lowercase,
	 * or, if an unrecognised value, return ''
	 * 
	 * @since 1.0.0
	 * @param string $value		the parameter value to test
	 * @return string			the sanitized value, which is a merge param,
	 * 							or '' if the supplied value was not a merge param. 
	 */ 
	protected static function sanitize_merge( string $value ) : string {
		$value = strtolower( trim( strval( $value ) ) );
		return ( in_array( $value, \amb_dev\b4cs\Cs_JSON_API::MERGE_VALUES ) ) ? $value : '';
	}

	/*
	 * Sanitize a natural integer parameter provided as a string. Return
	 * the string value of its integer value, or return '' if an ill-formed
	 * or out of bounds number is provided.
	 * 
	 * @since 1.0.0
	 * @param string $value		the parameter value to test
	 * @return string			the sanitized value, which is a natural integer,
	 * 							or '' if the supplied value was not valid
	 */ 
	protected static function sanitize_natural( string $value ) : string {
		return ( is_numeric( $value ) && ( intval( $value ) >= 0 ) ) ? strval( intval( $value ) ) : '';
	}

	/*
	 * Sanitize a positive integer parameter provided as a string. Return
	 * the string value of its integer value, or return '' if an ill-formed
	 * or out of bounds number is provided.
	 * 
	 * @since 1.0.0
	 * @param string $value		the parameter value to test
	 * @return string			the sanitized value, which is a positive integer,
	 * 							or '' if the supplied value was not valid
	 */ 
	protected static function sanitize_positive( string $value ) : string {
		return ( is_numeric( $value ) && ( intval( $value ) > 0 ) ) ? strval( intval( $value ) ) : '';
	}

	/*
	 * Sanitize natural integer array parameters given as a string. If
	 * an ill-formed array is found, the parameter will be removed from
	 * the params array.
	 * 
	 * @since 1.0.0
	 * @param string $values	the parameter values to test
	 * @return string			the sanitized natural array values or '' if
	 * 							none of the values in the array was valid
	 */ 
	protected static function sanitize_natural_array( array $values ) : string {
		$valuesArray = explode( ',', $values );
		$result = '';
		for ( $i = 0; $i < count( $valuesArray ); $i++ ) {
			$value = self::sanitize_natural( $valuesArray[ $i ] );
			if ( $value !== '' ) {
				if ( $result != '' ) {
					$result .= ',';
				}
				$result .= $value;
			}
		}
		return $result;
	}

	/*
	 * Sanitize a string to encode or remove any special characters
	 * 
	 * @since 1.0.0
	 * @param string $value		the parameter value to test
	 * @return string			the sanitized value with special characters
	 * 							encoded as html entries
	 */ 
	protected static function sanitize_string( string $value ) : string {
		return \htmlspecialchars( trim( $value ) );
	}

	/*
	 * Get the API URL that will be used given the current settings given to this instance
	 * 
	 * @since 1.0.0
	 * @return	string	A valid URL to call the JSON_API on churchsuite
	 * 					Note: never Null because there should always be a valid string,
	 * 						  though the church_name supplied to the $cs instance may have been incorrect
	 */ 
	protected function compose_API_URL() : string {
		$url = ( $this->churchsuite )->get_JSON_URL();
		if ( count( $this->params ) > 0 ) {
			$url = $url . '?' . \http_build_query( $this->params );
		}
		return $url;
	}

	/*
	 * Return a string that can be used as a key for transients
	 * 
	 * The key name returned is the name of the plugin preceding a sha1 encoding which
	 * uniquely identifies the JSON api request. The sha1 encoding is calculated from the
	 * api url. Thus the key will correspond to the same data being returned for the same
	 * request when if is used again.
	 * 
	 * @since 1.0.0
	 * @param 	$api_url	The URL that will be used to obtain the ChurchSuite JSON response
	 * @return	string		A transient key uniquely reflecting this plugin and the JSON URL used
	 */
	protected static function get_transient_key( string $api_url ) : string {
		return 'b4cs_' . sha1( $api_url );
	}

	/*
	 * Return a string with the error message from the last request, or '' if no error
	 * 
	 * @since 1.0.0
	 * @return	string		The last error message, or '' if no error occurred
	 */
	public function get_response_error() : string {
		return $this->response_error;
	}

	/*
	 * Request JSON data using the URL details supplied
     * Note: if the church_name given to the ChurchSuite instance was not given correctly
     * 		 or if it was an empty string the eventual JSON call will return a null result.
	 * 
	 * @since 1.0.0
	 * @return null or an array of \stdclass
	 */ 
	public function get_response() {
        // Create the API_URL
        $api_url = $this->compose_API_URL();
        /* error_log( 'Params: ' . print_r( $this->params ) . "\n" ); error_log( 'URL: ' . print_r( $api_url ) . "\n" ); /* Helpful for debugging what is sent to the API */

        // Find the transient key and check for an existing cached JSON response
        $transient_key = self::get_transient_key( $api_url );

        // Fetch the cached response, if any;  If no cached response, get a new JSON response, and
        // if JSON response is returned, convert it to objects, and store the result in the cache
		if ( false === ( $result = get_transient( $transient_key ) ) ) {
			// The default result will be '' if there is any error
			$result = '';
			// Fetch the JSON data from ChurchSuite using the details supplied to construct the API URL
			$response = wp_remote_get( $api_url );  // Could use second param array( 'timeout' => 6 ) to increase the timeout 
			if ( is_wp_error( $response )) {
				$this->response_error = $response->get_error_message();
			}
			elseif ( isset( $response[ 'response' ][ 'code' ] ) && ( 200 === $response[ 'response' ][ 'code' ] ) ) {
				$this->response_error = '';
				// Received a valid response, so extract the JSON part of the response (in the response body)
				$json_data = wp_remote_retrieve_body( $response );
				// Change the JSON data into objects of class \stdclass
				$result = ( $json_data !== '' ) ? json_decode($json_data) : '';
				// Put the response into the cache if there is data to be stored
				if ( ( ! is_null( $result ) ) && ( $result !== '' ) ) { set_transient( $transient_key, $result, self::CACHE_TIME ); }
			}
		}

		// Result will be null or an array of \stdclass objects
		return ( $result === '' ) ? null : $result;
    }
	
}
