<?php

namespace Wpbi\Models;

use Illuminate\Database\Eloquent\Model;
use Slim\Flash\Messages;
use Valitron\Validator;
use Wpbi\Admin\Flash;

abstract class AbstractModel extends Model {

  public $timestamps = false;

  protected static $validCreateRules = array();

  protected static $validUpdateRules = array();

  public static function validateCreate(array $attributes) {
    $validator = new Validator($attributes);
    $validator->mapFieldsRules(static::$validCreateRules);
    return self::validate($validator);
  }

  public static function validateUpdate(Model $variable) {
    $validator = new Validator($variable->getDirty());
    $validator->mapFieldsRules(static::$validUpdateRules);
    return self::validate($validator);
  }

  private static function validate($validator) {
    $valid = $validator->validate();
    if (isset($_SESSION)) { // TODO: handle flash if no $_SESSION
      (new Messages())->addMessage(Flash::KEY, $validator->errors());
    }
    return $valid;
  }

}
