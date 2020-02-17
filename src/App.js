import React from 'react';
import './App.css';
import Info from './Info.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = { number: 0, zero: false, next: 10, victory: 0 }
    this.buttonPushed = this.buttonPushed.bind(this)
    this.restart = this.restart.bind(this)
    this.url = 'https://nappulapeli-vh.herokuapp.com/points'
  }

  async componentDidMount() {
    let res = await fetch(this.url)
    let json = await res.json()
    this.setState({ next: json.nextVictory })
    
    if (window.localStorage.getItem('number') !== null) {
      let num = window.localStorage.getItem('number')
      this.setState({ number: num })
      if (num <= 0) {
        this.setState({ zero: true })
      }
    } else {
      window.localStorage.setItem('number', 20)
      this.setState({ number: 20 })
    }
  }
  
  async buttonPushed() {
    let res = await fetch(this.url, {method: 'POST'})
    let json = await res.json()

    let ep = parseInt(json.extraPoints)
    let current = parseInt(window.localStorage.getItem('number'))
    current = current - 1 + ep
    window.localStorage.setItem('number', current)
    this.setState({ number: current, next: json.nextVictory, victory: ep })
    if (current === 0) {
      this.setState({ zero: true })
    }
  }

  restart() {
    this.setState({ number: 20, zero: false })
    window.localStorage.setItem('number', 20)
  }

  render () {
    if (this.state.zero) {
      // return this if points value is 0
      return (
        <div>
          <div id="lost-container">
            <div id="lost">You Lost</div>
          </div>
          <div id="number">{this.state.number}</div>
          <div>
            <button id="button" disabled>Restart?</button>
          </div>
          <div id="yesno">
            <button onClick={this.restart}>Yes</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id="number">{this.state.number}</div>
          <div>
            <button id="button" onClick={this.buttonPushed}>Nappula</button>
          </div>
          <Info next={this.state.next} victory={this.state.victory} />
        </div>
      )
    }
  }
}

export default App;
