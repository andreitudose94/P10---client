import React, {Component} from 'react';

class Loader extends React.Component {

  componentDidMount() {
    const { show = false } = this.props

    if (show) {
      kendo.ui.progress($('#loader-overlay'), true);
    } else {
      kendo.ui.progress($('#loader-overlay'), false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { show = false } = nextProps

    if (show) {
      kendo.ui.progress($('#loader-overlay'), true);
    } else {
      kendo.ui.progress($('#loader-overlay'), false);
    }
  }

  shouldComponentUpdate(nextProps) {
    const { show } = this.props
    if (show === nextProps.show) {
      return false
    }

    return true
  }

  render() {
    const { show = false } = this.props
    return (
      <div className={show ? 'overlay' : ''} id='loader-overlay'></div>
    )
  }
}

export default Loader
