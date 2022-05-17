<?php
namespace Wpbi;

class WpGlobals {

  public function getDbHost() {
    return DB_HOST;
  }

  public function getDbUser() {
    return DB_USER;
  }

  public function getDbName() {
    return DB_NAME;
  }

  public function getDbPassword() {
    return DB_PASSWORD;
  }

  public function getWpdb() {
    return $GLOBALS['wpdb'];
  }

}
