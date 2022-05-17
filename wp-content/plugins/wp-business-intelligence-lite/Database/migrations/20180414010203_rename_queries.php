<?php

class RenameQueries extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    if ($this->hasTable($this->oldTableName())) { // the old table won't exist if this plugin was installed after 3.0.1
      $table = $this->table($this->oldTableName());
      if ($this->isLegacyTable($table) === false) {
        $table->rename($this->newTableName());
      }
    }
  }

  private function oldTableName() {
    return $this->tablePrefix() . '_queries';
  }

  private function newTableName() {
    return $this->tablePrefix() . '_queries3';
  }

  private function isLegacyTable($table) { // legacy being < 3.0.0
    $wpbiV2Column = 'QUERY_ID';
    foreach ($table->getColumns() as $column) {
      if ($column->getName() === $wpbiV2Column) {
        return true;
      }
    }
    return false;
  }

}
