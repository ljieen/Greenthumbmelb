<?php

namespace Wpbi\Admin\Url;

use Wpbi\Admin\Menu\DatabaseConnection as DatabaseConnectionMenu;

// TODO: uncovered for no good reason
class DatabaseConnection {

  public static function showIndexUrl() {
    return admin_url(sprintf('admin.php?page=%s', DatabaseConnectionMenu::menuSlug()));
  }

}
