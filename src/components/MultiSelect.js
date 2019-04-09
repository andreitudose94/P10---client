import React, {Component} from 'react';

class MultiSelect extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {
      name,
      dataSource = [],
      dataTextField,
      dataValueField,
      enable = true,
      value = [],
      filter = 'none',
      maxSelectedItems = null,
      minLength = 1,
      ignoreCase = true,
      height = 200,
      enforceMinLength = false,
      clearButton = true,
      autoWidth = false,
      placeholder = '',
      onOpen,
      onClose,
      onFocus,
      onFocusOut,
      onRemove,
      onSelect,
      onDeselect
    } = this.props
    const self = this

    let msExtraProps = {}
    if(dataTextField) {
      msExtraProps.dataTextField = dataTextField
    }
    if(dataValueField) {
      msExtraProps.dataValueField = dataValueField
    }

    $("#" + name).kendoMultiSelect({
      dataSource: dataSource,
      enable: enable,
      value: value,
      filter: filter,
      maxSelectedItems: maxSelectedItems,
      ignoreCase: ignoreCase,
      height: height,
      enforceMinLength: enforceMinLength,
      clearButton: clearButton,
      autoWidth: autoWidth,
      placeholder: placeholder,
      open: function(e) {
        onOpen && onOpen(name)
      },
      close: function(e) {
        onClose && onClose()
      },
      select: function(e) {
        const selected = e.dataItem;
        onSelect && onSelect(e, selected, name)
      },
      deselect: function(e) {
        const selected = e.dataItem;
        onDeselect && onDeselect(e, selected, name)
        onRemove && onRemove()
      },
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
        self.handleChange(value, name)
      },
      dataBound: function(e) {
        const multiselect = $("#" + name).data("kendoMultiSelect");
        const input = multiselect.input;
        $(input).attr('readonly', 'readonly')
      },
      ...msExtraProps
    })

    $("#" + name).focus(function() {
      onFocus(name)
    })

    $("#" + name).focusout(function() {
      onFocusOut(name)
    })

  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      name,
      value = [],
      enable = true,
      dataSource = []
    } = this.props

    if(name === nextProps.name &&
       this.equalArrays(value, nextProps.value) &&
       enable === nextProps.enable &&
       this.equalArrays(dataSource, nextProps.dataSource)) {
      return false
    }
    return true
  }

  equalArrays(a = [], b = []) {
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
    const {
      name,
      value = [],
      enable = true,
      dataSource = []
    } = this.props

    $("#" + name).data("kendoMultiSelect").value(value)
    $("#" + name).data("kendoMultiSelect").enable(enable)
    $("#" + name).data("kendoMultiSelect").setDataSource(dataSource)
  }

  render() {
    const { name, required } = this.props
    const specialProps = { required }
    return (
      <select
        id={name}
        name={name}
        multiple="multiple"
        {...specialProps}
      ></select>
    )
  }

  handleChange(value = [], name = '') {
    const { onChange } = this.props
    onChange && onChange(value, name)
  }
}

export default MultiSelect
