<?php
/**
  Plugin Name: WP Business Intelligence
  Plugin URI:  http://www.wpbusinessintelligence.com/
  Description: Create dynamic charts for your users. Connect to a database and show SQL queries results in beautiful, responsive charts.
  Version:     3.1.9
  Author:      Joe Youngblood
  License:     GPLv2
  License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// TODO: use link for author
// TODO: create landing page for PluginURI link

require(__DIR__ . DIRECTORY_SEPARATOR . 'EnforceRequirements.php');
EnforceRequirements::ensureRequirementsMet();

require(__DIR__ . DIRECTORY_SEPARATOR . 'bootstrap.php');

Wpbi\Loader::startSession();
Wpbi\Loader::addPluginMenu();
Wpbi\Loader::setupDatabase();
Wpbi\Loader::setupAdminPostRoutes();
Wpbi\Loader::registerShortcode();
Wpbi\Loader::enqueueAssets();
Wpbi\Loader::queueFlashNotices();
Wpbi\Loader::addValidatorRules();
