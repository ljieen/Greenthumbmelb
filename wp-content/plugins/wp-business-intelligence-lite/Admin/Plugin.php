<?php

namespace Wpbi\Admin;

use Wpbi\Settings;

class Plugin {

  public function deactivate() { // covered in functional only
    if (! function_exists('\deactivate_plugins')) {
      require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    \deactivate_plugins(Settings::PLUGIN_FILE_PATH);
  }

}
