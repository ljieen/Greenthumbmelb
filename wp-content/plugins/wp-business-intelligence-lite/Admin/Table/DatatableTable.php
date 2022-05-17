<?php
namespace Wpbi\Admin\Table;

// TODO: should actions go in here rather than where they are
class DatatableTable {

  private $columns = array(
    'id' => 'ID',
    'query_id' => 'Query ID',
    'page_size' => 'Page Size',
  );

  public function getColumns() {
    return $this->columns;
  }

}
