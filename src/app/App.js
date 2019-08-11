import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'styled-components';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

import Header from '../components/Header';
import Player from '../components/Player';
import PageContent from '../components/PageContent';
import ContentPlaylist from '../components/ContentPlaylist';
import { lightTheme, gridTheme } from './theme';
import { GlobalStyle } from './theme/globalStyle';

const App = () => {
  //ReactGA.initialize('UA-92698247-2');
  //ReactGA.pageview(window.location.pathname);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <GridThemeProvider gridTheme={gridTheme}>
            <>
              <GlobalStyle />
              <Header />
              <PageContent>
                <ContentPlaylist />
              </PageContent>
              <Player />
            </>
          </GridThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
