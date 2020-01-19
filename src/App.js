import React from 'react';
//import ReactGA from 'react-ga';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { GridThemeProvider, BaseCSS } from 'styled-bootstrap-grid';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { store, persistor, history } from './store';
import { SkeletonTheme } from 'react-loading-skeleton';
import Layout from './view/Layout';
import NotificationsProvider from './view/components/Notifications/NotificationsProvider';

import { lightTheme, gridTheme } from './view/theme';
import { globalStyles } from './view/theme/globalStyles';

const App = () => {
  //ReactGA.initialize('UA-92698247-2');
  //ReactGA.pageview(window.location.pathname);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={lightTheme}>
            <SkeletonTheme
              color={lightTheme.palette.skeleton.primary}
              highlightColor={lightTheme.palette.skeleton.secondary}
            >
              <BaseCSS />
              <Global styles={globalStyles} />
              <GridThemeProvider gridTheme={gridTheme}>
                <NotificationsProvider>
                  <Layout />
                </NotificationsProvider>
              </GridThemeProvider>
            </SkeletonTheme>
          </ThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
