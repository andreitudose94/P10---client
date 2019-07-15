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

  componentDidMount() {
    const {
      name,
      specialKey,
      eventTriggeredWhenSpecialKeyPressed,
      autoFocus
    } = this.props

    if(specialKey) {
      $('#' + name).on('keypress',function(e) {
        if(e.which === specialKey) {
          eventTriggeredWhenSpecialKeyPressed && eventTriggeredWhenSpecialKeyPressed()
        }
      });
    }
    
    if(autoFocus) {
      $('#' + name).focus();
    }
  }

  render() {
    const {
      name,
      placeholder = '',
      value = '',
      type = 'text',
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
        id={name}
        name={name}
        value={value}
        type={type}
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
