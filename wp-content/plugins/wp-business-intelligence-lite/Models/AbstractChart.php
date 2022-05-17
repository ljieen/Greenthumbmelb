<?php

namespace Wpbi\Models;

use Wpbi\Settings;

abstract class AbstractChart extends AbstractModel {

  protected $appends = array('chart_slug', 'chart_name');

  public function __get($name) {
    if (in_array($name, $this->mappedAttributes, true)) {
      return $this->getMappedColumn($name);
    }
    return parent::__get($name);
  }

  public function setAttribute($key, $value) {
    if (in_array($key, $this->mappedAttributes, true)) {
      $this->assignMapping($key, $value);
      return;
    }
    parent::setAttribute($key, $value);
  }

  public function queryStatement() { // query is a method of all eloquent models
    return $this->belongsTo(\Wpbi\Models\Query::class, 'query_id');
  }

  public function resultsToJson() { // this really needs coverage
    $chartData = $this->queryStatement->results();

    $mappings = $this->mappings;
    $index = 0;
    $chartData = array_map(function ($row) use ($mappings, &$index) {
      $chartRow = array('id' => $index++);
      foreach ($mappings as $mapping) {
        if (array_key_exists($mapping['sql'], $row) === true) {
          $chartRow[$mapping['json']] = $row[$mapping['sql']];
        }
      }
      return $chartRow;
    }, $chartData);
    return json_encode($chartData);
  }

  public function setMappingsAttribute($value) {
    $this->attributes['mappings'] = serialize($value);
  }

  public function setCnameAttribute($value) {
    $this->attributes['cname'] = $value;
  }

  public function getMappingsAttribute($value) {
    if (is_null($value) === true) {
      return array();
    }
    $value = unserialize($value);
    if (is_null($value) === true) {
      return array();
    }
    return $value;
  }

  public function getCnameAttribute($value) {
    if (is_null($value) === true) {
      return '';
    }

    return $value;
  }

  public function getChartSlugAttribute() {
    return $this->chartSlug;
  }

  public function getChartNameAttribute() {
    $chartTypes = Chart::$chartTypes;
    return $chartTypes[$this->getChartSlugAttribute()]['name'];
  }

  protected static function enqueueAssets() {
    wp_enqueue_script(Settings::briteChartsScriptName());
    wp_enqueue_style(Settings::briteChartsStyleName());
    wp_enqueue_style(Settings::briteChartsGlobalStyleName());
  }

  protected function getMappedColumn($jsonKey) {
    if (array_key_exists($jsonKey, $this->mappings) === true
      && array_key_exists('sql', $this->mappings[$jsonKey]) === true
    ) {
      return $this->mappings[$jsonKey]['sql'];
    }
    return null;
  }

  protected function assignMapping($json, $value) {
    $this->mappings
      = array_merge($this->mappings, array($json => array('sql' => $value, 'json' => $json)));
  }

}
