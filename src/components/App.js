import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import Header from './Header'
import Player from './Player'

import { lightTheme } from '../theme/globalStyle'


class App extends Component {

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <div>
        {/* <Header /> */}
        <Player playlist={this.props.data} />
        </div>

      </ThemeProvider> 
    )
  }
}

export default App
