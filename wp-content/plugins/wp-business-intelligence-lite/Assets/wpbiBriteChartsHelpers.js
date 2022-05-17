var wpbiBriteChartsHelpers = (function () {
  "use strict";

  return {
    drawChart: function (chart, container, data) {
      var containerWidth = container.node() ? container.node().getBoundingClientRect().width : false;
      container.selectAll('.line').remove(); // see https://github.com/eventbrite/britecharts/issues/417
      container.selectAll('.brush-chart').remove(); // see https://github.com/eventbrite/britecharts/issues/417
      chart.width(containerWidth);
      container.datum(data).call(chart);
    },
    loadAndListen: function (chart, container, data) {
      wpbiBriteChartsHelpers.drawChart(chart, container, data);
      var throttledRedraw = _.throttle(function () { wpbiBriteChartsHelpers.drawChart(chart, container, data); }, 200);
      window.addEventListener("resize", throttledRedraw);
    }
  };
})();