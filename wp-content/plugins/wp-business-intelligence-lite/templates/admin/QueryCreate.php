<?php $this->layout('admin/baseLayout', array('title' => 'Create Query')) ?>
<form id='create-query' action='<?=$this->e($action)?>' method='post'>

  <table class="form-table">
    <tbody>

      <tr>
        <th scope="row"><label for='name'>Name</label></th>
        <td>
          <input id='name' name='name' class="regular-text"/>
          <p class="description">Unique name to reference query.</p>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='sql'>SQL</label></th>
        <td>
          <textarea id='sql' name='sql' type='text' class="large-text code"
                    rows="10" cols="50"></textarea>
          <p class="description">Any valid SQL query that returns a non-empty result.</p>
          <p class="description">Try 'SELECT 1' if you to unsure it's connecting to your database server. Try 'SHOW TABLES', to ensure it's connecting to your database.</p>
        </td>
      </tr>

    </tbody>
  </table>

  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Create"></p>
</form>
<?php $this->insert('admin/partials/QueryInstructions') ?>

