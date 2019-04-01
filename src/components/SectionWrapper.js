import React, {Component} from 'react';

class SectionWrapper extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      title = 'Basic Section Title',
      children,
      className = ''
    } = this.props

    return (
      <div className={'col-12 section ' + className}>
        <div className='section-header'>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    )
  }
}

export default SectionWrapper
