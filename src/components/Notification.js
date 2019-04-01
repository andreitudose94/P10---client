import React, {Component} from 'react';

class Notification extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      name,
      message = ''
    } = this.props

    $("#" + name).kendoNotification({
      position: {
        top: 20
      },
      animation: {
        open: {
          effects: "slideIn:left"
        },
        close: {
          effects: "slideIn:left",
          reverse: true
        }
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      refresh = false
    } = this.props

    const nextRefresh = nextProps.refresh || false

    if(refresh === nextRefresh) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    const {
      name,
      message = '',
      type = 'info'
    } = this.props

    $("#" + name).getKendoNotification().show(message, type);
  }

  render() {
    const { name } = this.props
    return (
      <span id={name}></span>
    )
  }
}

export default Notification
