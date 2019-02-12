import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux'

import { store } from '../store/configureStore'
import Player from './Player'
import { lightTheme, gridTheme, GlobalStyle } from '../theme/globalStyle'
import ContentLoader from 'react-content-loader'
import Drag from './Drag'

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
          <div style={{width: '300px', padding: '30px'}}>
            <Drag
        thumbShowOnHover={false}
        thumbRadius={6}
        axis={'x'}
            />

          </div>
          <ContentLoader 
		height={80}
		width={200}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="70" y="15" width="37" height="37" /> 
	</ContentLoader>
  <Player />
          </div>
          </GridThemeProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
