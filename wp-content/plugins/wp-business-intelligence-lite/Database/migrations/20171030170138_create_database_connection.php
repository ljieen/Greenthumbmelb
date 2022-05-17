<?php

class CreateDatabaseConnection extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    $table = $this->table($this->tableName());
    $table
      ->addColumn('username', 'string', array('null' => false, 'limit' => 128))
      ->addColumn('password', 'string', array('null' => true, 'limit' => 128))
      ->addColumn('name', 'string', array('null' => false, 'limit' => 128))
      ->addIndex('name', array('unique' => true))
      ->addColumn('database_name', 'string', array('null' => false, 'limit' => 128))
      ->addColumn('host', 'string', array('null' => false, 'limit' => 128))
      ->addColumn('port', 'integer', array('null' => true))
      ->addColumn('socket', 'string', array('null' => true, 'limit' => 256))
      ->create();
  }

  private function tableName() {
    return $this->tablePrefix() . '_database_connections';
  }

}
