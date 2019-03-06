import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux'

import { store } from '../store/configureStore'
import Player from './Player'
import { lightTheme, gridTheme, GlobalStyle } from '../theme/globalStyle'


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
					<GridThemeProvider
						gridTheme={gridTheme}
					>				
          <div>
					  <GlobalStyle />
            <Player />
          </div>
          </GridThemeProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
