<?php
namespace Wpbi\Admin;

use Slim\Flash\Messages;
use League\Plates\Engine;
use Wpbi\Settings;

class Flash {

  const KEY = 'validator_errors';

  public static function renderFlash() {
    echo self::getFlash();
  }

  public static function getFlash(){
    if (! isset($_SESSION)) { // TODO: handle flash if no $_SESSION
      return '';
    }
    $messages = self::getMessages();
    return self::messageToHtml($messages);
  }

  private static function getMessages() {
    $flashMessages = new Messages();
    $messages = $flashMessages->getMessages();
    $flashMessages->clearMessages();
    return $messages;
  }

  private static function messageToHtml($messages) {
    $html = '';

    if (array_key_exists(self::KEY, $messages)) {
      foreach ($messages[self::KEY] as $validatorErrors) {
        foreach ($validatorErrors as $errorMessages) {
          $html .= (new Engine(Settings::platesDirectory()))
            ->render('admin/Flash', array('messages' => $errorMessages));
        }
      }
    }
    return $html;
  }

}
