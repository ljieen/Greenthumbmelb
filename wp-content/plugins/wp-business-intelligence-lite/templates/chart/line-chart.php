<?php if ($chartData !== '[]'): ?>
  <div id="js-line-container-<?=$chartId?>"></div>
  <div id="js-line-container-legend-<?=$chartId?>"></div>

  <?php if (!empty($options['caption'])) : ?>
    <div class="js-line-chart-caption"><span><?=$options['caption']?></span></div>
  <?php endif; ?>


  <script type="text/javascript">
    docReady(function () {
      "use strict";

      var data = { dataByTopic: <?=$chartData?> };

      let chart = britecharts.line(),
          tooltip = britecharts.tooltip(),
          chartContainer = d3.select('#js-line-container-<?=$chartId?>'),
          tooltipContainer,
          dataset;

          dataset = data;

          chart
            .margin({ top: 60, right: 30, bottom: 50, left: 70 })
            .isAnimated(true)
            .tooltipThreshold(600)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

      wpbiBriteChartsHelpers.loadAndListen(chart, chartContainer, dataset);

      tooltipContainer = d3.select('#js-line-container-<?=$chartId?> .metadata-group');
      tooltipContainer.datum([]).call(tooltip);

      var showLegend = <?=$options['show_legend']?>;
      if (showLegend) {
        var legend = britecharts.legend();
        var legendData = <?=$legendData?>;
        var legendContainer = d3.select('#js-line-container-legend-<?=$chartId?>');
        legend.isHorizontal(true);
        wpbiBriteChartsHelpers.loadAndListen(legend, legendContainer, legendData);
      }
    });

  </script>
<?php endif; ?>
