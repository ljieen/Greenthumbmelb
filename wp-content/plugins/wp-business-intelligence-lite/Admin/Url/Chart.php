<?php

namespace Wpbi\Admin\Url;

use Wpbi\Settings\WpActions;
use Wpbi\Admin\Menu\Chart as ChartMenu;

// TODO: uncovered for no good reason
class Chart {

  public static function showIndexUrl() {
    return admin_url(sprintf('admin.php?page=%s', ChartMenu::menuSlug()));
  }

  public static function showCreateUrl() {
    $query = http_build_query(array('action' => 'showCreate'));
    return admin_url(sprintf('admin.php?page=%s&%s', ChartMenu::menuSlug(), $query));
  }

  public static function createUrl() {
    $query = http_build_query(array('action' => WpActions::CREATE_CHART));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function deleteUrl($id, $chartType) {
    $query = http_build_query(array('id' => $id,
      'action' => WpActions::DELETE_CHART, 'chart-type' => $chartType));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

}
