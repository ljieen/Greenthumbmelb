<?php

namespace Wpbi\Admin\Url;

use Wpbi\Settings\WpActions;
use Wpbi\Admin\Menu\Query as QueryMenu;

// TODO: uncovered for no good reason
class Query {

  public static function showIndexUrl() {
    return admin_url(sprintf('admin.php?page=%s', QueryMenu::menuSlug()));
  }

  public static function showCreateUrl() {
    $query = http_build_query(array('action' => 'showCreate'));
    return admin_url(sprintf('admin.php?page=%s&%s', QueryMenu::menuSlug(), $query));
  }

  public static function showEditUrl($id) {
    $query = http_build_query(array('page' => QueryMenu::menuSlug(), 'id' => $id, 'action' => 'showEdit'));
    $url = admin_url('admin.php?' . $query);
    return $url;
  }

  public static function createUrl() {
    $query = http_build_query(array('action' => WpActions::CREATE_QUERY));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function editUrl() {
    $query = http_build_query(array('action' => WpActions::EDIT_QUERY));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function deleteUrl($id) {
    $query = http_build_query(array('id' => $id,
      'action' => WpActions::DELETE_QUERY));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

}
