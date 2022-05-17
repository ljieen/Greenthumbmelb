<?php
namespace Wpbi\Admin\Menu;

use League\Plates\Engine;
use Wpbi\Admin\Table\Action;
use Wpbi\Admin\Table\Actions;
use Wpbi\Admin\Table\ChartTable;
use Wpbi\Admin\Url\Chart as ChartUrl;
use Wpbi\Settings;

// TODO: uncovered
// TODO: address class complexity
/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class Chart {

  public static function menuSlug() {
    return 'chart';
  }

  public static function addMenu() {
    $parentSlug = Main::menuSlug();
    $pageTitle = 'Charts';
    $menuTitle = 'Charts';
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
    $chart = new \Wpbi\Models\Chart();
    $charts = $chart->allChartsToArray();
    $chartTable = new ChartTable();
    $adminTable = new \Wpbi\Admin\Table\AdminTable($charts, $chartTable->getColumns());
    static::addActions($adminTable);
    $adminTable->prepare_items();
    echo (new Engine(Settings::platesDirectory()))
      ->render('admin/ChartIndex',
        array('table' => $adminTable->getHtml(),
          'showCreateUrl' => ChartUrl::showCreateUrl()));
  }

  public function showCreate() {
    echo (new Engine(Settings::platesDirectory()))
      ->render('admin/ChartCreate', array(
        'chartTypes' => \Wpbi\Models\Chart::$chartTypes,
        'action' => ChartUrl::createUrl()));
  }

  public static function showDelete() {
    $id = (int) $_REQUEST['id'];
    $chartSlug = $_REQUEST['chart_slug'];
    $url = ChartUrl::deleteUrl($id, $chartSlug);
    echo (new Engine(Settings::platesDirectory()))->render('admin/ChartDelete', array('action' => $url));
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  public static function create() {
    switch ($_POST['chart-type']) {
      case 'bar-chart':
        wp_redirect(\Wpbi\Admin\Url\BarChart::showCreateUrl());
        break;
      case 'pie-chart':
        wp_redirect(\Wpbi\Admin\Url\PieChart::showCreateUrl());
        break;
      case 'grouped-bar-chart':
        wp_redirect(\Wpbi\Admin\Url\GroupedBarChart::showCreateUrl());
        break;
      case 'line-chart':
        wp_redirect(\Wpbi\Admin\Url\LineChart::showCreateUrl());
        break;
      case 'sparkline-chart':
        wp_redirect(\Wpbi\Admin\Url\SparklineChart::showCreateUrl());
        break;
      case 'stacked-area-chart':
        wp_redirect(\Wpbi\Admin\Url\StackedAreaChart::showCreateUrl());
        break;
      case 'stacked-bar-chart':
        wp_redirect(\Wpbi\Admin\Url\StackedBarChart::showCreateUrl());
        break;
      case 'step-chart':
        wp_redirect(\Wpbi\Admin\Url\StepChart::showCreateUrl());
        break;
      case 'step-chart':
        wp_redirect(\Wpbi\Admin\Url\StepChart::showCreateUrl());
        break;
      case 'step-chart':
        wp_redirect(\Wpbi\Admin\Url\StepChart::showCreateUrl());
        break;
    }
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  public static function redirectEdit() {
    $id = (int) $_REQUEST['id'];
    switch ($_REQUEST['chart_slug']) {
      case 'bar-chart':
        wp_redirect(\Wpbi\Admin\Url\BarChart::showEditUrl($id));
        break;
      case 'pie-chart':
        wp_redirect(\Wpbi\Admin\Url\PieChart::showEditUrl($id));
        break;
      case 'grouped-bar-chart':
        wp_redirect(\Wpbi\Admin\Url\GroupedBarChart::showEditUrl($id));
        break;
      case 'line-chart':
        wp_redirect(\Wpbi\Admin\Url\LineChart::showEditUrl($id));
        break;
      case 'sparkline-chart':
        wp_redirect(\Wpbi\Admin\Url\SparklineChart::showEditUrl($id));
        break;
      case 'stacked-area-chart':
        wp_redirect(\Wpbi\Admin\Url\StackedAreaChart::showEditUrl($id));
        break;
      case 'stacked-bar-chart':
        wp_redirect(\Wpbi\Admin\Url\StackedBarChart::showEditUrl($id));
        break;
      case 'step-chart':
        wp_redirect(\Wpbi\Admin\Url\StepChart::showEditUrl($id));
        break;
    }
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  public static function delete() {
    $id = (int) $_REQUEST['id'];
    switch ($_REQUEST['chart-type']) {
      case 'bar-chart':
        \Wpbi\Models\BarChart::destroy($id);
        break;
      case 'pie-chart':
        \Wpbi\Models\PieChart::destroy($id);
        break;
      case 'grouped-bar-chart':
        \Wpbi\Models\GroupedBarChart::destroy($id);
        break;
      case 'line-chart':
        \Wpbi\Models\LineChart::destroy($id);
        break;
      case 'sparkline-chart':
        \Wpbi\Models\SparklineChart::destroy($id);
        break;
      case 'stacked-area-chart':
        \Wpbi\Models\StackedAreaChart::destroy($id);
        break;
      case 'stacked-bar-chart':
        \Wpbi\Models\StackedBarChart::destroy($id);
        break;
      case 'step-chart':
        \Wpbi\Models\StepChart::destroy($id);
        break;
    }
    wp_redirect(ChartUrl::showIndexUrl());
  }

  private static function addActions($adminTable) {
    $actions = new Actions();
    $actions->addAction(new Action(Settings\WpActions::REDIRECT_EDIT_CHART, admin_url('admin-post.php'),
      'edit', array('id', 'chart_slug')));
    $actions->addAction(new Action('showDelete', menu_page_url(self::menuSlug(), false),
      'delete', array('id', 'chart_slug')));
    $adminTable->actions = $actions;
  }

}
