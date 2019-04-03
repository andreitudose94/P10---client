import React, {Component} from 'react';
import styles from './index.scss'

class Modal extends React.Component {
  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  render() {
    const { children, visible = false, title = '' } = this.props
    return (
      <div id="myModal" className={"modal" + (visible ? ' visibleModal' : '')}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{title}</h2>
            <span className="close" onClick={this.onClick}>&times;</span>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    )
  }

  onClick() {
    const { onClose } = this.props
    onClose && onClose()
  }
}

export default Modal
