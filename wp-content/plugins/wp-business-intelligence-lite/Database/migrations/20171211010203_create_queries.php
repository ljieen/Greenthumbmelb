<?php

class CreateQueries extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    $fkTableName = $this->tablePrefix() . '_database_connections';
    $table = $this->table($this->tableName());
    $table
      ->addColumn('name', 'string', array('null' => false))
      ->addIndex('name', array('unique' => true))
      ->addColumn('sql', 'string', array('null' => false))
      ->addColumn('database_connection_id', 'integer', array('null' => true, 'default' => null))
      ->addForeignKey('database_connection_id', $fkTableName)
      ->create();
  }

  private function tableName() {
    return $this->tablePrefix() . '_queries3';
  }

}
