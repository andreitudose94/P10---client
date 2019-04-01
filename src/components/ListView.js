import React, {Component} from 'react';

class ListView extends React.Component {

  componentDidMount() {
    const { listViewId, dataSource = [], templateId } = this.props
    this.buildListView(dataSource, listViewId, templateId)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dataSource = [], templateId = '' } = this.props

    if(this.equalArrays(dataSource, nextProps.dataSource) &&
       templateId !== nextProps.templateId) {
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

  componentDidUpdate() {
    const { dataSource = [], listViewId, templateId } = this.props
    this.buildListView(dataSource, listViewId, templateId)
  }

  buildListView(dataSource, listViewId, templateId) {

    if($("#" + listViewId).data("kendoListView")) {
      $("#" + listViewId).data("kendoListView").destroy();
    }

    $("#" + listViewId).kendoListView({
      dataSource: dataSource,
      template: templateId && kendo.template($("#" + templateId).html())
    })
  }

  render() {
    const { listViewId } = this.props
    return (
      <div id={listViewId}></div>
    )
  }
}

export default ListView
