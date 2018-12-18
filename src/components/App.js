import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import { store } from '../store/configureStore'
import Player from './Player'
import { lightTheme } from '../theme/globalStyle'


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Player playlist={this.props.data} />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
