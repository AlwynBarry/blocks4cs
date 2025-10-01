=== Blocks for ChurchSuite ===
* Contributors: dramb
* Tags: Events, Groups, ChurchSuite, Blocks
* Requires at least: 6.7
* Tested up to: 6.8
* Stable tag: 1.0.0
* License: GPLv2 or later

Blocks4CS is a plugin providing blocks that enable display of event and
smallgroup data from ChurchSuite in various ways.


== Description ==

Blocks4CS allows you to display certain data from ChurchSuite on your
Wordpress website without resorting to embedding iframes. This plugin
provides Blocks that are easy to drop into any page or post. Each
block will, behind the scenes, request data from your ChurchSuite feed,
and will display the data returned in a similar way to the usual
ChurchSuite iframes, but natively to your website.  Many aspects of the
display can be modified in your theme to make the display match your
website theme. The blocks allow you to use a range of attributes so that
you can display just the information you want for each part of your
website.


== Current features include: ==

* block to return events as 'cards' with the event image and details
* block to return events in a 'list' group by date
* block to return a full month calendar, for the current month or a date
* block to return groups as 'cards' with the group image and details
* All API requests are cached with a 4 hour cache to ensure fast performance


== A little Technical information ==

For the technical among you: This block works on the 'server side',
building the response which is delivered to your browser from churchsuite.

== Support ==

If you have a problem or a feature request, please send a message to the author.


== Demo ==

Currently there is no demo site, but you can view examples on a church website:

- the [Featured Events](https://www.cambray.org/),
- the [Small Groups list](https://www.cambray.org/connect/smallgroups/),
- the [Events List](https://www.cambray.org/whats-on/),
- the [Calendar](https://www.cambray.org/whats-on/calendar)


== Contributions ==

This plugin relies on information provided by ChurchSuite using their
'embed' JSON feed.  Details of this JSON feed can be found here:

https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md


== Installation ==

* From within Wordpress - In the Wordpress Dashboard use the menu to go
  to Plugins and from there choose 'Add new plugin'.  Search for
  'churchsuite' and then look for this plugin.  Select the 'install'
  button on the plugin to install it, and once installed use the
  'activate' link to activate the plugin.

* If you want to install from github:

	- Download from 'releases'
	- Rename the zip file downloaded 'blocks4cs.zip' (i.e. remove any
	  version info in the filename)
	- In Wordpress use the Install New Plugin page to upload the zip
	  file, or alternatively, unpack and upload the blocks4cs directory
	  to your '/wp-content/plugins/' directory.
	- Once you have done either of the above, Activate the plugin
	  through the 'Plugins' page in the WordPress dashboard.

* Once you have used either method to install the plugin, you need to
  then add a block (see examples below) to your wordpress posts or pages
  where you need them


== Usage ==

* For the *Event Cards block*, place the block into a page or post. Set
  the name of your ChurchSuite feed in the Church Name attribute (ie.
  the name that is at the start of your churchsuite url e.g.
  https://mychurch.churchsuite.com - the name is 'mychurch').
  
  You should see the block populate with events in the
  editor straightaway
  
  You can ude the various parameters in the side bar to refine your
  search for events - see below for the many options
  
  Because your calendar will have _many_ events, we can limit the number
  of events which are returned using the Number Of Events attribute
  combined with the Days Ahead attribute.  This latter attribute sets
  how many days ahead you will look over to find a set of events from.
  If this is set too large and you have a lot of events, the data
  request from ChurchSuite will take too long to return.  So just
  experiment until you get the number of events over the time period
  you want.
  
  Other attributes allow you to refine the events returned as follows:

	* Start Date  - the starting date to look for events
	* Days Ahead  - the number of days ahead from the start date to look
	* Number of Results - the number of events to display from those returned
	* Featured    - whether to show only events marked as 'Featured'
	
  And, in the 'Advanced' group you can do further refinements:
	* Categories  - only look for events in the categories whose category
				    numbers are given
    * Event Names - Only list events where the string given is in the
                    event title (e.g. 'service' to return all services)
	* Sites       - if you have a multi-site church, only look for events
				    for the sites whose site numbers are given
	* Events      - Only look for events in the list of event numbers
                    (Useful if you want to highlight a few particular events)
    * Merge       - List only the first event or all events in a sequence
    * Sequence    - Only list events in a given sequence number
    
  Details of these attributes and their values can be found here:

https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md

* For the *Event List block*, place the block into a page or post. Set
  the name of your ChurchSuite feed in the Church Name attribute (ie.
  the name that is at the start of your churchsuite url e.g.
  https://mychurch.churchsuite.com - the name is 'mychurch').
  
  You should see the block populate with events in the
  editor straightaway
  
  The comments above about attributes you can set also apply to this
  block.  By default only a maximum of 5 days events are returned, but
  this can be overridden using the attributes.

* For the *Calendar block* , place the block into a page or post. Set
  the name of your ChurchSuite feed in the Church Name attribute (ie.
  the name that is at the start of your churchsuite url e.g.
  https://mychurch.churchsuite.com - the name is 'mychurch').
  
  You should see the calendar block populate with events in the
  editor straightaway.
  
  Fewer customization parameters are available for this block because
  only a subset of the parameters listed above make sense for a monthly
  calendar.

* For the *Smallgroups block*,, place the block into a page or post. Set
  the name of your ChurchSuite feed in the Church Name attribute (ie.
  the name that is at the start of your churchsuite url e.g.
  https://mychurch.churchsuite.com - the name is 'mychurch').
  
  You should see the block populate with groups in the
  editor straightaway.

  The only parameter for SmallGroup lists that ChurchSuite supports is
  the sites parameter, which you will find under the 'Advanced' section.


== License ==

The plugin itself is released under the GNU General Public License. A
copy of this license can be found at the license homepage or in the top
comment within the `blocks4cs.php` file.


== Frequently Asked Questions ==

= The block produces no output =

	The default behaviour when there is an error is to give no output
	rather than produce error messages all over your website.  Check
	that you have supplied the correct churchname, or test it with the
	churchname 'demo' to see if that is the problem.  Check that you can
	actually get to your ChurchSuite JSON api url - try entering the
	following URL in a browser with your church name instead of `mychurch`:

		https://mychurch.churchsuite.com/embed/calendar/json?num_results=3

= How do I add my church so that I get the JSON feed for my church? =

	You must use the block `Church Name` attribute to enter the name of
	your church which appears at the start of the churchsuite URL for
	your church.

= I want to limit the number of events in the block =

	You can use the Number of Events block attribute to show a
	particular number of events.

= The block is not showing any results =

	By default the Events List only looks ahead 5 days and Events Cards
	only 20 days.  If your future events are beyond that nothing will
	show, or if you are only looking for featured events or events
	within a particular category or with a particular name, none may be
	within the number of days being searched. So just adjust the Days
	Ahead attribute or the search parameters.
	
= I've changed a search attribute but the seems to be no change to the results

	All search attributes are 'sanitized' to legal values before they are
	used, and if a sane legal value cannot be found the attribute is
	discarded.  So, for example, a date like 2025-02-40 would be ignored.
	The block doesn't change what you have entered into the attributes so
	as not to confuse you.  So, just try some different attribute values
	until you get something legal.  If in doubt, remove the block and add
	a new block - this will start with 'sane' default values, and you
	can test on the 'demo' site ChurchSuite provides to see what it
	returns.  Alternatively, use the Church Name 'cambray' to test - it
	has a busy programme of events and so most queries will return a
	result if legal search values are given.

= I want to change how the output looks: =

	In general the blocks don't seek to set fonts and only use relative
	text sizes.  So, by setting fonts or text size in surrounding
	blocks you will see changes in the blocks themselves.  You can also
	use the font size attributes in the style tab to set the base font
	size.
	
	In addition to the text size, the background, margins and padding of
	the containing box, and whether it is displayed in normal, wide or
	full width can be adjusted from the block attributes in the sidebar
	style tab.

	For things like line or background color within the block, all block
	output is formatted via css - just override the default css rules
	in your theme.  All the CSS rules begin with 'b4cs-' and so these
	are easy to find in your browser's inspector panes. Once overridden
	in your theme css file you can make them fit well with your theme.
	
= I want a list of events which looks very different to those you provide =

	Because there are css rules for every part of the block, there is a
	lot you can do just in css.  For example, the dramatic change in
	format of the calendar from a monthly grid to an events list when
	it is displayed on a narrow screen is all accomplished by css rules.
	So, you may be able to achieve what you want via css rule changes.

	If your idea is dramatically different, however, please use the
	support forum to put in a request for a new feature.  We will do
	what we can to provide anything which might also be useful to others.


== Screenshots ==

1. Featured Events
2. Event List
3. Calendar
4. Small Groups
5. Example block for Featured Events


== Changelog ==


= 1.0.0 =

**2025-09-29**
* Added all ChurchSuite attributes to each block that were not previously
  present.  Added the santizers for all the permitted attributes.  Added
  i18n support to the blocks for potential future translators.  Tidied up
  code where needed.  Removed now unused js scripts and html includes for
  the old Alpine.js support.  Removed duplicated css and moved non-shared
  styles into each block. Fixed an error in the display of calendar, and
  made sure we remove days with no events from the small screen event list
  rendering of the calendar. Edited the readme.txt to reflect these changes.

**2025-09-27**
* Added some block attributes to allow background setting for the whole
  block, permit left, right alignment of the block or wide or full spread
  for the block, and add adjustment to block padding and margins.

**2025-09-26**
* Working version available and ready for testing prior to submission
  to the Wordpress Plugin 

= 0.0.1 =

**2025-09-09**
* Initial release - Everything is tested and working, but only a subset
  of the attributes which could be used are provided.
  
**2025-04-26
* Working version with all blocks using Alpine.js.  But back-end would
  not use Alpine.js.  So needed to refactor it all to use PHP only.


**2025-04-02
* First attempt to move the Shortcode plugin cs-js-integration to a block
