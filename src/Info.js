import React from 'react'

class Info extends React.Component {
  render () {
    if (this.props.victory !== 0) {
      return (
        <div id="info">
          <div id="next">
            Next Victory in {this.props.next} pushes.
          </div>
          <div id="victory">
            You just won {this.props.victory} points!
          </div>
        </div>
      )
    } else {
      return (
        <div id="info">
          <div id="next">
            Next Victory in {this.props.next} pushes.
          </div>
        </div>
      )
    }
  }
}

export default Info
