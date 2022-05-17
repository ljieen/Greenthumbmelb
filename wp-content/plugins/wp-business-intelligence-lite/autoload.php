<?php
spl_autoload_register(
  function ($class) {
    $prefix = 'Wpbi\\';
    $baseDir = __DIR__ . DIRECTORY_SEPARATOR;
    $prefixLocation = strlen($prefix);
    $hasPrefix = strncmp($prefix, $class, $prefixLocation) === 0;
    if ($hasPrefix === false) {
      return;
    }
    $relativeClass = substr($class, $prefixLocation);
    $file = $baseDir . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';
    require($file);
  }
);
