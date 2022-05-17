<?php

namespace Wpbi\Admin\Url;

use Wpbi\Admin\Menu\Variable as VariableMenu;

// TODO: uncovered for no good reason
class Variable {

  public static function showIndexUrl() {
    return admin_url(sprintf('admin.php?page=%s', VariableMenu::menuSlug()));
  }

}
