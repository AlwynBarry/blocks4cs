<?php

namespace amb_dev\b4cs;


require_once plugin_dir_path( __FILE__ ) . 'class-churchsuite.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-renderer.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-events-renderer.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-event.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-compact-event-view.php';

use amb_dev\b4cs\ChurchSuite as ChurchSuite;
use amb_dev\b4cs\Cs_Renderer as Cs_Renderer;
use amb_dev\b4cs\Cs_Events_Renderer as Cs_Events_Renderer;
use amb_dev\b4cs\Cs_Event as Cs_Event;
use amb_dev\b4cs\Cs_Compact_Event_View as Cs_Compact_Event_View;


/**
 * A child of Cs_Events_Renderer to provide the creation of the HTML response for side-panel
 * lists of events (likely 10-20 grouped into days, with a graphical date for each day
 * and the events on that day listed with simple details (title, time, location)
 * 
 * This class only provides the external 'wrapper' HTML for the events, calling a
 * instance of Cs_Event_List_View to display each event in list style with only the
 * and event date, time and location details.
 * 
 * Below the class we also provide a function which can be supplied to Wordpress to
 * run the Renderer.  This function creates an instance of the Renderer class and calls
 * the render() function in the class to run the renderer with the with the 
 * ChurchSuite attributes supplied.
 * 
 * To call the renderer, you must supply the church name used in the normal ChurchSuite
 * web url (e.g. from https://mychurch.churchsuite.com/ - 'mychurch' is the name to supply)
 * Use the church_name="mychurch" parameter to supply the church name.  You can also use
 * any of the event parameters provided by the churchsuite API, listed at:
 * https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md#calendar-json-feed
 * Also you should supply the parameter num_results="10" (or whatever number you need) to
 * reduce the time of the processing of the call - otherwise you would have returned _all_
 * future events on your ChurchSuite site!  In addition you can use the parameter days_ahead="3"
 * to specify the number of days events which are returned (the default is "5").
 *
 * @link       https://https://github.com/AlwynBarry
 * @since      1.0.0
 *
 * @package    blocks4cs
 * @subpackage blocks4cs/inc
 * @author     Alwyn Barry <alwyn_barry@yahoo.co.uk>
 */
class Cs_Event_List_Renderer extends Cs_Events_Renderer {
	
	/*
	 * Provided to prevent continual re-creation of a constant value used in date calculations
	 */
	protected readonly \DateInterval $one_day;

	/*
	 * Process the supplied attributes to leave only valid parameters, create the URLs
	 * required for the JSON feed from ChurchSuite and create the means to communicate via
	 * that JSON feed.  Also, create the unique cache key appropriate for this query.
	 *
 	 * @since	1.0.0
	 * @param	array() $atts		An array of strings representing the attributes of the JSON call
	 * 								Mandatory params: church_name - the ChurchSuite recognised name of the church
	 */
	public function __construct( $atts ) {
		// Set an end date to speed up the query. Normally 5 days ahead
		\amb_dev\b4cs\Cs_Events_Renderer::set_date_end( $atts );
		// Now call the parent constructor
		parent::__construct( $atts );
		// Set the convenience constant, used to reduce re-calculation in the loop over events
		$this->one_day = \DateInterval::createFromDateString( '1 day' );
	}

	/*
	 * A helper function to display the date split up into separate spans so it can be styled
	 * 
	 * @since 1.0.0
	 * @param \DateTime $event_date		The date to be displayed
	 * @result	string					The date split into html spans for day, date number, month and year
	 */
	protected function display_event_date( \DateTime $event_date ) : string {
	    $result = '<div class="b4cs-date">';
		$result .= '<span class="b4cs-day">' . $event_date->format( 'D' ) . '</span>';
		$result .= '<span class="b4cs-date-number">' . $event_date->format( 'd' ) . '</span>';
		$result .= '<span class="b4cs-month">' . $event_date->format( 'M' ) . '</span>';
		$result .= '<span class="b4cs-year">' . $event_date->format( 'Y' ) . '</span>';
		$result .= '</div>';
		return $result;
	}

	/*
	 * Use the JSON response to create the HTML containing the list of events.
	 * 
	 * For each date there is only one date output in a left hand column, styled, and then
	 * in the corresponding right hand columns we have each event on that date.
	 * 
	 * @since	1.0.0
	 * @param	string	$JSON_response	the array of \stdclass objects from the JSON response
 	 * 									from which the HTML will be created for the shortcode response.
	 * @return	string					the HTML to render the events in cards, or '' if the JSON response fails
	 */
	protected function get_HTML_response( array $JSON_response ) : string {
		$output = '';
		if ( isset( $JSON_response ) ) {
			$output = '<div class="b4cs-event-list">';
			// Set up a few local variables to iterate between the returned event dates
			$current_date = new \DateTime();
			$current_date->setTime( 0, 0 );
			// We need the first event date output, so we go back a date to trigger the first event date output
			$current_date->sub( $this->one_day );
			// Iterate over the events, only outputing a date when we have a new date
			// Dates are only output when there are events on that date.
			foreach ( $JSON_response as $event_obj ) {
				// All events are displayed - use the CSS class to hide events you don't want displayed
				$event = new Cs_Event( $event_obj );
				$output .= '<div class="b4cs-event-list-event">' . "\n";
				$output .= '  <div class="b4cs-event-row">' . "\n";
				$output .= '    <div class="b4cs-date-column">' . "\n";
				// Get the event date.  If there is no date it is just assumed it follows the previous date!!
				$event_date = ( $event->is_start_date() ) ? $event->get_start_date() : $current_date;
				// If the event is on a new date, display the date
				if ( $event_date->diff( $current_date )->d > 0 ) {
					$output .= $this->display_event_date( $event_date );
					$current_date = $event_date;
					$current_date->setTime( 0, 0 );
				}
				$output .= '    </div>' . "\n";
				// Display the event details for this event
				$output .= '    <div class="b4cs-event-column">' . "\n";				
				$event_view = new Cs_Compact_Event_View( $this->cs, $event );
				$output .= $event_view->display();
				$output .= '    </div>' . "\n";
				$output .= '  </div>' . "\n";
				$output .= '</div>' . "\n";
				// clear the event and view objects as we go so that we keep memory usage low
				unset( $event_view );
				unset( $event );
			}
			$output .= '</div>';
		}
		// Return the HTML response
		return $output;
	}

}


/*
 * Function to be called in the block display. Displays the requested events grouped by date in event list style.
 *
 * @since 1.0.0
 * @param	array()	$atts	Array supplied by Wordpress of params to the shortcode
 * 							church_name="mychurch" is required - with "mychurch" replaced with your church name
 *							num_results="10" is strongly advised - int range 0..n; 0=all, 1..n = number of events specificed
 * 							By default this only lists dates from within the next 5 days. To override this you
 *                          can add the attribute 'days_ahead' (e.g. days_ahead="30") to look ahead further.
 * 							Do note, however, that if you have a lot of upcoming events the response can be slow.
 */
function b4cs_event_list_render( $atts ) {
	return ( new Cs_Event_List_Renderer( $atts ) )->render();
}
