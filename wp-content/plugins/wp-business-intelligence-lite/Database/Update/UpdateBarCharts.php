<?php
namespace Wpbi\Database\Update;

class UpdateBarCharts extends \Wpbi\Database\BaseMigration { // @codingStandardsIgnoreLine

  public function update() {

    $table = $this->tableName();

    global $wpdb;

    $column = $wpdb->get_results( $wpdb->prepare(
    		"SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = %s AND COLUMN_NAME = 'cname'",
    		$table
    ) );
    if ( empty( $column ) ) {
      $prepared_statement = "ALTER TABLE {$table} ADD COLUMN cname text";
      $values = $wpdb->query( $prepared_statement );
    }

    $column = $wpdb->get_results( $wpdb->prepare(
        "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = %s AND COLUMN_NAME = 'caption'",
        $table
    ) );
    if ( empty( $column ) ) {
      $prepared_statement = "ALTER TABLE {$table} ADD COLUMN caption text";
      $values = $wpdb->query( $prepared_statement );
    }
  }

  private function tableName() {
    return $this->tablePrefix() . '_bar_charts';
  }

}
