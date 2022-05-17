<?php
namespace Wpbi\Admin\Menu;

use League\Plates\Engine;
use Wpbi\Settings;

// TODO: uncovered
class Variable {

  public static function menuSlug() {
    return 'variable';
  }

  public static function addMenu() {
    $parentSlug = Main::menuSlug();
    $pageTitle = 'Variables';
    $menuTitle = 'Variables';
    $capability = Settings::capability();
    $menuSlug = self::menuSlug();
    $function = array(self::class, 'route');
    add_submenu_page($parentSlug, $pageTitle, $menuTitle, $capability, $menuSlug, $function);
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  public static function route() {
    (new self)->index();
  }

  public static function index() {
    echo (new Engine(Settings::platesDirectory()))->render('admin/VariableIndex');
  }

}
