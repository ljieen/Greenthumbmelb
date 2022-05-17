<?php
require(__DIR__ . DIRECTORY_SEPARATOR . 'autoload.php');
require(__DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php');

$GLOBALS[\Wpbi\Settings::WP_GLOBAL_INDEX] = new \Wpbi\WpGlobals();
