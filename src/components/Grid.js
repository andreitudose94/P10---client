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
      rowTemplate,
      altRowTemplate,
      visibleHeader = true,
      pageable = false,
      editable = false,
      onDelete,
      onDataBound,
      onCreate_Custom,
      toolbar = [],
      pdf = {},
      excel = {},
      pdfButtonTitle,
      excelButtonTitle,
      excelButtonIcon = 'k-i-file-excel',
      createButtonTitle
    } = props

    if($("#" + gridId).data("kendoGrid")) {
      $("#" + gridId).data("kendoGrid").destroy();
    }

    let gridExtraProps = {}
    if(rowTemplate) {
      gridExtraProps.rowTemplate = rowTemplate
    }
    if(altRowTemplate) {
      gridExtraProps.altRowTemplate = altRowTemplate
    }

    $("#" + gridId).kendoGrid({
      columns: columns,
      dataSource: dataSource,
      toolbar: toolbar,
      pdf: pdf,
      excel: excel,
      pageable: pageable,
      dataBound: (e) => {
        if(!visibleHeader) {
          $('#' + gridId + ' .k-grid-header').hide()
        }
        if(pdfButtonTitle) {
          $('#' + gridId + ' .k-grid-toolbar .k-grid-pdf').html('<span class="k-icon k-i-file-pdf"></span>' + pdfButtonTitle)
        }
        if(excelButtonTitle) {
          if(excelButtonIcon.substr(0, 4) === 'k-i-') {
            $('#' + gridId + ' .k-grid-toolbar .k-grid-excel').html('<span class="k-icon ' + excelButtonIcon + '"></span>' + excelButtonTitle)
          } else if(excelButtonIcon.substr(0, 3) === 'fa-') {
            $('#' + gridId + ' .k-grid-toolbar .k-grid-excel').html('<i class="fa ' + excelButtonIcon + '" aria-hidden="true"></i>' + excelButtonTitle)
          }
        }
        if(createButtonTitle) {
          $('#' + createButtonTitle).click(() => onCreate_Custom && onCreate_Custom())
        }
        onDataBound && onDataBound(e)
      },
      editable: editable,
      remove: (e) => {
        onDelete(e.model);
      },
      save: (e) => {
        console.log(e.model);
        console.log(e.values);
      },
      ...gridExtraProps
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
