<?php if ($chartData !== '[]'): ?>
  <div id="js-bar-container-<?=$chartId?>"></div>

  <?php if (!empty($options['caption'])) : ?>
    <div class="js-bar-chart-caption"><span><?=$options['caption']?></span></div>
  <?php endif; ?>

  <script type="text/javascript">
    docReady(function () {
      "use strict";

      var data = <?=$chartData?>;

      let barChart = britecharts.bar(),
          tooltip = britecharts.miniTooltip(),
          chartContainer = d3.select('#js-bar-container-<?=$chartId?>'),
          tooltipContainer,
          dataset;

          dataset = data;

          barChart
              .isAnimated(true)
              .on('customMouseOver', tooltip.show)
              .on('customMouseMove', tooltip.update)
              .on('customMouseOut', tooltip.hide);

          wpbiBriteChartsHelpers.loadAndListen(barChart, chartContainer, dataset);

          tooltipContainer = d3.select('#js-bar-container-<?=$chartId?> .metadata-group');
          tooltipContainer.datum([]).call(tooltip);
    });
  </script>
<?php endif; ?>
