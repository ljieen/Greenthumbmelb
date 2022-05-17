<?php
namespace Wpbi\Admin\Menu;

use League\Plates\Engine;
use Wpbi\Settings;

// TODO: uncovered
class DatabaseConnection {

  public static function menuSlug() {
    return 'database-connection';
  }

  public static function addMenu() {
    $parentSlug = Main::menuSlug();
    $pageTitle = 'Database Connections';
    $menuTitle = 'Database Connections';
    $capability = Settings::capability();
    $menuSlug = self::menuSlug();
    $function = array(self::class, 'route');
    add_submenu_page($parentSlug, $pageTitle, $menuTitle, $capability, $menuSlug, $function);
  }

  public static function route() {
    (new self)->showIndex();
  }

  public static function showIndex() {
    echo (new Engine(Settings::platesDirectory()))->render('admin/DatabaseConnectionIndex');
  }

}
