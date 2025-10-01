<?php

namespace amb_dev\b4cs;


require_once plugin_dir_path( __FILE__ ) . 'class-churchsuite.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-renderer.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-event.php';
require_once plugin_dir_path( __FILE__ ) . 'class-cs-calendar-event-view.php';

use amb_dev\b4cs\ChurchSuite as ChurchSuite;
use amb_dev\b4cs\Cs_Renderer as Cs_Renderer;
use amb_dev\b4cs\Cs_Event as Cs_Event;
use amb_dev\b4cs\Cs_Calendar_Event_View as Cs_Calendar_Event_View;


/**
 * A child of Cs_Shortcode to provide the creation of the HTML response to display
 * a monthly calendar of events with the event locatiom and description hidden to
 * be revealed with a mouse hover.
 * 
 * This class provides the logic for the display of a month calendar, calling a
 * instance of Cs_Calendar_Event_View to display each event.
 * 
 * Below the class we also provide a function which can be supplied to Wordpress to
 * run the Renderer.  This function creates an instance of the Renderer class and calls
 * the renderer() function in the class to run the renderer for the configuration
 * supplied.
 * 
 * To call the renderer, you must supply the church name used in the normal ChurchSuite
 * web url (e.g. from https://mychurch.churchsuite.com/ - 'mychurch' is the name to supply)
 *
 * To call the shortcode, you must supply the church name used in the normal ChurchSuite
 * web url (e.g. from https://mychurch.churchsuite.com/ - 'mychurch' is the name to supply)
 * Use the church_name="mychurch" parameter to supply the church name.  You may also
 * provide a date_start="yyyy-mm-dd" parameter to identify a date in the month of
 * the events you want to display. You can also use the event parameters provided
 * by the churchsuite API, though the date_end, num_results and merge parameters are overridden.
 * https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md#calendar-json-feed
 *
 * @link       https://https://github.com/AlwynBarry
 * @since      1.0.0
 *
 * @package    blocks4cs
 * @subpackage blocks4cs/inc
 * @author     Alwyn Barry <alwyn_barry@yahoo.co.uk>
 */
 class Cs_Calendar_Renderer extends Cs_Renderer {

	/*
	 * Constant values created to prevent unnecessary re-creation of values used in expressions
	 */ 
	protected readonly \DateInterval $one_day;
	protected readonly \DateInterval $one_week;
	protected readonly \DateInterval $one_month;
	protected readonly string $page_url;
	
	protected \DateTime $today;
	protected \DateTime $requested_date;
	protected \DateTime $month_start;
	protected \DateTime $month_end;
	protected \DateTime $date_from;
	protected \DateTime $date_to;
	protected \DateTime $date_beyond; // A constant just to help mark when we're outside the calendar

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
	    // Set the values always required by this shortcode
	    $this->page_url = get_permalink();
		$this->one_day = \DateInterval::createFromDateString( '1 day' );
		$this->one_week = \DateInterval::createFromDateString( '1 week' );
		$this->one_month = \DateInterval::createFromDateString( '1 month' );
		$this->today = new \DateTime();
		$this->today->setTime( 0, 0 );

		// Set the requested base date.  This either comes from the page query
		// or, if there is an error with the date supplied by the page query or
		// no page query date, we use the start of the month from the current date.
		$query_value = get_query_var( 'b4cs-calendar-date' );
		if ( ( $query_value !== '' ) && ( $date = \DateTime::createFromFormat( "Y-m-d", $query_value ) ) ) {
		    $this->requested_date = $date;
		} else {
		    // Try to see if we have a valid Y-m-d date
		    $atts_value = ( isset( $atts[ 'date_start' ] ) ) ? \DateTime::createFromFormat( "Y-m-d", $atts[ 'date_start' ] ) : false;
		    // Set the requested date to the date_start date if valid, or today's date if not
		    $this->requested_date = ( $atts_value !== false ) ? $atts_value : clone $this->today;
		}
		$this->requested_date->setTime( 0, 0 );

		// Create the other date values relative to the requested date
		// These date values are used to request and format the calendar
		$this->month_start = self::get_month_start( $this->requested_date );
		$this->month_end = self::get_month_end( $this->requested_date ); 
		$this->date_from = self::get_sunday_before_month( $this->month_start ); 
		$this->date_to = self::get_saturday_after_month( $this->month_start );
		$this->date_beyond = clone $this->date_to;
		$this->date_beyond->add( $this->one_day );

		// Override or set the atts we need so we get the events for this month
		$atts[ 'date_start' ] ??= $this->date_from->format( 'Y-m-d' );
		$atts[ 'date_end' ] ??= $this->date_to->format( 'Y-m-d' );
		$atts[ 'num_results' ] = '0';
		$atts[ 'merge' ] = 'show_all';

		// Now we can call the parent constructor to set all other attributes
		parent::__construct( $atts, ChurchSuite::EVENTS );
	}

	/*
	 * Returns the number of days in a given month and year, taking into account leap years.
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	int					the number of days in the month the date is within
	 */
	protected static function days_in_month( \DateTime $date ) : int {
		$month = (int) $date->format('m');
		$year = (int) $date->format('Y');
		return $month == 2 ? ( $year % 4 ? 28 : ( $year % 100 ? 29 : ( $year % 400 ? 28 : 29 ) ) ) : ( ( $month - 1 ) % 7 % 2 ? 30 : 31 );
	}

	/*
	 * Returns the date of the first day in the month 
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	\DateTime			the date of the start of the month
	 */
	protected static function get_month_start( \DateTime $date ) : \DateTime {
		return new  \DateTime( $date->format('Y-m') . '-01' );
	}

	/*
	 * Returns the date of the last day in the month 
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	\DateTime			the date of the last day of the month
	 */
	protected static function get_month_end( \DateTime $date ) : \DateTime {
		return new \DateTime( $date->format('Y-m') . '-' . self::days_in_month( $date ) );
	}

	/*
	 * Returns the date of the Sunday before the first day in the month 
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	\DateTime			the date of the Sunday before the first day in the month
	 */
	protected static function get_sunday_before_month( \DateTime $date ) : \DateTime {
		return ( self::get_month_start( $date ) )->modify( 'last sunday' );
	}

	/*
	 * Returns the date of the Saturday after the first day in the month 
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	\DateTime			the date of the Saturday after the last day in the month
	 */
	protected static function get_saturday_after_month( \DateTime $date ) : \DateTime {
		return ( self::get_month_end( $date ) )->modify( 'next saturday' );
	}

	/*
	 * Returns the true if the date passed in is the month being requested 
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	bool				true if the date passed in is in the month
	 */
	protected function is_date_in_month( $date ) {
		return ( ( $date >= $this->month_start ) && ( $date <= $this->month_end ) );
	}

	/*
	 * Returns the true if the date passed in is equal to today's date 
	 *
	 * @since 1.0.0
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	bool				true if the date passed in is the same as today's date
	 */
	protected function is_date_today( $date ) {
		return ( $date == $this->today );
	}

	/* 
	 * Returns html for the previous month link
	 *
	 * @since 1.0.0
	 */
	protected function get_previous_month_link() : string {
	    $date = ( clone $this->month_start )->sub( $this->one_month );
	    return "'" . $this->page_url . '?b4cs-calendar-date=' . $date->format('Y-m-d') . "'";
	}

	/* 
	 * Returns html for the next month link
	 *
	 * @since 1.0.0
	 */
	protected function get_next_month_link() : string {
	    $date = ( clone $this->month_start )->add( $this->one_month );
	    return "'" . $this->page_url . '/?b4cs-calendar-date=' . $date->format('Y-m-d') . "'";
	}

	/*
	 * Returns the top of the month table with the month name and the day headers 
	 *
	 * @since 1.0.1
	 * @param	\DateTime	$date	a valid DateTime object
	 * @return	\string				a string that gives the top of the month table
	 */
	protected function get_month_table_top( \DateTime $date ) : string {
		// Output the month header - the locale sensitive name of the month
		$output = '<div class="b4cs-calendar">' . "\n"
			. '  <div class="b4cs-calendar-responsive-grid">' . "\n"
			. '    <div class="b4cs-calendar-month-header">' . "\n"
			. '      <div class="b4cs-calendar-month-title">' . "\n"
			. '        ' .  $date->format( 'F' ) . ' ' .  $date->format( 'Y' ) . "\n"
			. '      </div>' . "\n"
		    . '      <div class="b4cs-calendar-month-nav">' . "\n"
			. '        <button type="button" class="b4cs-calendar-previous-link" onclick="window.location.href=' . $this->get_previous_month_link() . '">' . "\n"
			. '          <span class="b4cs-prev-gliph"></span>' . "\n"
            . '        </button>' . "\n"
			. '        <button type="button" class="b4cs-calendar-next-link" onclick="window.location.href=' . $this->get_next_month_link() . '">' . "\n"
 			. '	         <span class="b4cs-next-gliph"></span>' . "\n"
            . '        </button>' . "\n"
		    . '      </div>' . "\n"
			. '    </div>' . "\n"
		    . '    <div class="b4cs-calendar-days-grid">' . "\n"
			. '      <div class="b4cs-calendar-day-name-header">' . "\n";
		
		// Add the day headers for the table using the week within which is the supplied date
		// Doing this computationally ensures that we have localised day names produced.
		$sunday_date = self::get_sunday_before_month( $date );
		$saturday_date = clone $sunday_date;
		$saturday_date->add( $this->one_week );
		$period = new \DatePeriod( $sunday_date, $this->one_day, $saturday_date );
		foreach ( $period as $day ) {
			$output .= '        <div class="b4cs-calendar-day-name-cell">' . $day->format( 'D' ) . '</div>' . "\n";
		}

		// Output the end of the day header
		$output .= '      </div>' . "\n"
				 . '      <div class="b4cs-calendar-days">' . "\n";
	    return $output;
	}

	/*
	 * Returns the bottom of the month table 
	 *
	 * @since 1.0.1
	 * @return	\string				a string that gives the top of the month table
	 */
	protected function get_month_table_bottom() : string {
		$output = '      </div>' . "\n"
				. '    </div>' . "\n"
				. '  </div>' . "\n"
				. '</div>' . "\n";
		return $output;
	}

	/*
	 * Returns the top of a day cell 
	 *
	 * @since 1.0.1
	 * @return	\string				a string that gives the top of a day cell
	 */
	protected function get_day_top( \DateTime $date, bool $in_month, bool $is_today, bool $has_events = true ) : string {
		// Output the start of the table cell to display one day in the calendar
		$output = '<div class="b4cs-calendar-date-cell'
		                . ( ( $in_month ) ? ' b4cs-calendar-in-month' : ' b4cs-calendar-outside-month' )
		                . ( ( $is_today ) ? ' b4cs-calendar-today' : '' )
		                . ( ( $has_events ) ? '' : ' b4cs-calendar-no-events' )
		                . '">' . "\n";
		$output .= '  <div class="b4cs-day-content">' . "\n";
		// Output the date.  Many of these fields are not displayed, but it allows styling choices
		$day = (int) $date->format( 'j' );
	   	$output .= '    <div class="b4cs-date' . ( ( $day === 1 ) ? ' b4cs-first-day' : '' ) . '">' . "\n";
		$output .= '      <span class="b4cs-day">' . $date->format( 'D' ) . '</span>' . "\n";
		$output .= '      <span class="b4cs-date-number">' . $day . '</span>' . "\n";
		$output .= '      <span class="b4cs-month">' . $date->format( 'F' ) . '</span>' . "\n";
		$output .= '      <span class="b4cs-year">' . $date->format( 'Y' ) . '</span>' . "\n";
		$output .= '    </div>';
		// Output the start of the  div containing the details of the events on this date
		$output .= '	<div class="b4cs-calendar-date-cell-inner">' . "\n";
		return $output;
	}

	/*
	 * Returns the bottom of a day cell 
	 *
	 * @since 1.0.1
	 * @return	\string				a string that gives the bottom of a day cell
	 */
	protected function get_day_bottom() : string {
		$output = '    </div>' . "\n";
		$output .= '  </div>' . "\n";
		$output .= '</div>' . "\n";
		return $output;
	}

	/*
	 * Use the JSON response to create the HTML to display the Events.
	 * 
	 * For each event we return what the Cs_Event_Card returns, all within a flex div.
	 * 
 	 * @since	1.0.1
 	 * @param	string	$JSON_response	the array of \stdclass objects from the JSON response
 	 * 									from which the HTML will be created for the shortcode response.
	 * @return	string					the HTML to render the events in cards, or '' if the JSON response fails
	 */
	protected function get_HTML_response( array $JSON_response ) : string {
		$output = '';
		$response_length = count( $JSON_response );

		// Output the top of the calendar - the month name and the day names
		$output .= $this->get_month_table_top( $this->requested_date );
			
		// Set up the variables needed to control the two loops
		$date = clone $this->date_from;
		$event_index = 0;
			
		// Fetch the event info for the first event, if we have one, so we can run the loop checks
		$event = ( $event_index < $response_length ) ? new Cs_Event( $JSON_response[ $event_index ] ) : null;
		$event_date = ( $event_index < $response_length ) ? clone $event->get_start_date() : clone $this->date_beyond;
		$event_date->setTime( 0, 0 );

		// Iterate through each day of the month we are to display
		while ( $date <= $this->date_to ) {
			$output .= self::get_day_top( $date, $this->is_date_in_month( $date ), $this->is_date_today( $date ), ( $event_date == $date ) );

			// Output all the events on this day
			while ( ( $event_index < $response_length ) && ( $event_date == $date ) ) {
				
				// Tell the event to display itself
				$output .= ( new Cs_Calendar_Event_View( $this->cs, $event ) )->display();

				// Get the next event, if one is available
				$event_index++;
				$event = ( $event_index < $response_length ) ? new Cs_Event( $JSON_response[ $event_index ] ) : null;
				$event_date = ( $event_index < $response_length ) ? clone $event->get_start_date() : clone $this->date_beyond;
				$event_date->setTime( 0, 0 );

			}
			
			$output .= $this->get_day_bottom();
			
			// Move to the next day in the calendar
			$date->add( $this->one_day );
		}
		
		// Output the bottom of the calendar - just the div closures
		$output .= $this->get_month_table_bottom();
		
		// Return the HTML response
		return $output;
	}

}


/*
 * Render function to be used to display the calendar from within the block
 *
 * @since 1.0.0
 * @param	array()	$atts	Array supplied by Wordpress of params to the renderer
 * 							church_name="mychurch" is required - with "mychurch" replaced with your church name
 *							date_start="2025-01-01" is optional - a date within the month displayed,
 *                                                                or the current month if omitted
 */
function b4cs_calendar_render( $atts ) {
	return ( new Cs_Calendar_Renderer( $atts ) )->render();
}
