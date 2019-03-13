import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store/configureStore';

import Header from './Header';
import Player from './Player';
import PageContent from './PageContent';
import ContentPlaylist from './ContentPlaylist';
import { lightTheme, gridTheme, GlobalStyle } from '../theme/globalStyle';


const App = () => (
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={lightTheme}>
            <GridThemeProvider
              gridTheme={gridTheme}
            >				
            <div>
              <GlobalStyle />
              <Header />
              <PageContent>
                <ContentPlaylist />
              </PageContent>
              <Player />
            </div>
            </GridThemeProvider>
          </ThemeProvider>
          </Router>
      </Provider>
    );

export default App;
