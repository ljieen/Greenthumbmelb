<?php

namespace Wpbi\Database;

class BaseMigration extends \Phinx\Migration\AbstractMigration {

  protected function tablePrefix() {
    $wpConfig = new \Wpbi\Database\WpConfig();
    $tableName = $wpConfig->getTablePrefix()
      . \Wpbi\Settings::PLUGIN_ABBREVIATION;
    return $tableName;
  }

}
