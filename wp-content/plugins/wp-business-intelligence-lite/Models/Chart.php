<?php
namespace Wpbi\Models;

// TODO: uncovered
class Chart {

  public static $chartTypes = array(
    'bar-chart' => array(
      'slug' => 'bar-chart',
      'name' => 'Bar',
      'model' => BarChart::class,
      'menu' => \Wpbi\Admin\Menu\BarChart::class,
    ),
    'pie-chart' => array(
      'slug' => 'pie-chart',
      'name' => 'Donut',
      'model' => PieChart::class,
      'menu' => \Wpbi\Admin\Menu\PieChart::class,
    ),
    'grouped-bar-chart' => array(
      'slug' => 'grouped-bar-chart',
      'name' => 'Grouped Bar',
      'model' => GroupedBarChart::class,
      'menu' => \Wpbi\Admin\Menu\GroupedBarChart::class,
    ),
    'line-chart' => array(
      'slug' => 'line-chart',
      'name' => 'Line',
      'model' => LineChart::class,
      'menu' => \Wpbi\Admin\Menu\LineChart::class,
    ),
  );

  public static function chartModels() {
    return array_map(function ($chartModel) {
      return $chartModel['model'];
    }, self::$chartTypes);
  }

  public static function chartMenus() {
    return array_map(function ($chartModel) {
      return $chartModel['menu'];
    }, self::$chartTypes);
  }

  public static function chartNames() {
    return array_map(function ($chartModel) {
      return $chartModel['name'];
    }, self::$chartTypes);
  }

  public static function chartSlugs() {
    return array_keys(self::$chartTypes);
  }

  public function allChartsToArray() {
    $charts = array();
    foreach ($this->allCharts() as $chartGroup) {
      foreach ($chartGroup as $chart) {
        $charts[] = $chart->toArray();
      }
    }
    return $charts;
  }

  public function allCharts() {
    return array_map(function ($chartModel) {
      return call_user_func(array($chartModel, 'all'));
    }, $this->chartModels());
  }

}
