<?php
namespace Wpbi\Admin\Menu;

use Wpbi\Settings;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class Main {

  public static function menuSlug() {
    return 'wpbi-main';
  }

  /**
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  public static function addMenu() {
    $pageTitle = Settings::PLUGIN_NAME;
    $menuTitle = Settings::PLUGIN_NAME;
    $capability = Settings::capability();
    $menuSlug = self::menuSlug();
    $function = function () {}; // phpcs:ignore
    $iconUrl = ''; // TODO: add icon url
    $position = '99.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    add_menu_page($pageTitle, $menuTitle, $capability, $menuSlug, $function, $iconUrl, $position);
    Query::addMenu();
    Chart::addMenu();
    Datatable::addMenu();
    DatabaseConnection::addMenu();
    Variable::addMenu();
    foreach (\Wpbi\Models\Chart::chartMenus() as $chartMenu) {
      call_user_func(array($chartMenu, 'addMenu'));
    }
    remove_submenu_page($menuSlug, $menuSlug);
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  public static function hideSubMenus() {
    $submenu = &$GLOBALS['submenu'];
    if (is_null($submenu) || ! array_key_exists(self::menuSlug(), $submenu)) {
      return;
    }
    foreach ($submenu[self::menuSlug()] as $i => $menuItem) {
      if (in_array($menuItem[2], \Wpbi\Models\Chart::chartSlugs())) { // [2] is the submenu's slug
        /**
         * hack - this functionality is not accessible through add_submenu_page or add_menu_page.
         * The only place I could found it used was in menu.php (search for 'hide-if-no-customize').
         * http://svn.automattic.com/wordpress/tags/4.4/wp-admin/menu.php
         */
        $submenu[self::menuSlug()][$i][4] = 'hidden'; // [4] is for class
      }
    }
  }

  public static function showSelectedSubmenu($submenuFile, $parentFile) {
    if ($parentFile !== static::menuSlug()) {
      return $submenuFile;
    }
    $pluginPage = $GLOBALS['plugin_page'];

    // Select another submenu item to highlight
    if (is_null($pluginPage) !== true && in_array($pluginPage, \Wpbi\Models\Chart::chartSlugs())) {
      $submenuFile = Chart::menuSlug();
    }

    return $submenuFile;
  }

}
