<?php

namespace Wpbi\Database;

class PhinxDbAdapter extends \Phinx\Db\Adapter\MysqlAdapter implements \Phinx\Db\Adapter\AdapterInterface {

  public function getSqlType($type, $limit = null) {
    $bytesPerChar = 4;
    $maxIndexBytes = 767; // default for mysql 5.6
    $maxCharLength = (int) floor($maxIndexBytes / $bytesPerChar);
    switch ($type) {
      case static::PHINX_TYPE_STRING:
      case static::PHINX_TYPE_CHAR:
        $limit = ($limit) ?: $maxCharLength;
        break;
    }
    return parent::getSqlType($type, $limit);
  }

}
