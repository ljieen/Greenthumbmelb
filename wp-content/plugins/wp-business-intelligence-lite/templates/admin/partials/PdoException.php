<?php if ($exception): // TODO: uncovered?>
  <div style="color: red"><!--  TODO: better styling-->
    <p>The following error occurred when executing your query:</p>
    <p><?=$exception->getMessage() ?></p>
  </div>
<?php endif ?>