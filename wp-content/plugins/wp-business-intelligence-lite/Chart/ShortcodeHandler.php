<?php
namespace Wpbi\Chart;

class ShortcodeHandler {

  public static function html($attributes) {
    $defaultShortcodeAttrs = array('id' => null, 'type' => null);
    $attributes = shortcode_atts($defaultShortcodeAttrs, $attributes);

    $chartId = $attributes['id'];
    $chartType = strtolower($attributes['type']);
    $chart = self::findChart($chartType, $chartId);

    if (is_null($chart)) {
      return '';
    } else {
      try {
        return $chart->getHtml();
      } catch (\PDOException $e) { // suppress error on fronted
      }
    }
  }

  /**
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  private static function findChart($chartType, $chartId) {
    switch ($chartType) {
      case 'bar':
        return \Wpbi\Models\BarChart::find($chartId);
      case 'pie':
        return \Wpbi\Models\PieChart::find($chartId);
      case 'grouped bar':
        return \Wpbi\Models\GroupedBarChart::find($chartId);
      case 'line':
        return \Wpbi\Models\LineChart::find($chartId);
      case 'sparkline':
        return \Wpbi\Models\SparklineChart::find($chartId);
      case 'stacked area':
        return \Wpbi\Models\StackedAreaChart::find($chartId);
      case 'stacked bar':
        return \Wpbi\Models\StackedBarChart::find($chartId);
      case 'step':
        return \Wpbi\Models\StepChart::find($chartId);
    }
    return null;
  }

}
