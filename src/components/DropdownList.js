import React, {Component} from 'react';

class DropdownList extends React.Component {

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
      value = '',
      filter = 'none',
      searchPlaceholder = '',
      optionLabel,
      template,
      headerTemplate,
      useSelect = false
    } = this.props
    const self = this

    let firstTime = true

    let ddExtraProps = {}
    if(dataTextField) {
      ddExtraProps.dataTextField = dataTextField
    }
    if(dataValueField) {
      ddExtraProps.dataValueField = dataValueField
    }
    if(optionLabel) {
      ddExtraProps.optionLabel = optionLabel
    }
    if(template) {
      ddExtraProps.template = template
    }
    if(headerTemplate) {
      ddExtraProps.headerTemplate = headerTemplate
    }

    $("#" + name).kendoDropDownList({
      dataSource: dataSource,
      enable: enable,
      value: value,
      filter: filter,
      select: function(e) {
        // triggered anytime the dropdown selected value is being changed
        // similar to onChange event but also works when the value is being selected programatically
        const item = e.item;
        const dataSourceNow = self.props.dataSource
        const value = dataSourceNow[item.index()][dataValueField];
        useSelect && self.handleChange(value, name)
      },
      cascade: function() {
        // triggered anytime the dropdown selected value is being changed
        // similar to onChange event but also works when the value is being selected programatically
        const newValue = this.value()
        !useSelect && !firstTime && self.handleChange(newValue, name)
        firstTime = false
      },
      open: function(e) {
        if(filter !== 'none') {
          $('.k-list-filter > .k-textbox').attr('placeholder', searchPlaceholder)
        }
      },
      close: function(e) {
        if(filter !== 'none') {
          $('.k-list-filter > .k-textbox').attr('placeholder', '')
        }
      },
      dataBound: function(e) {
        if(!enable) {
          $("#" + name).closest('.k-dropdown').addClass('readonlyField');
        }
      },
      ...ddExtraProps
    })

  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      name,
      value = '',
      enable,
      dataSource
    } = this.props

    if(name === nextProps.name && value === nextProps.value &&
       enable === nextProps.enable &&
       this.equalArrays(dataSource, nextProps.dataSource)) {
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
    const {
      name,
      value = '',
      enable = true,
      dataSource = [],
      extraClassName,
    } = this.props

    $("#" + name).data("kendoDropDownList").setDataSource(dataSource)
    $("#" + name).data("kendoDropDownList").value(value)
    $("#" + name).data("kendoDropDownList").enable(enable)
    if(!enable) {
      $("#" + name).closest('.k-dropdown').addClass('readonlyField');
    } else {
      $("#" + name).closest('.k-dropdown').removeClass('readonlyField');
    }
  }

  render() {
    const {
      name,
      required = true,
      extraClassName = ''
    } = this.props
    const specialProps = { required }
    return (
      <input
        id={name}
        name={name}
        className={'k-input ' + extraClassName}
        {...specialProps}
      />
    )
  }

  handleChange(value, name) {
    const { onChange } = this.props
    onChange && onChange(value, name)
  }
}

export default DropdownList
