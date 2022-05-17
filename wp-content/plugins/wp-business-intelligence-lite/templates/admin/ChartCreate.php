<?php $this->layout('admin/baseLayout', array('title' => 'Create Chart')) ?>
<form id='create-chart' action='<?=$this->e($action)?>' method='post'>
  <table class="form-table">
    <tbody>
      <tr>
        <th scope="row"><label for='chart-type'>Chart Type</label></th>
        <td>
          <select name="chart-type">
            <?php foreach ($chartTypes as $chartType): ?>
              <option value="<?=$chartType['slug']?>"><?=$chartType['name']?></option>
            <?php endforeach; ?>
            <?php // TODO: perhaps you should add a link to our site with a description of different charts ?>
          </select>
        </td>
      </tr>

    </tbody>
  </table>
  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Create"></p>
</form>