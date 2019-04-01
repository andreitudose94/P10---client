import React, {Component} from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      name,
      enable = true,
      icon = '',
      imageUrl = '',
      onClick
    } = this.props
    const self = this

    $("#" + name).kendoButton({
      enable: enable,
      icon: icon,
      imageUrl: imageUrl,
      click: function(e) {
        // alert(e.event.target.tagName);
        onClick && onClick(name)
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { enable } = this.props

    if(enable === nextProps.enable) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    const { name, enable = true } = this.props
    $("#" + name).data("kendoButton").enable(enable);
  }

  render() {
    const { name, children, primary = false, extraClassName = '' } = this.props
    return (
      <button
        id={name}
        name={name}
        type="button"
        className={extraClassName + ' ' + (primary ? 'k-primary' : '')}
      >
        {children}
      </button>
    )
  }
}

export default Button
