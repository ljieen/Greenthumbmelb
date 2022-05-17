<?php if (!empty($rows) && !empty($headers)): ?>
  <table id="datatable-<?=$datatableId?>" class="display" cellspacing="0" width="100%">
    <thead>
      <tr>
        <?php foreach($headers as $header): ?>
          <th><?=$header?></th>
        <?php endforeach ?>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <?php foreach($headers as $header): ?>
          <th><?=$header?></th>
        <?php endforeach ?>
      </tr>
    </tfoot>
    <tbody>
      <?php foreach($rows as $row): ?>
        <tr>
          <?php foreach($row as $cell): ?>
            <td><?=$cell?></td>
          <?php endforeach ?>
        </tr>
      <?php endforeach ?>
    </tbody>
  </table>
  <div id='datatable-<?=$datatableId?>-buttons'></div>

  <script type="text/javascript">
    docReady(function () {
      jQuery.extend(true, jQuery.fn.dataTable.defaults, {
        "order": [],
        "searching": false,
        "responsive": true
      });
      var table = jQuery("#datatable-<?=$datatableId?>").DataTable(<?=json_encode($options)?>);
      table.buttons().container().appendTo( jQuery('#datatable-<?=$datatableId?>-buttons') );
    });
  </script>
<?php endif ?>
