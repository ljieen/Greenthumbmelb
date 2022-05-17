<?php

class ExtendLengthOfQueries3Sql extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function up() {
    $table = $this->table($this->tableName());

    $table
      ->changeColumn('sql', 'text', ['null' => true])
      ->save();
  }

  public function down() {
    $table = $this->table($this->tableName());

    $table
      ->changeColumn('sql', 'string', array('null' => false))
      ->save();
  }

  private function tableName() {
    return $this->tablePrefix() . '_queries3';
  }

}
