import React, {Component} from 'react';

class Textbox extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { value, readOnly, required } = this.props

    if(value === nextProps.value &&
       readOnly === nextProps.readOnly &&
       required === nextProps.required) {
      return false
    }
    return true
  }

  render() {
    const {
      name,
      placeholder = '',
      value = '',
      readOnly = false,
      required = false,
      extraClassName = ''
    } = this.props

    const specialProps = {
      readOnly,
      required
    }

    return (
      <input
        name={name}
        value={value}
        className={'k-textbox textbox ' + extraClassName}
        placeholder={placeholder}
        onChange={this.handleChange.bind(this)}
        {...specialProps}
      />
    )
  }

  handleChange(event) {
    const {onChange} = this.props
    onChange && onChange(event.target.value, name)
  }
}

export default Textbox
