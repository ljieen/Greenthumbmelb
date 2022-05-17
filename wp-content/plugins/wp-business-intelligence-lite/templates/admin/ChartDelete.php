<?php $this->layout('admin/baseLayout', array('title' => 'Delete Chart')) ?>
<p>Are you sure you want to delete this chart?</p>
<p class="description">If you have inserted this chart in posts, it will no longer appear there</p>
<form action='<?=$this->e($action)?>' method='post'>
  <p class="submit"><input type="submit" name="submit" id="submit" class="button" value="Delete Chart"></p>
</form>