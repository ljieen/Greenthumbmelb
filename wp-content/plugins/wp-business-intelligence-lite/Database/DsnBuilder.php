<?php

namespace Wpbi\Database;

class DsnBuilder {

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  public static function dsn($databaseConnection) {
    $dsn = "mysql:";
    if ($databaseConnection->database_name) {
      $dsn .= sprintf("dbname=%s;", $databaseConnection->database_name);
    }
    if ($databaseConnection->host) {
      $dsn .= sprintf("host=%s;", $databaseConnection->host);
    }
    if ($databaseConnection->port) {
      $dsn .= sprintf("port=%d;", $databaseConnection->port);
    }
    if ($databaseConnection->socket) {
      $dsn .= sprintf("unix_socket=%s;", $databaseConnection->socket);
    }
    return $dsn;
  }

}
