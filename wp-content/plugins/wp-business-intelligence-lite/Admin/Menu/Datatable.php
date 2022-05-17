<?php
namespace Wpbi\Admin\Menu;

use League\Plates\Engine;
use Wpbi\Admin\Table\Action;
use Wpbi\Admin\Table\Actions;
use Wpbi\Admin\Table\DatatableTable;
use Wpbi\Admin\Url\Datatable as DatatableUrl;
use Wpbi\Models\Datatable as DatatableModel;
use Wpbi\Settings;

// TODO: uncovered
// TODO: address class complexity
/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 */
class Datatable {

  public static function menuSlug() {
    return 'datatable';
  }

  public static function addMenu() {
    $parentSlug = Main::menuSlug();
    $pageTitle = 'Data Tables';
    $menuTitle = 'Data Tables';
    $capability = Settings::capability();
    $menuSlug = self::menuSlug();
    $function = array(self::class, 'route');
    add_submenu_page($parentSlug, $pageTitle, $menuTitle, $capability, $menuSlug, $function);
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  public static function route() {
    $action = (isset($_GET['action']) === true) ? $_GET['action'] : 'showIndex';
    switch ($action) {
      case 'showDelete':
        (new self)->showDelete();
        break;
      case 'showEdit':
        (new self)->showEdit();
        break;
      case 'showCreate':
        (new self)->showCreate();
        break;
      case 'showIndex':
      default:
        (new self)->showIndex();
        break;
    }
  }

  public static function showIndex() {
    $datatableTable = new DatatableTable();
    $rows = DatatableModel::all(array_keys($datatableTable->getColumns()))->toArray();
    $adminTable = new \Wpbi\Admin\Table\AdminTable($rows, $datatableTable->getColumns());
    self::addActions($adminTable);
    $adminTable->prepare_items();
    echo (new Engine(Settings::platesDirectory()))
      ->render('admin/DatatableIndex',
        array('table' => $adminTable->getHtml(), 'showCreateUrl' => DatatableUrl::showCreateUrl()));
  }

  public function showCreate() {
    $queries = \Wpbi\Models\Query::all();
    echo (new Engine(Settings::platesDirectory()))
      ->render('admin/DatatableCreate',
        array('action' => DatatableUrl::createUrl(),
          'queries' => $queries));
  }

  public function showEdit() {
    $id = (int) $_REQUEST['id'];
    $datatable = DatatableModel::find($id);
    $datatableHtml = '';
    $exception = false;
    try {
      $datatableHtml = $datatable->getHtml();
    } catch (\PDOException $e) {
      $exception = $e;
    }
    echo $this->editTemplateHtml($datatable, $datatableHtml, $exception);
  }

  /**
   * @SuppressWarnings(PHPMD.ExcessiveParameterList)
   */
  private function editTemplateHtml($datatable, $datatableHtml, $exception) {
    $queries = \Wpbi\Models\Query::all();
    return (new Engine(Settings::platesDirectory()))
      ->render('admin/DatatableEdit',
        array('datatable' => $datatable,
          'action' => DatatableUrl::editUrl(),
          'datatableHtml' => $datatableHtml,
          'exception' => $exception,
          'queries' => $queries,
        ));
  }

  public function showDelete() {
    $id = (int) $_REQUEST['id'];
    $url = DatatableUrl::deleteUrl($id);
    echo (new Engine(Settings::platesDirectory()))->render('admin/DatatableDelete', array('action' => $url));
  }

  public static function create() {
    static::setRequestCheckboxes();
    if (DatatableModel::validateCreate($_REQUEST)) {
      $datatable = DatatableModel::create($_REQUEST);
      wp_redirect(DatatableUrl::showEditUrl($datatable->id));
    } else {
      wp_redirect(DatatableUrl::showCreateUrl());
    }
  }

  public static function edit() {
    static::setRequestCheckboxes();
    $id = (int) $_REQUEST['id'];
    $datatable = DatatableModel::find($id)->fill($_REQUEST);
    if (DatatableModel::validateUpdate($datatable)) {
      $datatable->save();
    }
    wp_redirect(DatatableUrl::showEditUrl($id));
  }

  public static function delete() {
    $id = (int) $_REQUEST['id'];
    DatatableModel::destroy($id);
    wp_redirect(DatatableUrl::showIndexUrl());
  }

  private static function addActions($adminTable) {
    $actions = new Actions();
    $actions->addAction(new Action('showEdit', menu_page_url(self::menuSlug(), false), 'edit'));
    $actions->addAction(new Action('showDelete', menu_page_url(self::menuSlug(), false), 'delete'));
    $adminTable->actions = $actions;
  }

  private static function setRequestCheckboxes() {
    $checkboxFields = array('can_download', 'can_search');
    foreach ($checkboxFields as $checkboxField) {
      if (array_key_exists($checkboxField, $_REQUEST) !== true) {
        $_REQUEST[$checkboxField] = false;
      }
    }
  }

}
