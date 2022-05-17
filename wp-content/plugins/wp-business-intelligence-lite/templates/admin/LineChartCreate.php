<?php $this->layout('admin/baseLayout', array('title' => 'Create Line Chart')) ?>
<form id='create-line-chart' action='<?=$this->e($action)?>' method='post'>

  <table class="form-table">
    <tbody>

      <?php $this->insert('admin/partials/QuerySelector', array('queries' => $queries)) ?>

      <tr>
        <th scope="row"><label for='show_legend'>Show Legend?</label></th>
        <td>
          <input id='show_legend' name='show_legend' type='checkbox'/>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='show_legend'>Name</label></th>
        <td>
          <input id='cname' name='cname' type='text' class="regular-text" value="" />
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='show_legend'>Caption</label></th>
        <td>
          <input id='caption' name='caption' type='text' class="regular-text" value="" />
        </td>
      </tr>

    </tbody>
  </table>

  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Create"></p>

</form>
