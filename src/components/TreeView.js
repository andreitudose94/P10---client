import React, {Component} from 'react';

class TreeView extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      name,
      dataSource = [],
      dataTextField = '',
      template = '',
      initiallyExpanded = false,
      onChange,
      onDataBound
    } = this.props

    $("#" + name).kendoTreeView({
      dataSource: {
        data: dataSource
      },
      dataTextField: dataTextField,
      animation: {
        collapse: false
      },
      template: template,
      change: function(e) {
        onChange(this.text(this.select()))
      },
      dataBound: function(e) {
        if(initiallyExpanded) {
          this.expand(".k-item");
        }
        onDataBound(e.sender)
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { name, dataSource = [] } = nextProps

    $("#" + name).data("kendoTreeView").setDataSource(
      new kendo.data.HierarchicalDataSource({
        data: dataSource
      })
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      dataSource = []
    } = this.props

    if(this.equalArrays(dataSource, nextProps.dataSource)) {
      return false
    }
    return true
  }

  equalArrays(a, b) {
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
    const { name } = this.props
    return (
      <div id={name}></div>
    )
  }
}

export default TreeView
