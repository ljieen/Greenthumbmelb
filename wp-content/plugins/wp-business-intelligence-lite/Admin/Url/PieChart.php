<?php

namespace Wpbi\Admin\Url;

use Wpbi\Settings\WpActions;
use Wpbi\Admin\Menu\PieChart as PieChartMenu;

// TODO: uncovered for no good reason
class PieChart {

  public static function showCreateUrl() {
    $query = http_build_query(array('action' => 'showCreate'));
    return admin_url(sprintf('admin.php?page=%s&%s', PieChartMenu::menuSlug(), $query));
  }

  public static function showEditUrl($id) {
    $query = http_build_query(array('page' => PieChartMenu::menuSlug(), 'id' => $id, 'action' => 'showEdit'));
    $url = admin_url('admin.php?' . $query);
    return $url;
  }

  public static function createUrl() {
    $query = http_build_query(array('action' => WpActions::CREATE_PIE_CHART));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function editUrl() {
    $query = http_build_query(array('action' => WpActions::EDIT_PIE_CHART));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

}
