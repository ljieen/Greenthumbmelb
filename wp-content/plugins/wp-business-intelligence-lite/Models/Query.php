<?php
namespace Wpbi\Models;

use Wpbi\Database\QueryExecutor;
use Wpbi\Database\WpConfig;
use Wpbi\Database\WpPdo;

class Query extends AbstractModel {

  protected $table = 'queries3';

  protected $fillable = array(
    'database_connection_id',
    'sql',
    'name',
  );

  protected static $validCreateRules = array(
    'sql' => array('required'),
    'name' => array('required', array('unique', self::class)),
  );

  protected static $validUpdateRules = array(
    'name' => array(array('unique', self::class)),
  );

  public function databaseConnection() {
    return $this->belongsTo(\Wpbi\Models\DatabaseConnection::class);
  }

  public function datatables() {
    return $this->hasMany(\Wpbi\Models\Datatable::class);
  }

  public function pieCharts() {
    return $this->hasMany(\Wpbi\Models\PieChart::class);
  } // TODO: setup other relationships

  public function setDatabaseConnectionIdAttribute($value) {
    $this->attributes['database_connection_id'] = (trim($value) === '') ? null : $value;
  }

  public function results() {
    $pdo = $this->getPdo();
    $binds = $this->getBinds();
    return (new QueryExecutor($pdo, $this->sql, $binds))->results();
  }

  private function getPdo() {
    return (new WpPdo(new WpConfig()))->get();
  }

  private function getBinds() {
    $binds = array();
    return $binds;
  }

}
