<?php $this->layout('admin/baseLayout', array('title' => 'Edit Line Chart')) ?>
<form id='edit-line-charts' action='<?=$this->e($action)?>' method='post'>
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
        <th scope="row"><label for='topic'>Topic</label></th>
        <td>
          <select name="topic">
            <? if (is_null($chart->topic) || !in_array($chart->topic, $columnNames)): ?>
              <option value="" selected disabled>Please choose</option>
            <? endif ?>
            <?php foreach($columnNames as $columnName): ?>
              <option <?=($chart->topic == $columnName) ? 'selected' : ''?> value="<?=$columnName?>">
                <?=$columnName?>
              </option>
            <?php endforeach ?>
          </select>
          <p class="description">A column with human readable names. Is the labels for the lines.</p>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='value'>Value</label></th>
        <td>
          <select name="value">
            <? if (is_null($chart->value) || !in_array($chart->value, $columnNames)): ?>
              <option value="" selected disabled>Please choose</option>
            <? endif ?>
            <?php foreach($columnNames as $columnName): ?>
              <option <?=($chart->value == $columnName) ? 'selected' : ''?> value="<?=$columnName?>">
                <?=$columnName?>
              </option>
            <?php endforeach ?>
          </select>
          <p class="description">A column with numeric values. Represents the height of the line.</p>
        </td>
      </tr>

      <tr>
        <th scope="row"><label for='date'>Date</label></th>
        <td>
          <select name="date">
            <? if (is_null($chart->date) || !in_array($chart->date, $columnNames)): ?>
              <option value="" selected disabled>Please choose</option>
            <? endif ?>
            <?php foreach($columnNames as $columnName): ?>
              <option <?=($chart->date == $columnName) ? 'selected' : ''?> value="<?=$columnName?>">
                <?=$columnName?>
              </option>
            <?php endforeach ?>
          </select>
          <p class="description">A column with date values. Must be an SQL date, datetime, or timestamp format (or cast to it). Is the horizontal axis of the chart.</p>
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

<?php $this->insert('admin/partials/ChartShortcode', array('chartId' => $chart->id, 'chartType' => 'line')) ?>
