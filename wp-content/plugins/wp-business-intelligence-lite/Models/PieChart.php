<?php
namespace Wpbi\Models;

use League\Plates\Engine;
use Wpbi\Settings;

// TODO: uncovered
class PieChart extends AbstractChart {

  protected $chartSlug = 'pie-chart';

  protected $mappedAttributes = array('quantity', 'name');

  protected $fillable = array(
    'quantity', 'name',
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
      ->render('chart/pie-chart',
        array('chartId' => $this->id,
          'options' => $this->options(),
          'chartData' => $this->resultsToJson()));
  }

  private function options() {
    $options = array();
    $options['show_legend'] = ($this->show_legend === true) ? 'true' : 'false';
    $options['cname'] = $this->cname;
    $options['caption'] = $this->caption;
    return $options;
  }

}
