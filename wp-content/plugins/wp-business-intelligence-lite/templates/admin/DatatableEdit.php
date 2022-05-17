<?php $this->layout('admin/baseLayout', array('title' => 'Edit Datatable')) ?>
<form id='edit-datatable' action='<?=$this->e($action)?>' method='post'>
  <input type='hidden' value='<?=$this->e($datatable->id)?>' name='id' />

  <table class="form-table">
    <tbody>

      <?php $this->insert('admin/partials/QuerySelector', array('queries' => $queries, 'selected_id' => $datatable->query_id)) ?>

      <tr>
        <th scope="row"><label for='page_size'>Page Size</label></th>
        <td>
          <input id='page_size' name='page_size' type='text' class="regular-text" value='<?=$this->e($datatable->page_size)?>'/>
          <p class="description">Number of results per page when first loaded. Use -1 to show all rows.</p>
        </td>
      </tr>

    </tbody>
  </table>

  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>

</form>
<p>If a table is not shown below, an error has occurred.
  Please check that your query returns a non-empty table of results.</p>
<?php $this->insert('admin/partials/PdoException', array('exception' => $exception)) ?>
<?=$datatableHtml?>

<h2 style='clear:both'>Shortcode</h2>
<p>Copy the following into a post to display this table.</p>
<textarea rows="1" class="large-text readonly">[wpbi_table id="<?=$this->e($datatable->id)?>" /]</textarea>