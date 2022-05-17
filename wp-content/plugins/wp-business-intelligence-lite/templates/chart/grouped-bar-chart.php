<?php if ($chartData !== '[]'): ?>
  <div id="js-grouped-bar-container-<?=$chartId?>"></div>
  <div id="js-grouped-bar-container-legend-<?=$chartId?>"></div>

  <?php if (!empty($options['caption'])) : ?>
    <div class="js-grouped-bar-chart-caption"><span><?=$options['caption']?></span></div>
  <?php endif; ?>


  <script type="text/javascript">
    docReady(function () {
      "use strict";

      var data = <?=$chartData?>

      let chart = britecharts.groupedBar(),
          tooltip = britecharts.tooltip(),
          chartContainer = d3.select('#js-grouped-bar-container-<?=$chartId?>'),
          tooltipContainer,
          dataset;

      dataset = data;

      chart
          .isAnimated(true)
          .tooltipThreshold(1000)
          .on('customMouseOver', tooltip.show)
          .on('customMouseMove', tooltip.update)
          .on('customMouseOut', tooltip.hide);

      hackStartingChartColor(); // see bug https://github.com/eventbrite/britecharts/issues/454

      wpbiBriteChartsHelpers.loadAndListen(chart, chartContainer, dataset);

      tooltip
            .topicLabel('values')
            .dateLabel('key')
            .nameLabel('stack')
            .title('Tooltip');

      tooltipContainer = d3.select('#js-grouped-bar-container-<?=$chartId?> .metadata-group');
      tooltipContainer.datum([]).call(tooltip);

      var showLegend = <?=$options['show_legend']?>;
      if (showLegend) {
        var legend = britecharts.legend();
        var legendData = <?=$legendData?>;
        var legendContainer = d3.select('#js-grouped-bar-container-legend-<?=$chartId?>');
        legend.isHorizontal(true);
        wpbiBriteChartsHelpers.loadAndListen(legend, legendContainer, legendData);
      }

      function hackStartingChartColor() {
        var index = numberOfNames() % chart.colorSchema().length * -1;
        chart.colorSchema(
          chart.colorSchema().slice(index).concat(chart.colorSchema().slice(0, index))
        );
        function numberOfNames() {
          var names = {};
          for (var i = 0, length = data.length; i < length; i++) {
            names[data[i].name] = 0;
          }
          return Object.keys(names).length;
        }
      }

    });
  </script>
<?php endif; ?>
