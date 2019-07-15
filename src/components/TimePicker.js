import React, {Component} from 'react';

class TimePicker extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      name,
      value = null,
      interval = 30,
      format = "HH:mm",
      min = '00:00',
      max = '00:00',
      enable = true,
      readonly = false,
      dates = [],
      onChange,
      onClose,
      onOpen
    } = this.props
    const self = this

    $("#" + name).kendoTimePicker({
      value: value,
      format: format,
      interval: interval,
      format: format,
      min: min,
      max: max,
      dates: dates,
      change: function() {
        const newValue = this.value();
        onChange && onChange(newValue, name)
      },
      close: function(e) {
        onClose && onClose(name)
      },
      open: function(e) {
        onOpen && onOpen(name)
      }
    });

    $("#" + name).data("kendoTimePicker").enable(enable)
    $("#" + name).data("kendoTimePicker").readonly(readonly)
    
    $("#" + name).attr('readonly', true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      name,
      value,
      interval,
      format,
      min,
      max,
      enable,
      readonly,
      dates
    } = this.props

    if(value === nextProps.value &&
       interval === nextProps.interval &&
       format === nextProps.format &&
       max === nextProps.max &&
       min === nextProps.min &&
       enable === nextProps.enable &&
       readonly === nextProps.readonly &&
       this.equalArrays(dates, nextProps.dates)
     ) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    const {
      name,
      value = null,
      min = '00:00',
      max = '00:00',
      enable = true,
      readonly = false
    } = this.props

    $("#" + name).data("kendoTimePicker").value(value)
    $("#" + name).data("kendoTimePicker").max(max)
    $("#" + name).data("kendoTimePicker").min(min)
    $("#" + name).data("kendoTimePicker").enable(enable)
    $("#" + name).data("kendoTimePicker").readonly(readonly)
  }

  equalArrays(a, b) {
    // if their length isn't the same => they are not equal
    if(!a && !b) {
      return true
    }

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
    const { name, required = true, placeholder = '', classTimePicker} = this.props
    const specialProps = { required }

    return (
      <input
        id={name}
        name={name}
        className={classTimePicker}
        placeholder={placeholder}
        {...specialProps}
      />
    )
  }
}

export default TimePicker
