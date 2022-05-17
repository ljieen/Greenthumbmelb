<?php
namespace Wpbi\Database;

use Wpbi\Settings;

class WpConfig {

  private $wpGlobals, $host, $port, $socket;

  public function __construct() {
    $this->wpGlobals = $GLOBALS[Settings::WP_GLOBAL_INDEX];
  }

  public function getUserName() {
    return $this->wpGlobals->getDbUser();
  }

  public function getName() {
    return $this->wpGlobals->getDbName();
  }

  public function getPassword() {
    return $this->wpGlobals->getDbPassword();
  }

  public function getHostWithPort() {
    $host = $this->getHost();
    $port = $this->getPort();
    if (is_null($port)) {
      return $host;
    } else {
      return $host . ':' . $port;
    }
  }

  public function getHost() {
    $this->wpConnectionStringParser($this->wpGlobals->getDbHost());
    if (empty($this->host)) {
      return null;
    }
    return $this->host;
  }

  public function getPort() {
    $this->wpConnectionStringParser($this->wpGlobals->getDbHost());
    return $this->port;
  }

  public function getSocket() {
    $this->wpConnectionStringParser($this->wpGlobals->getDbHost());
    return $this->socket;
  }

  public function getCharset() {
    return $this->wpGlobals->getWpdb()->charset;
  }

  public function getEngine() {
    $wpdb = $this->wpGlobals->getWpdb();
    $usersTable = $wpdb->prefix . 'users';
    $tableStatus = $wpdb->get_row(
      $wpdb->prepare("SHOW TABLE STATUS FROM {$this->getName()} WHERE name = %s", $usersTable)
    );
    return $tableStatus->Engine;
  }

  public function getCollation() {
    return $this->wpGlobals->getWpdb()->collate;
  }

  public function getTablePrefix() {
    return $this->wpGlobals->getWpdb()->prefix;
  }

  /**
   * oof, this horror is from wp core reproduced here without
   * modification for consistency
   * @codingStandardsIgnoreStart
   * @SuppressWarnings(PHPMD)
   */
  private function wpConnectionStringParser($connectionString) {
    $this->host = $connectionString;
    $port_or_socket = strstr($this->host, ':');
    if (!empty($port_or_socket)) {
      $this->host = substr($this->host, 0, strpos($this->host, ':'));
      $port_or_socket = substr($port_or_socket, 1);
      if (0 !== strpos($port_or_socket, '/')) {
        $this->port = intval($port_or_socket);
        $maybe_socket = strstr($port_or_socket, ':');
        if (!empty($maybe_socket)) {
          $this->socket = substr($maybe_socket, 1);
        }
      } else {
        $this->socket = $port_or_socket;
      }
    }
  }
  // @codingStandardsIgnoreEnd

}
