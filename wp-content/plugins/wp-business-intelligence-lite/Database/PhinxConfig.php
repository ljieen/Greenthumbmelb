<?php

namespace Wpbi\Database;

use Wpbi\Settings;

class PhinxConfig {

  private $wpConfig;

  public function __construct(WpConfig $wpConfig) {
    $this->wpConfig = $wpConfig;
  }

  public function getConfig() {
    // TODO: won't work with sockets
    $config = array(
      'paths' => array('migrations' => $this->getMigrationPath()),
      'environments' => array(
        'default_migration_table' => $this->getMigrationTableName(),
        'default_database' => Settings::PLUGIN_ABBREVIATION, // is an environment not a database
        Settings::PLUGIN_ABBREVIATION => $this->databaseConfig()
      )
    );
    $this->setPort($config);
    return $config;
  }

  public function getMigrationTableName() {
    return $this->wpConfig->getTablePrefix()
      . Settings::PLUGIN_ABBREVIATION
      . '_phinx_log';
  }

  private function getMigrationPath() {
    return join(DIRECTORY_SEPARATOR, array(__DIR__, 'migrations'));
  }

  private function setPort(&$config) {
    $port = $this->wpConfig->getPort();
    if (is_null($port) === false) {
      $config['environments'][Settings::PLUGIN_ABBREVIATION]['port'] = $port;
    }
  }

  private function databaseConfig() {
    $databaseConfig = array(
      'adapter' => Settings::PHINX_ADAPTER,
      'host' => $this->wpConfig->getHost(),
      'user' => $this->wpConfig->getUserName(),
      'pass' => $this->wpConfig->getPassword(),
      'name' => $this->wpConfig->getName(),
      'charset' => $this->wpConfig->getCharset(),
      'collation' => $this->wpConfig->getCollation(),
      'engine' => $this->wpConfig->getEngine()
    );
    return $databaseConfig;
  }

}
