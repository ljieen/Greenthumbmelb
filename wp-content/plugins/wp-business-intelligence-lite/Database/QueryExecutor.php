<?php

namespace Wpbi\Database;

use \PDO;

class QueryExecutor {

  private $pdo, $sql;

  public function __construct(PDO $pdo, $sql) {
    $this->pdo = $pdo;
    $this->sql = $sql;
  }

  public function results() {
    $statement = $this->pdo->prepare($this->sql);
    $this->bindWpParams($statement);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  private function bindWpParams(&$statement) {
    if (strpos($this->sql, ':user_id') !== false) {
      $currentUser = wp_get_current_user();
      $statement->bindValue(':user_id', $currentUser->ID, PDO::PARAM_INT);
    }
    if (strpos($this->sql, ':user_login') !== false) {
      $currentUser = wp_get_current_user();
      $statement->bindValue(':user_login', $currentUser->user_login, PDO::PARAM_STR);
    }
    if (strpos($this->sql, ':user_email') !== false) {
      $currentUser = wp_get_current_user();
      $statement->bindValue(':user_email', $currentUser->user_email, PDO::PARAM_STR);
    }
    if (strpos($this->sql, ':post_id') !== false) {
      $statement->bindValue(':post_id', get_the_ID(), PDO::PARAM_INT);
    }
    if (strpos($this->sql, ':blog_id') !== false) {
      $statement->bindValue(':blog_id', get_current_blog_id(), PDO::PARAM_INT);
    }
  }

}
