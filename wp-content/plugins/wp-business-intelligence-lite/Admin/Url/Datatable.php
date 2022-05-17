<?php

namespace Wpbi\Admin\Url;

use Wpbi\Settings\WpActions;
use Wpbi\Admin\Menu\Datatable as DatatableMenu;

// TODO: uncovered for no good reason
class Datatable {

  public static function showIndexUrl() {
    return admin_url(sprintf('admin.php?page=%s', DatatableMenu::menuSlug()));
  }

  public static function showCreateUrl() {
    $query = http_build_query(array('action' => 'showCreate'));
    return admin_url(sprintf('admin.php?page=%s&%s', DatatableMenu::menuSlug(), $query));
  }

  public static function showEditUrl($id) {
    $query = http_build_query(array('page' => DatatableMenu::menuSlug(), 'id' => $id, 'action' => 'showEdit'));
    $url = admin_url('admin.php?' . $query);
    return $url;
  }

  public static function createUrl() {
    $query = http_build_query(array('action' => WpActions::CREATE_DATATABLE));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function editUrl() {
    $query = http_build_query(array('action' => WpActions::EDIT_DATATABLE));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

  public static function deleteUrl($id) {
    $query = http_build_query(array('id' => $id,
      'action' => WpActions::DELETE_DATATABLE));
    $url = admin_url('admin-post.php?' . $query);
    return $url;
  }

}
