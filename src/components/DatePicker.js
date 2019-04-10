import React, {Component} from 'react';

class DatePicker extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      name,
      value = new Date(),
      disableDates = [],
      format = 'MM/dd/yyyy',
      max = new Date(2099, 11, 31),
      min = new Date(1900, 0, 1),
      weekNumber = false,
      start = 'month',
      onChange,
      onClose,
      onOpen
    } = this.props
    const self = this

    $("#" + name).kendoDatePicker({
      value: value,
      disableDates: disableDates,
      format: format,
      max: max,
      min: min,
      weekNumber: weekNumber,
      start: start,
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

    $("#" + name).attr('readonly', true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      name,
      value = new Date(),
      max = new Date(2099, 11, 31),
      min = new Date(1900, 0, 1),
      enable = true,
      readonly = false
    } = this.props

    if(value === nextProps.value &&
       max === nextProps.max &&
       min === nextProps.min &&
       enable === nextProps.enable &&
       readonly === nextProps.readonly) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    const {
      name,
      value = new Date(),
      max = new Date(2099, 11, 31),
      min = new Date(1900, 0, 1),
      enable = true,
      readonly = false,
    } = this.props

    $("#" + name).data("kendoDatePicker").value(value)
    $("#" + name).data("kendoDatePicker").max(max)
    $("#" + name).data("kendoDatePicker").min(min)
    $("#" + name).data("kendoDatePicker").enable(enable)
    $("#" + name).data("kendoDatePicker").readonly(readonly)

    $("#" + name).attr('readonly', true)
  }

  render() {
    const { name, required = true, placeholder = '', classDatePicker} = this.props
    const specialProps = { required }

    return (
      <input
        id={name}
        name={name}
        className={classDatePicker}
        placeholder={placeholder}
        {...specialProps}
      />
    )
  }
}

export default DatePicker
