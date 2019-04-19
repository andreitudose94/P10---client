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
      categories = [],
      tooltip = {
        visible: true,
        format: "{0}"
      }
    } = this.props

    let seriesDefaultsLabel = {}
    if(chartType === 'pie') {
      seriesDefaultsLabel = {
        visible: false,
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
      tooltip: tooltip
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
    const { series, categories } = this.props
    const { data } = series[0]
    if(
      this.equalArrays(data, nextProps.series[0].data) &&
      this.equalArrays(categories, nextProps.categories)
    ) {
      return false
    }
    return true
  }

  equalArrays(a, b) {

    if(!a && !b) {
      return true
    }

    // if their length isn't the same => they are not equal
    if(a.length !== b.length) {
      return false
    }

    for(let i = 0 ; i < a.length ; i ++) {
      if(!this.equalObjects(a[i], b[i])) {
        return false
      }
    }

    return true
  }

  equalObjects(a, b) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
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
        style={{width, height}}
      ></div>
    )
  }
}

export default Chart
