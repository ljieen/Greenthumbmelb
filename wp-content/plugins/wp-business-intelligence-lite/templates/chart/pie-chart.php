<?php if ($chartData !== '[]'): ?>
  <div id="js-pie-container-<?=$chartId?>"></div>
  <div id="js-pie-container-legend-<?=$chartId?>"></div>

  <?php if (!empty($options['caption'])) : ?>
    <div class="js-pie-chart-caption"><span><?=$options['caption']?></span></div>
  <?php endif; ?>


  <script type="text/javascript">
    docReady(function () {
      "use strict";

      var data = <?=$chartData?>;

      let chart = britecharts.donut(),
          chartContainer = d3.select('#js-pie-container-<?=$chartId?>');

          chart
            .isAnimated(true);

          wpbiBriteChartsHelpers.loadAndListen(chart, chartContainer, data);

      var showLegend = <?=$options['show_legend']?>;
      if (showLegend) {
        var legend = britecharts.legend();
        d3.select('#js-pie-container-legend-<?=$chartId?>').datum(data).call(legend);
      }

    });

  </script>
<?php endif; ?>
