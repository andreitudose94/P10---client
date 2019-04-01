import React, {Component} from 'react';

class Chart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      chartId = '',
      height,
      chartType = 'column',
      legendPosition = 'bottom',
      title = '',
      stack = false,
      series = [],
      categories = []
    } = this.props

    let seriesDefaultsLabel = {}
    if(chartType === 'pie') {
      seriesDefaultsLabel = {
        visible: true,
        background: "transparent",
        template: "#= category #: \n #= value#%"
      }
    }

    $("#" + chartId).kendoChart({
      title: {
        text: title
      },
      legend: {
        position: legendPosition
      },
      seriesDefaults: {
        type: chartType,
        stack: stack,
        labels: seriesDefaultsLabel
      },
      series: series,
      valueAxis: {
        line: {
          visible: false
        }
      },
      categoryAxis: {
        categories: categories,
        majorGridLines: {
          visible: false
        },
        labels: {
          visual: function(e) {
            var rect = new kendo.geometry.Rect(e.rect.origin, [e.rect.size.width, 100]);
            var layout = new kendo.drawing.Layout(rect, {
              orientation: "vertical",
              alignContent: "center"
            });
            var words = e.text.split(" ");
            for (var i = 0; i < words.length; i++) {
              layout.append(new kendo.drawing.Text(words[i]));
            }
            layout.reflow();
            return layout;
          }
        }
      },
      tooltip: {
        visible: true,
        format: "{0}"
      }
    });
  }

  componentDidUpdate() {
    const {
      chartId = '',
      series = [],
      categories = []
    } = this.props

    const chart = $("#" + chartId).data("kendoChart");
    chart.setOptions({
      categoryAxis: {
        categories: categories,
        majorGridLines: {
          visible: false
        }
      },
      series: series
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // don't update if conditions
    return true
  }

  render() {
    const {
      chartId = '',
      width = '',
      height = ''
    } = this.props
    return (
      <div
        id={chartId}
      ></div>
    )
  }
}

export default Chart
