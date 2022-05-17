<?php $this->layout('admin/baseLayout', array('title' => 'Create Data Table')) ?>
<form id='create-datatable' action='<?=$this->e($action)?>' method='post'>
  <table class="form-table">
    <tbody>

      <?php $this->insert('admin/partials/QuerySelector', array('queries' => $queries)) ?>

      <tr>
        <th scope="row"><label for='page_size'>Page Size</label></th>
        <td>
          <input id='page_size' name='page_size' type='text' class="regular-text"/>
          <p class="description">Number of results per page when first loaded. Use -1 to show all rows.</p>
        </td>
      </tr>

    </tbody>
  </table>
  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Create"></p>
</form>