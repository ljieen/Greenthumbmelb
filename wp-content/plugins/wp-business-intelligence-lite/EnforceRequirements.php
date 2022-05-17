<?php
/**
 * Must not depend on any other files being loaded
 * Must be compatible with old versions of PHP (tested down to php 5.3)
 * To do manual test edit docker-compose to use older version eg
 * php:
 *   image: romeoz/docker-apache-php:5.3
 *   volumes:
 *     - ./builds/:/var/www/app/
 *     - ./:/data/
 *   ports:
 *     - 80:80
 *   environment:
 *     MYSQL_ROOT_PASSWORD: password
 *     MYSQL_HOST: db
 *     DOMAIN: wpbi.test
 */

class EnforceRequirements { // phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace

  const MINIMUM_PHP_VERSION = '5.6.0'; // must match readme.txt
  const MINIMUM_WP_VERSION = '4.4.0'; // must match readme.txt
  const PLUGIN_NAME = 'WP Business Intelligence';
  const PLUGIN_FILE_PATH = 'wp-business-intelligence-lite/index.php';

  /**
   * run in admin to ensure that if plugin is activated it should be
   * if it shouldn't be, it is deactivated
   */
  public static function ensureRequirementsMet() { // uncovered
    if (self::areRequirementsMet()) {
      return;
    }
    self::deactivatePlugin();
    wp_die(self::deactivationMessage());
  }

  public static function areRequirementsMet($phpVersion = null, $wpVersion = null) {
    if (is_null($phpVersion)) {
      $phpVersion = PHP_VERSION;
    }
    if (is_null($wpVersion)) {
      $wpVersion = $GLOBALS['wp_version'];
    }
    return self::isPhpVersionCompatible($phpVersion) && self::isWpVersionCompatible($wpVersion);
  }

  private static function isPhpVersionCompatible($phpVersion) {
    return version_compare($phpVersion, self::MINIMUM_PHP_VERSION, '>=');
  }

  private static function isWpVersionCompatible($wpVersion) {
    return version_compare($wpVersion, self::MINIMUM_WP_VERSION, '>=');
  }

  private static function deactivatePlugin() {
    if (! function_exists('\deactivate_plugins')) {
      require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    \deactivate_plugins(self::PLUGIN_FILE_PATH);
  }

  private static function deactivationMessage() {
    return "The plugin " . self::PLUGIN_NAME .
      " was disabled because it needs at least PHP version " . self::MINIMUM_PHP_VERSION .
      ' and WordPress version ' . self::MINIMUM_WP_VERSION . '.';
  }

}
