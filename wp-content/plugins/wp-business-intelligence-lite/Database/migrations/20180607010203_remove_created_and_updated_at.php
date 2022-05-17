<?php

class RemoveCreatedAndUpdatedAt extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function change() {
    $tableNames = array(
      '_bar_charts',
      '_database_connections',
      '_datatables',
      '_grouped_bar_charts',
      '_line_charts',
      '_pie_charts',
      '_queries3',
      '_sparkline_charts',
      '_stacked_area_charts',
      '_stacked_bar_charts',
      '_step_charts',
      '_variables',
    );
    foreach ($tableNames as $tableName) {
      $this->removeTimestampColumns($tableName);
    }
  }

  private function removeTimestampColumns($tableName) {
    if (! $this->hasTable($tableName)) {
      return;
    }
    $table = $this->table(
      $this->tablePrefix() . $tableName
    );
    $columnNames = array_map(function ($column) {
      return $column->getName();
    }, $table->getColumns());

    if (in_array('updated_at', $columnNames)) {
      $table->removeColumn('updated_at');
    }
    if (in_array('created_at', $columnNames)) {
      $table->removeColumn('created_at');
    }
  }

}
