import React, {Component} from 'react';

class NumericTextbox extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSpin = this.onSpin.bind(this)
  }

  componentDidMount() {
    const self = this
    const { name, value = '', onFocus, onFocusOut, readOnly = false } = self.props

    $("#" + name).kendoNumericTextBox({
      value: value,
      spin: function(e) {
        const newValue = this.value();
        self.onSpin(newValue, name)
      }
    });

    $("#" + name).attr("type", "number");
    $("#" + name).attr("pattern", "[0-9]*");

    $("#" + name).data("kendoNumericTextBox").readonly(readOnly);

    $("#" + name).focus(function() {
      const value = $("#" + name).data("kendoNumericTextBox").value(value)
      onFocus && onFocus(value, name)
    })

    $("#" + name).focusout(function() {
      const value = $("#" + name).data("kendoNumericTextBox").value(value)
      onFocusOut && onFocusOut(value, name)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { value = '', readOnly } = this.props

    if(value === nextProps.value &&
       readOnly === nextProps.readOnly) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    const self = this
    const { name, value = '', readOnly = false } = this.props

    $("#" + name).data("kendoNumericTextBox").value(value)
    $("#" + name).data("kendoNumericTextBox").readonly(readOnly);
  }

  render() {
    const { name, required = true, placeholder = '' } = this.props
    const specialProps = { required }
    return (
      <input
        id={name}
        type="text"
        name={name}
        ref={(input)=> this[name] = input}
        onChange={this.handleChange}
        placeholder={placeholder}
        {...specialProps}
      />
    )
  }

  onSpin(value, name) {
    const { onChange } = this.props
    onChange && onChange(value, name)
  }

  handleChange(event) {
    const { name, onChange } = this.props
    const value = event.target.value
    onChange && onChange(value, name)
  }
}

export default NumericTextbox
