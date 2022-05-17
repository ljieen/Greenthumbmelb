<?php $this->layout('admin/baseLayout', array('title' => 'Delete Data Table')) ?>
<p>Are you sure you want to delete this data table?</p>
<p class="description">If you have inserted this data table in posts, it will no longer appear there</p>
<form action='<?=$this->e($action)?>' method='post'>
  <p class="submit"><input type="submit" name="submit" id="submit" class="button" value="Delete Data Table"></p>
</form>
