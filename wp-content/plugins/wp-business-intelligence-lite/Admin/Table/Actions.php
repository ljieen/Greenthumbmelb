<?php
namespace Wpbi\Admin\Table;

class Actions {

  private $actions = array();

  public function addAction(Action $action) {
    $this->actions[] = $action;
  }

  public function getActionHash($row) {
    $actionHash = array();
    foreach ($this->actions as $action) {
      $name = $action->getName();
      $label = $action->getLabel();
      $url = $action->url($row);
      $actionHash[$name] = "<a href='{$url}'>{$label}</a>";
    }
    return $actionHash;
  }

}
