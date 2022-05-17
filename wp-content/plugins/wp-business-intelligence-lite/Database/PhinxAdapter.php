<?php
namespace Wpbi\Database;

use Wpbi\Settings;

class PhinxAdapter {

  private $phinxManager;
  private $output;
  private static $env = Settings::PLUGIN_ABBREVIATION;

  public function __construct($config) {
    $phinxConfig = new \Phinx\Config\Config($config);
    $this->output = new \Symfony\Component\Console\Output\BufferedOutput();
    $stringInput = new \Symfony\Component\Console\Input\StringInput(' ');
    $this->phinxManager = new \Phinx\Migration\Manager($phinxConfig, $stringInput, $this->output);
  }

  public function isMigrated() {
    $this->phinxManager->printStatus(self::$env, 'json');
    $migrateStatus = json_decode($this->getJsonOutput());

    foreach ($migrateStatus->migrations as $migration) {
      if (property_exists($migration, 'migration_status') === false) {
        continue;
      }
      if ($migration->migration_status === 'down') {
        return false;
      }
    }
    return true;
  }

  public function migrate() {
    $this->phinxManager->migrate(self::$env); // uncovered
  }

  private function getJsonOutput() {
    $outputParts = explode("\n", $this->output->fetch());
    if (end($outputParts) === '') {
      array_pop($outputParts);
    }
    $jsonPart = end($outputParts);
    return $jsonPart;
  }

}
