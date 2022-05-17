<?php foreach ($messages as $message): ?>
  <div class='notice notice-error is-dismissible'>
    <p><?=$this->e($message)?></p>
  </div>
<?php endforeach; ?>
