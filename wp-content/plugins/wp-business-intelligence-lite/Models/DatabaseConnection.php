<?php
namespace Wpbi\Models;

use \PDO;
use Wpbi\Database\DsnBuilder;

// TODO: uncovered
class DatabaseConnection extends AbstractModel {

  protected $attributes = array('type' => 'mysql');

  protected $fillable = array(
    'name',
    'username',
    'password',
    'database_name',
    'host',
    'port',
    'socket',
    'type'
  );

  protected static $validCreateRules = array(
    'name' => array('required', array('unique', self::class)),
    'username' => 'required',
    'database_name' => 'required',
    'host' => 'required',
    'port' => 'integer',
  );

  protected static $validUpdateRules = array(
    'name' => array(array('unique', self::class)),
    'port' => 'integer',
  );

  public function queries() {
    return $this->hasMany(\Wpbi\Models\Query::class);
  }

  public function setPortAttribute($value) {
    $this->attributes['port'] = (trim($value) === '') ? null : $value;
  }

  public function setSocketAttribute($value) {
    $this->attributes['socket'] = (trim($value) === '') ? null : $value;
  }

  public function pdo() {
    $options = array(
      // ATTR_EMULATE_PREPARES false enables some statements to work that wouldn't otherwise eg 'select * limit :limit'
      PDO::ATTR_EMULATE_PREPARES => false,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    );
    // TODO: throws uncaught exception if can't connect
    return new PDO(DsnBuilder::dsn($this), $this->username, $this->password, $options);
  }

}
