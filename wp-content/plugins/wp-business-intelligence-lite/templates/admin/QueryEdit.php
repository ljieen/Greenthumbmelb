<?php $this->layout('admin/baseLayout', array('title' => 'Edit Query')) ?>
<form id='edit-query' action='<?=$this->e($action)?>' method='post'>
  <input type='hidden' value='<?=$this->e($id)?>' name='id' />
  <table class="form-table">
    <tbody>

      <tr>
        <th scope="row"><label for='name'>Name</label></th>
        <td>
          <input id='name' name='name' class="regular-text" value='<?=$this->e($query->name)?>'/>
          <p class="description">Unique name to reference query.</p>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='sql'>SQL</label></th>
        <td>
          <textarea id='sql' name='sql' type='text' class="large-text code"
                 rows="10" cols="50"><?= $this->e($query->sql) ?></textarea>
          <p class="description">Any valid SQL query that returns a non-empty result.</p>
          <p class="description">Try 'SELECT 1' if you to unsure it's connecting to your database server. Try 'SHOW TABLES', to ensure it's connecting to your database.</p>
        </td>
      </tr>

    </tbody>
  </table>

  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>
</form>
<?php $this->insert('admin/partials/PdoException', array('exception' => $exception)) ?>
<?php $this->insert('admin/partials/QueryInstructions') ?>
<pre><?php $this->e(print_r($queryResults)); ?></pre>