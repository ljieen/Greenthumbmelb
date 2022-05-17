<?php

class CreateDatatables extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    $table = $this->table($this->tableName());
    $table
      ->addColumn('query_id', 'integer', array('null' => false))
      ->addColumn('page_size', 'integer', array('null' => true))
      ->create();
  }

  private function tableName() {
    return $this->tablePrefix() . '_datatables';
  }

}
