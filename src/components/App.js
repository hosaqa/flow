import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'styled-components';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/configureStore';

import Draggable from './Draggable';
import Header from './Header';
import Player from './Player';
import PageContent from './PageContent';
import ContentPlaylist from './ContentPlaylist';
import { lightTheme, gridTheme, GlobalStyle } from '../theme/globalStyle';

const App = () => {
  ReactGA.initialize('UA-92698247-2');
  ReactGA.pageview(window.location.pathname);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <GridThemeProvider
            gridTheme={gridTheme}
          >				
          <div>
            <GlobalStyle />
            <Header />
            {/* <div style={{margin: '100px'}}>
            <Draggable startPosition={{x: 20, y: 20}}>
              <div style={{height: '50px', width: '50px', background: 'red'}} />
            </Draggable>
            </div> */}
            <PageContent>
              <ContentPlaylist />
            </PageContent>
            <Player />
          </div>
          </GridThemeProvider>
        </ThemeProvider>
        </BrowserRouter>
    </Provider>
    
  );
};

export default App;
