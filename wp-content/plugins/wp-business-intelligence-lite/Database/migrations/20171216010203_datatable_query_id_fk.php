<?php

class DatatableQueryIdFk extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    $table = $this->table($this->tableName());
    $fkTableName = $this->tablePrefix() . '_queries3';

    $table
      ->addForeignKey('query_id', $fkTableName)
      ->update();
  }

  private function tableName() {
    return $this->tablePrefix() . '_datatables';
  }

}
