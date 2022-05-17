=== WP Business Intelligence Lite ===
Contributors:      joeyoungblood
Donate link:       http://www.wpbusinessintelligence.com/products-and-services/pricing
Tags:              charts, tables, mysql, sql, d3, line chart, pie chart, donut chart, data analytics, business intelligence, bi, reporting, britecharts
Requires PHP:      5.6.0
Requires at least: 4.4.0
Tested up to:      5.7
Stable tag:        3.1.9
License:           GPLv2
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Dynamic web charts and tables for your site! Connect to your live WordPress instance DB to retrieve data in real-time and update charts and tables!

== Description ==
WP Business Intelligence Lite allows you to powerfully display responsive data tables and charts on your website. This plugin is simple to use and allows you to connect with your wordpress database and display the data in real time. Once you have created at least one SQL query that retrieves data from your DB, you can define the type of chart (bar, donut, line, or grouped bar) or table to be used to display them. A simple shortcode embeds the chart or table in any post or page. Each page refresh retrieves the data from the DB so that the information in the chart or table is always up-to-date.

Installation guide, FAQs and support can be found at [WP Business Intelligence Support](http://www.wpbusinessintelligence.com/support)

[WP Business Intelligence Demos](http://www.wpbusinessintelligence.com/demos)

In order to use your own live MySQL, MS SQL, or PostgreSQL database with WP Business Intelligence, purchase the Pro version of WP Business Intelligence from the [WP Business Intelligence web site](http://www.wpbusinessintelligence.com)

We are actively developing this plugin and would love to hear from you with feature requests. [Contact Us.](http://www.wpbusinessintelligence.com/contact/)

Some icons provided by [Font Awesome](https://fontawesome.com/license)

= Features =

1. Live connection to your WordPress DB via custom SQL queries
2. Responsive charts/tables
3. Works in Chrome, Firefox, IE9+
4. Charts based on [Britecharts](https://eventbrite.github.io/britecharts/tutorial-kitchen-sink.html)
5. Tables build on [Datatables](https://datatables.net/)

== Installation ==

1. Upload the uncompressed folder `wp-business-intelligence-lite` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

OR

1. Upload the wp-business-intelligence-lite.zip file via the 'Plugins->Add New' page of your WordPress dashboard
2. Activate the plugin through the 'Plugins' menu in WordPress

== Changelog ==
= 3.1.9 =
* Session optimization for WordPress
= 3.1.8 =
* DB update condition added
= 3.1.7 =
* New migration directory
= 3.1.6 =
* Charts DB tables migration condition added
= 3.1.5 =
* Name, Caption, Tooltip added to charts
= 3.1.4 =
* New Charts added
= 3.1.3 =
* Chart version updated
= 3.1.2 =
* Increase length of queries
= 3.1.1 =
* PostgreSQL support in pro version
* Test on latest WordPress (5.1.1)
* Improve loading of scripts when jQuery is not yet loaded
= 3.1.0 =
* Microsoft SQL Server support in pro version
* Minor changes that should make things more robust
* Added testing for PHP 7.2, 7.0
* Added testing for MyISAM (InnoDB was already tested)
* Added testing for MySQL 5.5, 5.7, 8.0
* Added testing for MariaDB 5.5, 10.3
= 3.0.10 =
* Minor bug fix: initial order of datatable defaulted to ordering by first row
* tested up to WordPress 4.9.8
= 3.0.9 =
* Remove automatically calculated timestamps because of db version inconsistencies (and because they were not used)
= 3.0.8 =
* Add more info for debugging initial installation
* Minor fixes to this file
* Minor improvements to tests
= 3.0.7 =
* fix issue with php 5.6 compatibility
= 3.0.6 =
* do not use with php 5.6
* test on WordPress 4.9.6
* update dependencies to work better with old versions of php
* improve similarity of tables created with default wp tables (collation and charset)
* fix startup failing on MySQL 5.6 if using mb4 by default
* fix bug if InnoDB does not exist
= 3.0.5 =
* php 5.6.0 support
= 3.0.4 =
* More verbose error logging if plugin cannot be activated
* Disable plugin if there are issues connecting to database
= 3.0.3 =
* Prevent old versions of PHP and WordPress from using this plugin
= 3.0.2 =
* Bug fix for users who upgraded with legacy table
= 3.0.1 =
* Workaround bug where britecharts chooses the wrong colors for grouped bar charts
= 3.0.0 =
* Complete rewrite.  Backward incompatible with previous version.
* Use Britecharts instead of directly using d3
* Update to Datatables 1.10
= 1.6.7 =
* rollback table.tpl for compatibility issues
= 1.6.6 =
* bug fix in table pagination
= 1.6.4 =
* color class renamed to wpbi_color
* add_query_arg escaped to fix vulnerability
= 1.6.3 =
* SQL injection vulnerability fix enhanced
= 1.6.2 =
* SQL injection vulnerability fixed
= 1.6.1 =
* Validated on WP 4.1.1
* Error message added in case of no data
= 1.6 =
* Bug on iframe fixed
* X and Y labels added
* Validated on WP 4.0
= 1.5 =
* Added possibility to download charts and tables data
* Charts and table download as PDF or image
* Additional controls on charts
= 1.4 =
* Charts and tables IDs are shown in the dashboard
= 1.3 =
* Removed file with potential vulnerability
= 1.2.1 =
* Missing include added to includes.php
= 1.2 =
* Some major bug fixes and support of click event on bar chart (example for developers to be extended to other charts)
= 1.1 =
* Security vulnerability fixed and control over bar charts color added.
= 1.0.7 =
* Added support for text labels to line charts
= 1.0.6 =
* Renamed button registration function to avoid conflicts with other themes
= 1.0.5 =
* TinyMCE button registration warning fixed.
* Donut chart added
* Version 1.1.13 of NVD3 integrated
= 1.0.4 =
* Bug fix with queries pagination
= 1.0.3 =
* Code was cleaned up to remove some warnings
= 1.0.2 =
* First integration of "DataTables" tables
= 1.0.1 =
* Fixes on JS inclusion and icon chart
= 1.0 =
* First beta release


== Upgrade Notice ==

= 1.0.1 =
Bug fix on JS inclusion that caused an error at plugin activation

= 1.0.2 =
Tables are integrated with the DataTables jQuery plugin

= 1.0.3 =
Warnings in Debug mode are removed.

= 1.0.6 =
A new column to the charts_view table is added

= 3.0.0 =
Backwards incompatible upgrade. Previously created charts not supported.

== Screenshots ==
1. [Create and test a bar chart (click to enlarge)](http://www.wpbusinessintelligence.com/wp-content/uploads/2021/01/wpbusinessintelligence-screenshot-1.png)
2. [Create and test a donut chart (click to enlarge)](http://www.wpbusinessintelligence.com/wp-content/uploads/2021/01/wpbusinessintelligence-screenshot-2.png)
3. [Create and test a data table (click to enlarge)](http://www.wpbusinessintelligence.com/wp-content/uploads/2021/01/wpbusinessintelligence-screenshot-3.png)
4. [Embed charts in a post (click to enlarge)](http://www.wpbusinessintelligence.com/wp-content/uploads/2021/01/wpbusinessintelligence-screenshot-4.png)
5. [Connect and query your database (click to enlarge)](http://www.wpbusinessintelligence.com/wp-content/uploads/2021/01/wpbusinessintelligence-screenshot-5.png)
