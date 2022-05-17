<?php

class CreatePieCharts extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    $table = $this->table($this->tableName());
    $fkTableName = $this->tablePrefix() . '_queries3';

    if($this->hasTable($this->tableName())) {
      return;
    }

    $table
      ->addColumn('query_id', 'integer', array('null' => false))
      ->addForeignKey('query_id', $fkTableName)
      ->addColumn('mappings', 'text', array('null' => true, 'limit' => \Phinx\Db\Adapter\MysqlAdapter::TEXT_LONG))
      ->addColumn('show_legend', 'boolean', array('null' => false, 'default' => false))
      ->create();
  }

  private function tableName() {
    return $this->tablePrefix() . '_pie_charts';
  }

}
