import React, { Component } from 'react'
import './App.css'

import Player from './Player'

class App extends Component {

  render() {
    return (
      <div>
        <Player playlist = {this.props.data} />
      </div> 

    )
  }
}

export default App;
