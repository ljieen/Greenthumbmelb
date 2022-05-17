<?php

namespace Wpbi\Admin\Url;

use Wpbi\Settings\WpActions;
use Wpbi\Admin\Menu\BarChart as BarChartMenu;

// TODO: uncovered for no good reason
class BarChart {

  public static function showCreateUrl() {
    $query = http_build_query(array('action' => 'showCreate'));
    return admin_url(sprintf('admin.php?page=%s&%s', BarChartMenu::menuSlug(), $query));
  }

  public static function showEditUrl($id) {
    $query = http_build_query(array('page' => BarChartMenu::menuSlug(), 'id' => $id, 'action' => 'showEdit'));
    $url = admin_url('admin.php?' . $query);
    return $url;
  }

  public static function createUrl() {
    $query = http_build_query(array('action' => WpActions::CREATE_BAR_CHART));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function editUrl() {
    $query = http_build_query(array('action' => WpActions::EDIT_BAR_CHART));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

}
