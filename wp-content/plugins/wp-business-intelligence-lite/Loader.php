<?php

namespace Wpbi;

use Wpbi\Database\EloquentBoot;
use Wpbi\Database\PhinxMigrator;
use Wpbi\Settings\WpActions;
use Database\Update\UpdateLineCharts;
use Database\Update\UpdateGroupedBarCharts;
use Database\Update\UpdateBarCharts;
use Database\Update\UpdatePieCharts;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class Loader {

  public static function addPluginMenu() {
    add_action('admin_menu', array(\Wpbi\Admin\Menu\Main::class, 'addMenu'));
    add_action('admin_init', array(\Wpbi\Admin\Menu\Main::class, 'hideSubMenus'));
    add_filter('submenu_file', array(\Wpbi\Admin\Menu\Main::class, 'showSelectedSubmenu'), 10, 2);
  }

  public static function setupDatabase() {
    $phinxMigrator = new PhinxMigrator();
    $phinxMigrator->ensureDatabaseMigrated();

    $migrate = new Database\Update\UpdateLineCharts('3.1.5', null, null);
    $migrate->update();

    $migrate = new Database\Update\UpdateGroupedBarCharts('3.1.5', null, null);
    $migrate->update();

    $migrate = new Database\Update\UpdateBarCharts('3.1.5', null, null);
    $migrate->update();

    $migrate = new Database\Update\UpdatePieCharts('3.1.5', null, null);
    $migrate->update();

    $eloquentBooter = new EloquentBoot();
    $eloquentBooter->boot();
  }

  /**
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   * phpcs:disable Generic.Files.LineLength.TooLong
   */
  public static function setupAdminPostRoutes() { // TODO: not all of these are necessary for lite
    add_action('admin_post_' . WpActions::DELETE_DATABASE_CONNECTION, array(\Wpbi\Admin\Menu\DatabaseConnection::class, 'delete'));
    add_action('admin_post_' . WpActions::CREATE_DATABASE_CONNECTION, array(\Wpbi\Admin\Menu\DatabaseConnection::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_DATABASE_CONNECTION, array(\Wpbi\Admin\Menu\DatabaseConnection::class, 'edit'));

    add_action('admin_post_' . WpActions::DELETE_DATATABLE, array(\Wpbi\Admin\Menu\Datatable::class, 'delete'));
    add_action('admin_post_' . WpActions::CREATE_DATATABLE, array(\Wpbi\Admin\Menu\Datatable::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_DATATABLE, array(\Wpbi\Admin\Menu\Datatable::class, 'edit'));

    add_action('admin_post_' . WpActions::DELETE_QUERY, array(\Wpbi\Admin\Menu\Query::class, 'delete'));
    add_action('admin_post_' . WpActions::CREATE_QUERY, array(\Wpbi\Admin\Menu\Query::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_QUERY, array(\Wpbi\Admin\Menu\Query::class, 'edit'));

    add_action('admin_post_' . WpActions::DELETE_VARIABLE, array(\Wpbi\Admin\Menu\Variable::class, 'delete'));
    add_action('admin_post_' . WpActions::CREATE_VARIABLE, array(\Wpbi\Admin\Menu\Variable::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_VARIABLE, array(\Wpbi\Admin\Menu\Variable::class, 'edit'));

    add_action('admin_post_' . WpActions::SHOW_DELETE_CHART, array(\Wpbi\Admin\Menu\Chart::class, 'showDelete'));
    add_action('admin_post_' . WpActions::DELETE_CHART, array(\Wpbi\Admin\Menu\Chart::class, 'delete'));
    add_action('admin_post_' . WpActions::CREATE_CHART, array(\Wpbi\Admin\Menu\Chart::class, 'create'));
    add_action('admin_post_' . WpActions::REDIRECT_EDIT_CHART, array(\Wpbi\Admin\Menu\Chart::class, 'redirectEdit'));

    add_action('admin_post_' . WpActions::CREATE_BAR_CHART, array(\Wpbi\Admin\Menu\BarChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_BAR_CHART, array(\Wpbi\Admin\Menu\BarChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_PIE_CHART, array(\Wpbi\Admin\Menu\PieChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_PIE_CHART, array(\Wpbi\Admin\Menu\PieChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_GROUPED_BAR_CHART, array(\Wpbi\Admin\Menu\GroupedBarChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_GROUPED_BAR_CHART, array(\Wpbi\Admin\Menu\GroupedBarChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_LINE_CHART, array(\Wpbi\Admin\Menu\LineChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_LINE_CHART, array(\Wpbi\Admin\Menu\LineChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_SPARKLINE_CHART, array(\Wpbi\Admin\Menu\SparklineChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_SPARKLINE_CHART, array(\Wpbi\Admin\Menu\SparklineChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_STACKED_AREA_CHART, array(\Wpbi\Admin\Menu\StackedAreaChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_STACKED_AREA_CHART, array(\Wpbi\Admin\Menu\StackedAreaChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_STACKED_BAR_CHART, array(\Wpbi\Admin\Menu\StackedBarChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_STACKED_BAR_CHART, array(\Wpbi\Admin\Menu\StackedBarChart::class, 'edit'));

    add_action('admin_post_' . WpActions::CREATE_STEP_CHART, array(\Wpbi\Admin\Menu\StepChart::class, 'create'));
    add_action('admin_post_' . WpActions::EDIT_STEP_CHART, array(\Wpbi\Admin\Menu\StepChart::class, 'edit'));
  } // phpcs:enable

  public static function registerShortcode() {
    add_shortcode(Settings::tableShortCode(), array(\Wpbi\Datatable\ShortcodeHandler::class, 'html'));
    add_shortcode(Settings::chartShortCode(), array(\Wpbi\Chart\ShortcodeHandler::class, 'html'));
  }

  public static function enqueueAssets() {
    add_action('wp_enqueue_scripts', array(self::class, 'registerAssets'));
    add_action('admin_enqueue_scripts', array(self::class, 'registerAssets'));
  }

  /**
   * TODO: move asset registering elsewhere
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  public static function registerAssets() {

    wp_enqueue_script(Settings::docReadyScriptName(), plugins_url('Assets/wpbiDocReady.js', __FILE__), array(), '1.0.0');

    wp_register_script(Settings::briteChartsHelperScriptName(),
      plugins_url('Assets/wpbiBriteChartsHelpers.js', __FILE__), array('underscore'), '1.0.0');

    // TODO: load less for lite version since they don't download etc.
    // Datatables
    $datatableVersion = '1.10.16.1';
    /*
     * Datatable options
     * DataTables - DataTables' default styling.
     * DataTables - Enhance HTML tables with advanced interaction controls.
     * Buttons - A common framework for user interaction buttons.
     *  HTML5 export - Copy to clipboard and create Excel, PDF and CSV files from the table's data.
     *    JSZip - Required for the Excel HTML5 export button.
     *  Print view Button that will display a printable view of the table.
     *  Responsive Dynamically show and hide columns based on the browser size.
     */
    $datatableScriptUri = '//cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.16/b-1.5.1/b-html5-1.5.1/b-print-1.5.1/r-2.2.1/datatables.min.js'; // phpcs:ignore
    $datatableStyleUri = '//cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.16/b-1.5.1/b-html5-1.5.1/b-print-1.5.1/r-2.2.1/datatables.min.css'; // phpcs:ignore
    wp_register_script(Settings::datatableScriptName(), $datatableScriptUri, array('jquery'), $datatableVersion);
    wp_register_style(Settings::datatableStyleName(), $datatableStyleUri, array(), $datatableVersion);

    // d3
    $d3ScriptVersion = '6';
    $d3ScriptUri = "https://d3js.org/d3.v{$d3ScriptVersion}.min.js";
    wp_register_script(Settings::d3ScriptName(), $d3ScriptUri, array(), $d3ScriptVersion);

    // britecharts
    $briteChartsVersion = '2.10.0';
    $briteChartsScriptUri
      = "//cdn.jsdelivr.net/npm/britecharts@{$briteChartsVersion}/dist/bundled/britecharts.min.js";
    wp_register_script(Settings::briteChartsScriptName(), $briteChartsScriptUri,
      array(Settings::d3ScriptName(), Settings::briteChartsHelperScriptName()), $briteChartsVersion);

    $briteChartsStyleUri
      = "//cdn.jsdelivr.net/npm/britecharts@{$briteChartsVersion}/dist/css/britecharts.min.css";
    wp_register_style(Settings::briteChartsStyleName(), $briteChartsStyleUri, array(), $briteChartsVersion);
    wp_register_style(Settings::briteChartsGlobalStyleName(), plugins_url('Assets/global.css', __FILE__), array(), $briteChartsVersion);
  }

  public static function queueFlashNotices() {
    add_action('admin_notices', array(\Wpbi\Admin\Flash::class, 'renderFlash'));
  }

  public static function startSession() { // used for flash messages
    // TODO: use cookies as an alternative to sessions
    add_action('init', function () {
      if (! is_user_logged_in()
        && function_exists('session_start') // may be disabled if php is compiled with --disable-sessions
      ) {
        try {
          session_start();
        } catch (\Exception $e) {
          // we use sessions for error validation messages but we don't need it
        }
      }
    }, 1);
  }

  /**
   * @SuppressWarnings(PHPMD.UnusedLocalVariable)
   */
  public static function addValidatorRules() {
    \Valitron\Validator::addRule('unique', function ($field, $value, array $params, array $fields = array()) {
      return ($params[0]::where($field, $value)->first() === null);
    }, 'must be unique');
  }

}
