/**
 * Name: b4cs-scripts.js
 * 
 * Descripton: Script to reveal a calendar event details when a calendar button is pressed
 * 
 * @author		Alwyn Barry
 * @copyright	2025
 * For use in	blocks4cs
 * @license		http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * @version		1.0.0
 * 
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU 
 * General Public License as published by the Free Software Foundation; either version 2 of the License, 
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * 
 */
 
/**
 *  PRIVATE: Utility function used to ensure that we are not adding a class multiple times
 *  NOTE: Can now replace with .classList.add('...')
 */
function b4cs_addClass(obj, item) {
	const itemWithSpace = ' ' + item;
	if ((obj !== null) && (obj.className.indexOf(item) == -1)) {
		obj.className += itemWithSpace;
	}
}

/**
 * PRIVATE: Utility function used to enable safe removal of a class
 * 		If the class name provided doesn't exist in the list, no change
 * 		is made to the class list.  Otherwise the class is removed.
 *  NOTE: Can now replace with .classList.remove('...') or classList.toggle('...')
 * 
 * @param obj	the DOM object to remove the class from its class list
 * @param item	the class name string to be removed from the class list
 */
function b4cs_removeClass(obj, item) {
	const itemWithSpace = ' ' + item;
	if (obj !== null) {
		obj.className = obj.className.replace(itemWithSpace, "");
	}
}

/**
 * PRIVATE: Utility function to close all open pop-ups so only one is open at a time.
 * NOTE: Could do with single line (though less obvious):
 *   Array.from( document.querySelectorAll( '.b4cs-event-hover-reveal' ) ).forEach( function( el ) { el.classList.remove( 'b4cs-event-hover-reveal' ) } );
 */
function b4cs_closeAllEventDetails() {
	let popUps = document.getElementsByClassName("b4cs-event-hover-reveal"); /* Fetch the array of PopUp Event Details */
	for (let i=0; i<popUps.length; i++) {
		b4cs_removeClass(popUps[i], "b4cs-event-hover-reveal");
	}
	/* Should only be called when the focus is about to be moved to a new pop-up, so no need to change the focus here */
}

/**
 * Open the modal pop-up for the details of the calendar event
 * 
 * @param obj	should be the button to open the pop up, contained within the cs-event-hover_block
 */
function b4cs_revealEventDetails(obj) {
	/* Close all open Event Details ... should be 0 or 1 */
	b4cs_closeAllEventDetails();
	/* Open the details part of an event when the '...' button is clicked */
	let parent = obj.parentNode; /* Fetch the 'b4cs-calendar-event' div, which contains the cs-event-hover-block */
	if (parent !== null) {
		let hover = parent.getElementsByClassName("b4cs-event-hover-block")
		if (hover.length > 0) {
			b4cs_addClass(hover[0], "b4cs-event-hover-reveal");
			/* Set the focus so that screen-readers go to the right place */
			hover[0].focus();
		}
	}
}

/**
 * Close the details part of an event when the 'x' button is clicked
 * 
 * @param obj	should the the button within the popup (cs-event-hover-block)
 */
function b4cs_hideEventDetails(obj) {
	let parent = obj.parentNode; /* Fetch the 'b4cs-event-hover-block' div */
	if (parent !== null) {
		b4cs_removeClass(parent, "b4cs-event-hover-reveal");
		parent = parent.parentNode; /* Fetch the 'b4cs-calendar-event' div which contains the event these details belong to */
		/* Take the focus back to the parent to help screen-readers */
		if (parent !== null) { parent.focus(); }
	}
}


/* NOTE: Could replace the above with eventListners:
 *   Array.from( document.querySelectorAll( '.b4cs-clickable-caret-open' ) ).forEach( function( el ) { el.attachEventListener( "click", b4cs_reveal_event_details, false ) } );
 *   Array.from( document.querySelectorAll( '.b4cs-clickable-caret-close' ) ).forEach( function( e) ) { el.attachEventListener( "click", b4cs_hide_event_details, false ) } );
 */

