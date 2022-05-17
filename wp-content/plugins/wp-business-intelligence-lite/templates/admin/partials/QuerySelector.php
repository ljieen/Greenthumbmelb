<tr>
  <th scope="row"><label for='query_id'>Query Name</label></th>
  <td>
    <select name="query_id">
      <?php foreach ($queries as $query): ?>
        <option
          <?=(isset($selected_id) && $query->id == $selected_id) ? 'selected' : ''?>
          value="<?=$query->id?>"><?=$query->name?>
        </option>
      <?php endforeach; ?>
      <?php // TODO: perhaps you should add a link to our site with a description of different charts ?>
    </select>
  </td>
</tr>
