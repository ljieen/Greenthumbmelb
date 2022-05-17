<?php
namespace Wpbi\Admin\Table;

// TODO: should actions go in here rather than where they are
class ChartTable {

  private $columns = array(
    'id' => 'ID',
    'cname' => 'Name',
    'query_id' => 'Query ID',
    'chart_name' => 'Chart Type',
  );

  public function getColumns() {
    return $this->columns;
  }

}
