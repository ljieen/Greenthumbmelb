<?php
namespace Wpbi\Models;

use League\Plates\Engine;
use Wpbi\Settings;

// TODO: uncovered
class LineChart extends AbstractChart {

  protected $chartSlug = 'line-chart';

  protected $mappedAttributes = array('date', 'topic', 'value');

  protected $fillable = array(
    'date', 'topic', 'value',
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

  public function resultsToJson() {
    $mappings = $this->mappings;
    $hasNecessaryKeys = array_key_exists('value', $mappings) === false ||
      array_key_exists('topic', $mappings) === false ||
      array_key_exists('date', $mappings) === false;
    if ($hasNecessaryKeys === true) {
      return json_encode(array());
    }
    $mappedData = $this->mapData();
    return json_encode($mappedData);
  }

  public function getHtml() {
    self::enqueueAssets();
    return (new Engine(Settings::platesDirectory()))
      ->render('chart/line-chart',
        array('chartId' => $this->id,
          'options' => $this->options(),
          'chartData' => $this->resultsToJson(),
          'legendData' => $this->legendData()));
  }

  private function options() {
    $options = array();
    $options['show_legend'] = ($this->show_legend === true) ? 'true' : 'false';
    $options['cname'] = $this->cname;
    $options['caption'] = $this->caption;
    return $options;
  }

  private function topics($chartData) {
    $topics = array();
    foreach ($chartData as $row) {
      if (array_key_exists($this->topic, $row)) {
        $topics[$row[$this->topic]] = true;
      }
    }
    $topics = array_keys($topics);
    return $topics;
  }

  private function mapData() {
    $chartData = $this->queryStatement->results();
    $mappedData = array();
    $topics = $this->topics($chartData);

    foreach ($chartData as $row) {
      if (! $this->rowHasMappedData($row)) {
        continue;
      }
      $topicName = $row[$this->topic];
      $point = array('date' => $row[$this->date], 'value' => $row[$this->value]);
      $topicKey = array_search($topicName, $topics);
      if (array_key_exists($topicKey, $mappedData) === false) {
        $mappedData[$topicKey] = array('topicName' => $topicName, 'topic' => $topicKey, 'dates' => array());
      }
      $mappedData[$topicKey]['dates'][] = $point;
    }
    return $mappedData;
  }

  private function legendData() {
    $chartData = $this->queryStatement->results();
    $topics = $this->topics($chartData);
    array_walk($topics, function (&$topic, $key) {
      $topic = array('id' => $key, 'name' => $topic);
    });
    return json_encode($topics);
  }

  private function rowHasMappedData($row) {
    return (array_key_exists($this->topic, $row)
      && array_key_exists($this->value, $row)
      && array_key_exists($this->date, $row));
  }

}
