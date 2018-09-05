import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import Player from './Player'

import { lightTheme } from '../theme/globalStyle'
import './App.css'


class App extends Component {

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Player playlist={this.props.data} />
      </ThemeProvider> 

    )
  }
}

export default App
