<?php
namespace Wpbi\Database;

class WpPdo {

  private $wpConfig;

  public function __construct(WpConfig $wpConfig) {
    $this->wpConfig = $wpConfig;
  }

  public function get() {
    $dbConnection = new \Wpbi\Models\DatabaseConnection();
    $dbConnection->username = $this->wpConfig->getUserName();
    $dbConnection->password = $this->wpConfig->getPassword();
    $dbConnection->database_name = $this->wpConfig->getName();
    $dbConnection->host = $this->wpConfig->getHost();
    $dbConnection->port = $this->wpConfig->getPort();
    $dbConnection->socket = $this->wpConfig->getSocket();

    return $dbConnection->pdo();
  }

}
