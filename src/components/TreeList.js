import React, {Component} from 'react';

class TreeList extends React.Component {

  componentDidMount() {
    const {
      dataSource = [],
      columns = [],
      treelistId,
      resizable = false,
      reorderable = false,
      columnMenu = false,
      sortable = false,
      filterable = false,
      editable = false,
      height = '',
      excel = {},
      pdf = {},
      messages = {},
      navigation = false,
      pageable = false,
      scrollable = true,
      selectable = false,
      onCancel,
      onEdit,
      onRemove,
      onSave,
      onSelectRow,
      onDataBound,
      onExpand
    } = this.props

    let extraProps = {}
    let toolbar = []
    if(Object.keys(excel).length > 0) {
      extraProps.excel = excel
      toolbar.push('excel')
      extraProps.toolbar = toolbar
    }
    if(Object.keys(pdf).length > 0) {
      extraProps.pdf = pdf
      toolbar.push('pdf')
      extraProps.toolbar = toolbar
    }
    if(Object.keys(messages).length > 0) {
      extraProps.messages = messages
    }

    $("#" + treelistId).kendoTreeList({
      columns: columns,
      dataSource: {
        data: dataSource
      },
      sortable: sortable,
      filterable: filterable,
      resizable: resizable,
      reorderable: reorderable,
      columnMenu: columnMenu,
      editable: editable,
      height: height,
      navigation: navigation,
      pageable: pageable,
      scrollable: scrollable,
      selectable: selectable,
      cancel: (e) => {
        onCancel(e.model)
      },
      edit: (e) => {
        onEdit(e.model)
      },
      remove: (e) => {
        onRemove(e.model)
      },
      save: (e) => {
        onSave(e.model)
      },
      change: function(e) {
        const selectedRows = this.select();
        let selectedDataItems = [];
        for (let i = 0; i < selectedRows.length; i++) {
          const dataItem = this.dataItem(selectedRows[i]);
          selectedDataItems.push(dataItem);
        }
        onSelectRow(selectedDataItems);
      },
      dataBound: (e) => {
        onDataBound(e);
      },
      expand: (e) => {
        onExpand(e.model);
      },
      ...extraProps
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource = [], columns = [], treelistId } = nextProps

    const dsNew = new kendo.data.TreeListDataSource({
      data: dataSource
    });
    $("#" + treelistId).data("kendoTreeList").setDataSource(dsNew);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      dataSource = [],
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
    const { treelistId } = this.props
    return (
      <div id={treelistId}></div>
    )
  }
}

export default TreeList
