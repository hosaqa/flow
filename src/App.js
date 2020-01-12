import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { GridThemeProvider, BaseCSS } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { SkeletonTheme } from 'react-loading-skeleton';
import Layout from './view/Layout';

import { lightTheme, gridTheme } from './view/theme';
import { globalStyles } from './view/theme/globalStyles';

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
              <Layout />
            </GridThemeProvider>
          </SkeletonTheme>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
