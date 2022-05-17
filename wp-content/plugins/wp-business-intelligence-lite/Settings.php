<?php
namespace Wpbi;

class Settings {

  const PLUGIN_ABBREVIATION = 'wpbi';
  const WP_GLOBAL_INDEX = self::PLUGIN_ABBREVIATION . '\wp_global_access';
  const PLUGIN_SLUG = 'wp-business-intelligence-lite';
  const PLUGIN_NAME = 'WP Business Intelligence';
  const SUPPORT_EMAIL = 'wpbi.support@wpbusinessintelligence.com';
  const PLUGIN_FILE_PATH = 'wp-business-intelligence-lite/index.php';
  const PHINX_ADAPTER = 'wpbiMySQL';

  public static function platesDirectory() {
    return __DIR__ . DIRECTORY_SEPARATOR . 'templates';
  }

  public static function tableShortCode() {
    return self::PLUGIN_ABBREVIATION . '_table';
  }

  public static function chartShortCode() {
    return self::PLUGIN_ABBREVIATION . '_chart';
  }

  public static function datatableScriptName() {
    return self::PLUGIN_ABBREVIATION . '_datatable';
  }

  public static function datatableStyleName() {
    return self::datatableScriptName() . '_style';
  }

  public static function d3ScriptName() {
    return self::PLUGIN_ABBREVIATION . '_d3_script';
  }

  public static function briteChartsScriptName() {
    return self::PLUGIN_ABBREVIATION . '_britecharts_script';
  }

  public static function briteChartsStyleName() {
    return self::PLUGIN_ABBREVIATION . '_britecharts_style';
  }

  public static function briteChartsGlobalStyleName() {
    return self::PLUGIN_ABBREVIATION . '_britecharts_global_style';
  }

  public static function briteChartsHelperScriptName() {
    return self::PLUGIN_ABBREVIATION . '_britecharts_helper_script';
  }

  public static function docReadyScriptName() {
    return self::PLUGIN_ABBREVIATION . '_doc_ready_script';
  }

  public static function capability() {
    return 'manage_options';
  }

}
