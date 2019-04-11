import React, {Component} from 'react';

class Grid extends React.Component {

  componentDidMount() {
    this.buildGrid(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      dataSource,
      columns = [],
      gridId,
      rowTemplateId,
      altRowTemplateId,
      visibleHeader = true,
      pageable = false,
      editable = false,
      onDelete
    } = this.props

    if(this.equalArrays(dataSource, nextProps.dataSource)) {
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

  componentDidUpdate() {
    this.buildGrid(this.props)
  }

  buildGrid(props) {
    const {
      dataSource = [],
      columns = [],
      gridId,
      rowTemplateId,
      altRowTemplateId,
      visibleHeader = true,
      pageable = false,
      editable = false,
      onDelete,
      onCreate_Custom,
      toolbar = [],
      pdf = {},
      excel = {},
      pdfButtonTitle,
      excelButtonTitle,
      createButtonTitle
    } = props

    if($("#" + gridId).data("kendoGrid")) {
      $("#" + gridId).data("kendoGrid").destroy();
    }

    $("#" + gridId).kendoGrid({
      columns: columns,
      dataSource: dataSource,
      toolbar: toolbar,
      pdf: pdf,
      excel: excel,
      pageable: pageable,
      rowTemplate: rowTemplateId && kendo.template($("#" + rowTemplateId).html()),
      altRowTemplate: altRowTemplateId && kendo.template($("#" + altRowTemplateId).html()),
      dataBound: (e) => {
        if(!visibleHeader) {
          $('#' + gridId + ' .k-grid-header').hide()
        }
        if(pdfButtonTitle) {
          $('#' + gridId + ' .k-grid-toolbar .k-grid-pdf').html('<span class="k-icon k-i-file-pdf"></span>' + pdfButtonTitle)
        }
        if(excelButtonTitle) {
          $('#' + gridId + ' .k-grid-toolbar .k-grid-excel').html('<span class="k-icon k-i-file-excel"></span>' + excelButtonTitle)
        }
        if(createButtonTitle) {
          $('#' + createButtonTitle).click(() => onCreate_Custom && onCreate_Custom())
        }
      },
      editable: editable,
      remove: (e) => {
        onDelete(e.model);
      },
      save: (e) => {
        console.log(e.model);
        console.log(e.values);
      }
    })

  }

  render() {
    const { gridId } = this.props
    return (
      <div id={gridId}></div>
    )
  }
}

export default Grid
