import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import Header from './Header'
import Player from './Player'
import styled from 'styled-components'

import { lightTheme } from '../theme/globalStyle'


class App extends Component {

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <div>
        <Player playlist={this.props.data} />
        </div>

      </ThemeProvider> 
    )
  }
}

export default App
