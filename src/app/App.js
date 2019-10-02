import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { GridThemeProvider, BaseCSS } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

import Header from './common/Header';
import Player from '../player/Player';
import PageContent from './common/PageContent';
import ContentPlaylist from './common/ContentPlaylist';
import { lightTheme, gridTheme } from './theme';
import { globalStyles } from './theme/globalStyles';
import Drag from './common/UI/Drag';

const App = () => {
  //ReactGA.initialize('UA-92698247-2');
  //ReactGA.pageview(window.location.pathname);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <BaseCSS />
          <Global styles={globalStyles} />
          <GridThemeProvider gridTheme={gridTheme}>
            <>
              <div style={{ padding: '50px' }}>
                <Drag>
                  <div
                    style={{ height: '50px', width: '50px', background: 'red' }}
                  ></div>
                </Drag>

                <div
                  style={{
                    margin: '20px 0 0',
                    width: '500px',
                    height: '100px',
                  }}
                ></div>
              </div>

              {/* <Header />
              <PageContent>
                <ContentPlaylist />
              </PageContent> */}
              <Player />
            </>
          </GridThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
