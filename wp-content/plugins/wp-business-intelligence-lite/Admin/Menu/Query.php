<?php
namespace Wpbi\Admin\Menu;

use League\Plates\Engine;
use Wpbi\Admin\Table\Action;
use Wpbi\Admin\Table\Actions;
use Wpbi\Admin\Table\QueryTable;
use Wpbi\Admin\Url\Query as QueryUrl;
use Wpbi\Models\Query as QueryModel;
use Wpbi\Settings;

// TODO: uncovered
// TODO: perhaps the menu/routing/controller things should be broken up

/**
 * TODO: complexity
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 */
class Query {

  public static function menuSlug() {
    return 'query';
  }

  public static function addMenu() {
    $parentSlug = Main::menuSlug();
    $pageTitle = 'Queries';
    $menuTitle = 'Queries';
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
    $queryTable = new QueryTable();
    $rows = QueryModel::all(array_keys($queryTable->getColumns()))->toArray();
    $adminTable = new \Wpbi\Admin\Table\AdminTable($rows, $queryTable->getColumns());
    self::addActions($adminTable);
    $adminTable->prepare_items();
    echo (new Engine(Settings::platesDirectory()))
      ->render('admin/QueryIndex',
        array('table' => $adminTable->getHtml(), 'showCreateUrl' => QueryUrl::showCreateUrl()));
  }

  public function showCreate() {
    echo (new Engine(Settings::platesDirectory()))
      ->render('admin/QueryCreate', array('action' => QueryUrl::createUrl()));
  }

  public function showEdit() {
    $id = (int) $_REQUEST['id'];
    $query = QueryModel::find($id);
    $queryResults = array();
    $exception = false;
    try {
      $queryResults = $query->results();
    } catch (\PDOException $e) {
      $exception = $e;
    }
    echo $this->editTemplateHtml($query, $queryResults, $exception);
  }

  /**
   * @SuppressWarnings(PHPMD.ExcessiveParameterList)
   */
  private function editTemplateHtml($query, $queryResults, $exception) {
    return (new Engine(Settings::platesDirectory()))
      ->render('admin/QueryEdit',
        array(
          'query' => $query,
          'id' => $query->id, // todo
          'action' => QueryUrl::editUrl(),
          'queryResults' => $queryResults,
          'exception' => $exception));
  }

  public function showDelete() {
    $id = (int) $_REQUEST['id'];
    $url = QueryUrl::deleteUrl($id);
    echo (new Engine(Settings::platesDirectory()))->render('admin/QueryDelete', array('action' => $url));
  }

  public static function create() {
    // stripslashes() otherwise something like:
    //   select * from seed where status = 'Vivid'; will get escaped and be invalid sql
    $_REQUEST['sql'] = stripslashes($_REQUEST['sql']);
    if (QueryModel::validateCreate($_REQUEST)) {
      $query = QueryModel::create($_REQUEST);
      wp_redirect(QueryUrl::showEditUrl($query->id));
    } else {
      wp_redirect(QueryUrl::showCreateUrl());
    }
  }

  public static function edit() {
    // stripslashes() otherwise something like:
    //   select * from seed where status = 'Vivid'; will get escaped and be invalid sql
    $_REQUEST['sql'] = stripslashes($_REQUEST['sql']);
    $id = (int) $_REQUEST['id'];
    $query = QueryModel::find($id)->fill($_REQUEST);
    if (QueryModel::validateUpdate($query)) {
      $query->save();
    }
    wp_redirect(QueryUrl::showEditUrl($id));
  }

  public static function delete() {
    $id = (int) $_REQUEST['id'];
    QueryModel::destroy($id);
    wp_redirect(QueryUrl::showIndexUrl());
  }

  private static function addActions($adminTable) {
    $actions = new Actions();
    $actions->addAction(new Action('showEdit', menu_page_url(self::menuSlug(), false), 'edit'));
    $actions->addAction(new Action('showDelete', menu_page_url(self::menuSlug(), false), 'delete'));
    $adminTable->actions = $actions;
  }

}
