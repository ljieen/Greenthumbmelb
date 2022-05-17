<?php
namespace Wpbi\Models;

use League\Plates\Engine;
use Wpbi\Settings;

// TODO: uncovered
// TODO: visit the idea of using inheritance for pro/lite visibility
class Datatable extends AbstractModel {

  protected $fillable = array(
    'query_id',
    'page_size',
  );

  protected static $validCreateRules = array(
    'query_id' => array('required', 'integer'),
    'page_size' => 'integer',
  );

  protected static $validUpdateRules = array(
    'query_id' => 'integer',
    'page_size' => 'integer',
  );

  public function queryStatement() { // query is a method of all eloquent models
    return $this->belongsTo(\Wpbi\Models\Query::class, 'query_id');
  }

  public function setPageSizeAttribute($value) {
    $this->attributes['page_size'] = (trim($value) === '') ? (-1) : $value;
  }

  public function getHtml() {
    $query = $this->queryStatement;
    $queryResults = $query->results();
    $options = $this->options();

    self::enqueueAssets();
    return (new Engine(Settings::platesDirectory()))
      ->render('datatable/Datatable',
        array('rows' => $queryResults,
          'datatableId' => $this->id,
          'headers' => $this->headers($queryResults),
          'options' => $options));
  }

  private function headers($queryResults) {
    if (empty($queryResults)) {
      return array();
    }
    return array_keys(reset($queryResults));
  }

  private static function enqueueAssets() {
    wp_enqueue_script(Settings::datatableScriptName());
    wp_enqueue_style(Settings::datatableStyleName());
  }

  private function options() {
    $options = array('pageLength' => $this->page_size);
    return $options;
  }

}
