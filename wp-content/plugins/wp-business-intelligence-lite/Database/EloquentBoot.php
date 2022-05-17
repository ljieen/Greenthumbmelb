<?php
namespace Wpbi\Database;

// TODO: desperately needs coverage
class EloquentBoot {

  public function boot() {
    $capsule = new \Illuminate\Database\Capsule\Manager();
    $capsule->addConnection($this->config());
    $capsule->setAsGlobal();
    $capsule->bootEloquent();
  }

  /**
   * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
   */
  private function config() {
    $wpConfig = new \Wpbi\Database\WpConfig();
    $prefix = $wpConfig->getTablePrefix() . \Wpbi\Settings::PLUGIN_ABBREVIATION . '_';
    $config = array(
      'sticky' => true,
      'driver' => 'mysql',
      'database' => $wpConfig->getName(),
      'username' => $wpConfig->getUserName(),
      'password' => $wpConfig->getPassword(),
      'charset' => $wpConfig->getCharset(),
      'collation' => $wpConfig->getCollation(),
      'prefix' => $prefix,
      'strict' => true
    );
    $hostWithPort = $wpConfig->getHostWithPort();
    $socket = $wpConfig->getSocket();
    if ($hostWithPort) {
      $config['host'] = $hostWithPort;
    } elseif ($socket) {
      $config['unix_socket'] = $socket;
    }
    return $config;
  }

}
