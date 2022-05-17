<?php
namespace Wpbi\Admin\Table;

class QueryTable {

  private $columns = array(
    'id' => 'ID',
    'name' => 'Name',
    'sql' => 'SQL',
  );

  public function getColumns() {
    return $this->columns;
  }

}
