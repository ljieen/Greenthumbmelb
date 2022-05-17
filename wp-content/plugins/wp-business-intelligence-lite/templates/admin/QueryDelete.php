<?php $this->layout('admin/baseLayout', array('title' => 'Delete Query')) ?>
<p>Are you sure you want to delete this query?</p>
<p class="description">If this query is being used for charts/tables, then those must be deleted first.</p>
<form action='<?=$this->e($action)?>' method='post'>
  <p class="submit"><input type="submit" name="submit" id="submit" class="button" value="Delete Query"></p>
</form>