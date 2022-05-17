<?php
namespace Wpbi\Database;

use Wpbi\Admin\Plugin;
use Wpbi\Settings;
use Wpbi\WpGlobals;

class PhinxMigrator {

  public function ensureDatabaseMigrated() {
    $this->registerPhinxAdapter();
    $wpConfig = new WpConfig();
    $phinxConfig = (new PhinxConfig($wpConfig))->getConfig();
    $phinxConfig['paths']['migrations'] = join(DIRECTORY_SEPARATOR, array(__DIR__, 'migrations'));

    $phinxAdapter = new PhinxAdapter($phinxConfig);
    try {
      $phinxAdapter->migrate();
      // TODO: throws error if the user does not have pdo extension, could handle this more gracefully
    } catch (\Exception $e) {
      $baseMessage = 'A catastrophic error has occurred such that ' . Settings::PLUGIN_NAME . ' cannot run.
        Please feel free to email ' . Settings::SUPPORT_EMAIL .
        ' the full output of this message and we\'ll look into it.';
      $trace = json_decode(json_encode($e->getTrace()));
      $verboseError = var_export($trace, true);
      $error = $e->getMessage();
      wp_die($baseMessage . '</br></br><pre>' . $error . $verboseError . $this->databaseInfo() . '</pre>' .
        (new Plugin())->deactivate()); // hack to show error message before deactivating plugin
    }
  }

  private function registerPhinxAdapter() {
    \Phinx\Db\Adapter\AdapterFactory::instance()->registerAdapter(Settings::PHINX_ADAPTER, PhinxDbAdapter::class);
  }

  private function databaseInfo() {
    $wpGlobals = new WpGlobals();
    $wpdb = $wpGlobals->getWpdb();
    $info = var_export($wpdb->get_results('show variables'), true);
    $info .= var_export($wpdb->get_results(
      $wpdb->prepare(
        "select * from information_schema.columns where information_schema.columns.table_schema = '%s';",
        $wpGlobals->getDbName()
      )
    ), true);
    return $info;
  }

}
