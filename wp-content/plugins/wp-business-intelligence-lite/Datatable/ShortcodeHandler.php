<?php
namespace Wpbi\Datatable;

class ShortcodeHandler {

  public static function html($attributes) {
    $shortcodeAttributes = shortcode_atts(array('id' => null), $attributes);
    $datatableId = $shortcodeAttributes['id'];
    $datatable = \Wpbi\Models\Datatable::find($datatableId);
    if (! isset($datatable) || is_null($datatable)) {
      return '';
    } else {
      try {
        return $datatable->getHtml();
      } catch (\PDOException $e) { // suppress error on fronted
      }
    }
  }

}
