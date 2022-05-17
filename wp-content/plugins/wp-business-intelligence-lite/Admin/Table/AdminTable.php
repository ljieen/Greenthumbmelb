<?php
namespace Wpbi\Admin\Table;

use Wpbi\Settings;

/**
 * @SuppressWarnings(PHPMD.CamelCaseMethodName)
 */
class AdminTable extends \Wpbi\Admin\Table\WpListTable {

  const ROWS_PER_PAGE = 20;
  public $actions = null;
  private $columns, $rows;

  public function __construct(array $rows, array $columns) {
    $this->rows = $rows;
    $this->columns = $columns;
    parent::__construct(array(
      'singular' => Settings::PLUGIN_ABBREVIATION . '_table_list_item',
      'plural' => Settings::PLUGIN_ABBREVIATION . '_table_list_items',
      'ajax' => false // uncovered
    ));
  }

  public function get_columns() { // @codingStandardsIgnoreLine
    return $this->columns;
  }

  // TODO: have primary action
  // TODO: bulk actions
  protected function column_default($item, $columnName) { // @codingStandardsIgnoreLine
    $cell = $item[$columnName];
    if ($cell === null) {
      return '(null)';
    }
    reset($item);
    $isFirstCell = key($item) === $columnName;
    $cellContents = esc_html($item[$columnName]);
    if ($isFirstCell === true && $this->actions !== null) {
      return $cellContents . $this->row_actions($this->actions->getActionHash($item), true);
    }
    return $cellContents;
  }

  public function getHtml()
  {
    ob_start();
    $this->display();
    $html = ob_get_clean();
    return $html;
  }

  public function prepare_items() { // @codingStandardsIgnoreLine
    $columns = $this->columns;
    $hidden = array();
    $sortable = $this->get_sortable_columns();
    $this->_column_headers = array($columns, $hidden, $sortable);
    $this->setPagination();
  }

  private function setPagination() { // @codingStandardsIgnoreLine
    $currentPageNumber = $this->get_pagenum();
    $totalItems = count($this->rows);
    $this->items = array_slice($this->rows, (($currentPageNumber - 1) * self::ROWS_PER_PAGE), self::ROWS_PER_PAGE);

    $this->set_pagination_args(array(
      'total_items' => $totalItems,
      'per_page' => self::ROWS_PER_PAGE,
    ));
  }

}
