<?php
namespace Wpbi\Admin\Table;

class Action {

  private $name, $baseUrl, $label, $queryParams;

  /**
   * @SuppressWarnings(PHPMD.ExcessiveParameterList)
   */
  public function __construct($name, $baseUrl, $label = null, $queryParams = array('id')) {
    $this->name = $name;
    $this->baseUrl = $baseUrl;
    if ($label === null) {
      $label = $name;
    }
    $this->label = $label;
    $this->queryParams = $queryParams;
  }

  public function getName() {
    return $this->name;
  }

  public function getLabel() {
    return $this->label;
  }

  public function url($row) {
    return $this->addUrlParams($this->getUrlParams($row));
  }

  private function getUrlParams($row) {
    $params = array('action' => $this->name);
    foreach ($this->queryParams as $param) {
      $params[$param] = $row[$param];
    }
    return http_build_query($params);
  }

  /**
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  private function addUrlParams($urlParams) {
    // note will not respect hash fragment
    $url = $this->baseUrl;
    $parsedUrl = parse_url($url);
    if (array_key_exists('path', $parsedUrl) === false || is_null($parsedUrl['path']) === true) {
      $url .= '/';
    }
    $separator = (array_key_exists('query', $parsedUrl) === false || is_null($parsedUrl['query']) === true) ? '?' : '&';
    $url .= $separator . $urlParams;
    return $url;
  }

}
