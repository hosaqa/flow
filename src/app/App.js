import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { GridThemeProvider, BaseCSS } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from './common/Header';
import Player from '../player/Player';
import PageContent from './common/PageContent';
import ContentPlaylist from './common/ContentPlaylist';
import { lightTheme, gridTheme } from './theme';
import { globalStyles } from './theme/globalStyles';

const App = () => {
  //ReactGA.initialize('UA-92698247-2');
  //ReactGA.pageview(window.location.pathname);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <SkeletonTheme
            color={lightTheme.palette.skeleton.primary}
            highlightColor={lightTheme.palette.skeleton.secondary}
          >
            <BaseCSS />
            <Global styles={globalStyles} />
            <GridThemeProvider gridTheme={gridTheme}>
              <>
                {/* <Header />
              <PageContent>
                <ContentPlaylist />
              </PageContent> */}

                <Player />
              </>
            </GridThemeProvider>
          </SkeletonTheme>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
