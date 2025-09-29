/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks/src/cs-event-list/block.json":
/*!*********************************************!*\
  !*** ./blocks/src/cs-event-list/block.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"b4cs/cs-event-list","version":"0.1.0","title":"Event List for ChurchSuite","category":"widgets","icon":"megaphone","description":"Display a list of Events from ChurchSuite","example":{},"supports":{"html":false,"align":["center","wide","full"],"color":{"text":true,"background":true,"gradients":true,"link":true},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"textAlign":true}},"attributes":{"church_name":{"type":"string","default":"demo"},"days_ahead":{"type":"integer","default":5},"num_results":{"type":"integer","default":20},"featured":{"type":"boolean","default":false}},"textdomain":"blocks4cs","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","script":[],"render":"file:./render.php","viewScript":"file:./view.js"}');

/***/ }),

/***/ "./blocks/src/cs-event-list/edit.js":
/*!******************************************!*\
  !*** ./blocks/src/cs-event-list/edit.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./blocks/src/cs-event-list/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */





/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Event List Source'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: "ChurchSuite Church Name",
            onChange: new_church_name => setAttributes({
              church_name: new_church_name
            }),
            value: attributes.church_name
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
            label: "Days Ahead",
            min: 0,
            max: 365,
            onChange: new_days_ahead => setAttributes({
              days_ahead: isNaN(parseInt(new_days_ahead)) ? 0 : parseInt(new_days_ahead)
            }),
            value: attributes.days_ahead
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
            label: "Number of Results",
            min: 0,
            max: 1000,
            onChange: new_num_results => setAttributes({
              num_results: isNaN(parseInt(new_num_results)) ? 0 : parseInt(new_num_results)
            }),
            value: attributes.num_results
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
            label: "Featured Events Only",
            help: attributes.featured ? "Only featured events" : "All events",
            checked: attributes.featured,
            onChange: new_featured => setAttributes({
              featured: new_featured
            }),
            value: attributes.featured
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default()), {
        block: "b4cs/cs-event-list",
        attributes: attributes
      })
    })]
  });
}

/***/ }),

/***/ "./blocks/src/cs-event-list/editor.scss":
/*!**********************************************!*\
  !*** ./blocks/src/cs-event-list/editor.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./blocks/src/cs-event-list/index.js":
/*!*******************************************!*\
  !*** ./blocks/src/cs-event-list/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./blocks/src/cs-event-list/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./blocks/src/cs-event-list/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./blocks/src/cs-event-list/block.json");
/* harmony import */ var _js_b4cs_alpine_apps_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/b4cs-alpine-apps.js */ "./blocks/src/js/b4cs-alpine-apps.js");
/* harmony import */ var _js_b4cs_alpine_apps_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_b4cs_alpine_apps_js__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./blocks/src/cs-event-list/style.scss":
/*!*********************************************!*\
  !*** ./blocks/src/cs-event-list/style.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./blocks/src/js/b4cs-alpine-apps.js":
/*!*******************************************!*\
  !*** ./blocks/src/js/b4cs-alpine-apps.js ***!
  \*******************************************/
/***/ (() => {

/**
 * Name: b4cs-alpine-apps
 * 
 * Descripton: Object that provides the functionality required to display the calendar in Alpine.js
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
 * Remove all the HTML tags in a string
 *
 * @since	1.0.0
 * @param   string  str The string to be sanitized
 * @return  string      The string with all HTML tags removed
 */
function b4cs_remove_tags(str) {
  if (str === null || str === '') return '';else str = str.toString();
  return str.replace(/(<([^>]+)>)/ig, '');
}

/**
 * Sanitize all the HTML in a string
 *
 * @since	1.0.0
 * @param   string  str The string to be sanitized
 * @return  string      The string with all HTML tags removed
 */
function b4cs_sanitize_HTML(str) {
  var element = document.createElement('div');
  element.innerText = str;
  return element.innerHTML;
}

/**
 * A x-data object to maintain the date of the request for the calendar and provide
 * utility functions and filters that enable the calendar to be rendered correctly
 * 
 * @since   1.0.0
 */
function b4cs_calendar_app() {
  return {
    /**
     * The dayjs instance holding today's date - allows the date to be highlighted
     *
     * @since   1.0.0
     * @var     dayjs	today	Holds today's date
     */
    today: '',
    /**
     * The month number (0 - 11) of the month currently being displayed.
     * Initially this is set to the month number of the date in the month
     * requested as the start date.  This is updated by the forward and back
     * buttons to a different month, as desired by the viewer.
     *
     * @since   1.0.0
     * @var     int	  month	Holds the month number (0..11) of the
     *                      base date of the calendar being displayed
     */
    month: '',
    /**
     * The month name of the month currently being displayed.
     * This is kept in sync with the change in the month number as long as
     * get_days() is called to fetch the new month data
     *
     * @since   1.0.0
     * @var     string	month_name	Holds the string name of the current month
     */
    month_name: '',
    /**
     * The year number.  This is initially set to today's year. We hold this
     * so that we can conveniently create dates for comparison purposes.
     *
     * @since   1.0.0
     * @var     int year    Holds the year number of the base date of the
     *                      calendar being displayed
     */
    year: '',
    /**
     * The day number.  This is initially set to today's day number.
     *
     * @since   1.0.0
     * @var     int day     Holds the day number (1..31) of the base date
     *                      of the calendar being displayed
     */
    day: '',
    /**
     * An array holding 5 weeks worth of date stings in YYYY-MM-DD format
     * which we iterate over to output the events for each date.  The dates
     * are re-written by calling function get_days() after the year, month,
     * or day attributes are set to get five weeks which will include the
     * whole week the initial date is in and the subsequent four weeks.
     *
     * @since   1.0.0
     * @var     array   days  An array of 35 dates from the start of the week
     *                        of the date being displayed until the end of the
     *                        week five weeks later.
     */
    days: [],
    /**
     * An array of day names in the localized format. This is a local copy
     * of the day names that the ChurchSuite API creates. This array is used
     * to display the days at the top of the calendar.  The days are arranged
     * to always start from Sunday.
     *
     * @since   1.0.0
     * @var     array   day_names   Holds seven localized names of the days
     *                              of the week starting from Sunday.
     */
    day_names: [],
    /**
     * Construct the initial values from today's date.
     *
     * @since	1.0.0
     */
    init_date() {
      /*
       * Set the date values from today's date using a dayjs date
       */
      this.today = dayjs();
      this.year = this.today.get('year');
      this.month = this.today.get('month');
      this.month_name = this.today.format("MMMM");
      this.day = this.today.get('date');
      /*
       * Set the day names to the internationalised day names ChurchSuite provides
       */
      let cs_day_names = CS.dayOfWeekOptions();
      this.day_names.push(cs_day_names[6].name);
      for (var i = 0; i < 6; i++) {
        this.day_names.push(cs_day_names[i].name);
      }
    },
    /**
     * Check if a dayjs date supplied is before today's date
     *
     * @since	1.0.0
     * @param   dayjs   date    The date to be checked
     * @return  bool            True if the year, month, date part of the date
     *                          is prior to that of the current date (ignore time)
     */
    is_before_today(date) {
      return date.isBefore(this.today);
    },
    /**
     * Check if a dayjs date supplied is equal to today's date
     *
     * @since	1.0.0
     * @param   dayjs   date    The date to be checked
     * @return  bool            True if the year, month, date part of the date
     *                          is the same as that of today's date
     */
    is_today(date) {
      return date.isSame(this.today, 'day') ? true : false;
    },
    /**
     * Check if a ChurchSuite Event object is on the same date as the date
     * being represented by the filter object passed as a parameter.
     *
     * @since	1.0.0
     * @param   Event   ev  The ChurchSuite Event object to be checked
     * @param   dayjs   d   The current date being processed in the filter        
     * @return  bool        True if the event is the same date as the filter date d
     */
    equals_date_filter(ev) {
      /* NOTE: this.d is the filter object, NOT an attribute of this class */
      const other = new dayjs(this.d);
      return ev.start.isSame(other, 'day') ? true : false;
    },
    /**
     * Construct an array of the days in the five weeks from the week which
     * includes the current day.  The array contains date strings in the format
     * 'YYYY-MM-DD' for each day of the five weeks, beginning on Sunday.
     *
     * @since	1.0.0
     * @return  array    Array of 35 strings, each with format 'YYYY-MM-DD'
     *                   which are the dates of the days from the start of the
     *                   week of the current date and on for 35 days (5 weeks)
     */
    get_days() {
      let origin_date = dayjs(this.year + '-' + (this.month + 1) + '-' + this.day);
      let day_of_week = origin_date.day();
      let start_date = origin_date.subtract(day_of_week, 'day');
      let days_to_display = 35; // Multiple of 7 - default is 5 weeks

      let days_array = [];
      for (var i = 0; i < days_to_display; i++) {
        days_array.push(start_date.format('YYYY-MM-DD'));
        start_date = start_date.add(1, 'day');
      }
      this.month_name = origin_date.format('MMMM');
      this.days = days_array;
    }
  };
}

/**
 * A x-data object to maintain the date of the request for the event list
 * and provide utility functions so that each event can be checked to see
 * when a new date has been reached.
 * 
 * @since   1.0.0
 */
function b4cs_event_list_app() {
  return {
    /**
     * The dayjs instance holding the date of the current item being
     * processed, initialised to a date before the first event.
     * Used to work out when we have a first occurance of a new date
     *
     * @since   1.0.0
     * @var     dayjs	current_date	Holds the day being processed
     */
    current_date: '',
    /**
     * Construct the initial values from today's date.
     *
     * @since	1.0.0
     */
    init_date() {
      /*
       * Set the date values from today's date using a dayjs date
       */
      this.current_date = dayjs().subtract(1, 'day');
    },
    /**
     * Check if a dayjs date supplied is on the previous date stored
     * As a side effect, if the date is different, update the date
     * recorded to the date of the current event.
     *
     * @since	1.0.0
     * @param   dayjs   date			The date to be checked
     * @return  bool					True if the year, month, date part of the date
     *                          		is the same as that of the stored date
     * @state	datejs	current_date	Updated to the date of the event if
     * 									the current_date is an earlier date.
     */
    is_same(date) {
      let result = date.isSame(this.current_date, 'day') ? true : false;
      if (!result) {
        // Set the current date to the date passed in
        this.current_date = date;
      }
      return result;
    }
  };
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/server-side-render":
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["serverSideRender"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"cs-event-list/index": 0,
/******/ 			"cs-event-list/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkblocks4cs"] = globalThis["webpackChunkblocks4cs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["cs-event-list/style-index"], () => (__webpack_require__("./blocks/src/cs-event-list/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map