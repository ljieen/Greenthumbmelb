<?php
namespace Wpbi\Models;

use League\Plates\Engine;
use Wpbi\Settings;

// TODO: uncovered
class GroupedBarChart extends AbstractChart {

  protected $chartSlug = 'grouped-bar-chart';

  protected $mappedAttributes = array('group', 'name', 'value');

  protected $fillable = array(
    'group', 'name', 'value',
    'query_id',
    'show_legend',
    'cname',
    'caption'
  );

  protected $casts = array(
    'show_legend' => 'boolean',
    'cname' => 'string',
    'caption' => 'string'
  );

  public function setShowLegendAttribute($value) {
    $this->attributes['show_legend'] = (boolean) $value;
  }

  public function setCnameAttribute($value) {
    $this->attributes['cname'] = (string) $value;
  }

  public function setCaptionAttribute($value) {
    $this->attributes['caption'] = (string) $value;
  }

  public function getHtml() {
    self::enqueueAssets();
    return (new Engine(Settings::platesDirectory()))
      ->render('chart/grouped-bar-chart',
        array('chartId' => $this->id,
          'options' => $this->options(),
          'legendData' => $this->legendData(),
          'chartData' => $this->resultsToJson()));
  }

  private function options() {
    $options = array();
    $options['show_legend'] = ($this->show_legend === true) ? 'true' : 'false';
    $options['cname'] = $this->cname;
    $options['caption'] = $this->caption;
    return $options;
  }

  private function legendData() {
    $chartData = $this->queryStatement->results();
    $categories = array_map(function ($bar) {
      if (array_key_exists($this->group, $bar) === true) {
        return $bar[$this->group];
      } else {
        return '';
      }
    }, $chartData);

    $categories = array_unique($categories);
    $categories = array_values($categories); // reset keys

    $legendData = array();
    foreach ($categories as $index => $category) {
      $legendData[] = array('id' => $index, 'name' => $category);
    }
    return json_encode($legendData);
  }

}
