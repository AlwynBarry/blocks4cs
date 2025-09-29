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
  
  You can adjust the number of future events you need in a page or post.
  
  You can also only show featured events by selecting that toggle.
  
  Because your calendar will have _many_ events, we can limit the number
  of events which are returned using the Number Of Events attribute
  combined with the Days Ahead attribute.  This latter attribute sets
  how many days ahead you will look over to find a set of events from.
  If this is set too large and you have a lot of events, the data
  request from ChurchSuite will take too long to return.  So just
  experiment until you get the number of events over the time period
  you want.

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

* For the *Smallgroups block*,, place the block into a page or post. Set
  the name of your ChurchSuite feed in the Church Name attribute (ie.
  the name that is at the start of your churchsuite url e.g.
  https://mychurch.churchsuite.com - the name is 'mychurch').
  
  You should see the block populate with events in the
  editor straightaway. 

See `https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/embed.md=calendar-json-feed`
for a full list of parameters that can be used.


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

	You can use the Number of Events block parameter to show a
	particular number of events:

= Events List is not showing any results

	By default the Events List only looks ahead 5 days.  If your future
	events are beyond that nothing will show.  So just adjust the
	Days Ahead attribute.

= I want to change how the output looks: =

	The output is formatted via css - just override the defaults in your
	theme.


== Screenshots ==

1. Featured Events
2. Event List
3. Calendar
4. Small Groups
5. Example block for Featured Events


== Changelog ==


= 1.0.0 =


**2025-09-26**
* Working version available and ready for testing prior to submission
  to the Wordpress Plugin 

= 0.0.1 =

**2025-09-09**
* Initial release - Everything is tested and working, but only a subset
  of the attributes which could be used are provided.
  
**2025-04-26
* Working version with all blocks using Alpine.js.  But back-end would
  not use Alpine.js.  Need to refactor it all to use PHP only.


**2025-04-02
* First attempt to move the Shortcode plugin to a block
