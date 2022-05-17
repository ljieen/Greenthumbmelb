<?php $this->layout('admin/baseLayout', array('title' => 'Edit Donut Chart')) ?>
<form id='edit-pie-charts' action='<?=$this->e($action)?>' method='post'>
  <input type='hidden' value='<?=$this->e($chart->id)?>' name='id' />

  <table class="form-table">
    <tbody>

      <?php $this->insert('admin/partials/QuerySelector', array('queries' => $queries, 'selected_id' => $chart->query_id)) ?>

      <tr>
        <th scope="row"><label for='show_legend'>Show Legend?</label></th>
        <td>
          <input id='show_legend' name='show_legend' type='checkbox' <?=$this->e($chart->show_legend) ? 'checked=checked' : '' ?>/>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='show_legend'>Name</label></th>
        <td>
          <input id='cname' name='cname' type='text' class="regular-text" value="<?=$this->e($chart->cname)?>" />
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='show_legend'>Caption</label></th>
        <td>
          <input id='caption' name='caption' type='text' class="regular-text" value="<?=$this->e($chart->caption)?>" />
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='name'>Name</label></th>
        <td>
          <select name="name">
            <? if (is_null($chart->name) || !in_array($chart->name, $columnNames)): ?>
              <option value="" selected disabled>Please choose</option>
            <? endif ?>
            <?php foreach($columnNames as $columnName): ?>
              <option <?=($chart->name == $columnName) ? 'selected' : ''?> value="<?=$columnName?>">
                <?=$columnName?>
              </option>
            <?php endforeach ?>
          </select>
          <p class="description">A column with human readable names. Is the labels for the slices.</p>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='quantity'>Quantity</label></th>
        <td>
          <select name="quantity">
            <? if (is_null($chart->quantity) || !in_array($chart->quantity, $columnNames)): ?>
              <option value="" selected disabled>Please choose</option>
            <? endif ?>
            <?php foreach($columnNames as $columnName): ?>
              <option <?=($chart->quantity == $columnName) ? 'selected' : ''?> value="<?=$columnName?>">
                <?=$columnName?>
              </option>
            <?php endforeach ?>
          </select>
          <p class="description">A column with numeric values. Is the relative size of the slices.</p>
        </td>
      </tr>

    </tbody>
  </table>

  <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>
</form>
<p>If a chart is not shown below, an error has occurred.
  Please check that your query returns a non-empty table of results.</p>
<?php $this->insert('admin/partials/PdoException', array('exception' => $exception)) ?>
<?=$chartHtml?>

<?php $this->insert('admin/partials/ChartShortcode', array('chartId' => $chart->id, 'chartType' => 'pie')) ?>
