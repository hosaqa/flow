import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import { store } from '../store/configureStore'
import Player from './Player'
import { lightTheme } from '../theme/globalStyle'
import ContentLoader from 'react-content-loader'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <div>
          <ContentLoader 
		height={80}
		width={200}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="70" y="15" rx="4" ry="4" width="117" height="63.4" /> 
		<rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" /> 
		<rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" /> 
		<rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" /> 
		<rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" /> 
		<circle cx="30" cy="30" r="30" />
	</ContentLoader>
  <Player />
          </div>
          
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
