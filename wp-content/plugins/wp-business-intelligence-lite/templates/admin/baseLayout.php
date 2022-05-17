<style>
  h1 {
    display: inline;
  }
</style>

<div class="wrap">
  <h1><?=$this->e($title)?></h1>
  <?php if(isset($titleAction) && !is_null($titleAction)): ?>
    <a href='<?=$titleAction?>' class='page-title-action'>Add New</a>
  <?php endif; ?>
  <?=$this->section('content')?>
</div>
