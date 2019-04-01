import React, {Component} from 'react';

class Tooltip extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      name,
      autoHide = true,
      content = '',
      displayArrow = true,
      width = 'Infinity',
      height = 'Infinity',
      position = 'bottom',
      showOn = 'mouseenter'
    } = this.props
    const self = this

    $("#" + name).kendoTooltip({
      autoHide: autoHide,
      content: content,
      callout: displayArrow,
      width: width,
      height: height,
      position: position,
      showOn: showOn
    });
  }

  render() {
    const { name, children } = this.props
    return (
      <span id={name}>
        {children}
      </span>
    )
  }
}

export default Tooltip
