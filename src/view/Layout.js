import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'styled-bootstrap-grid';
import styled from '@emotion/styled';
import Header from './components/Header';
import Player from './components/Player';
import PageAbout from './pages/About';
import PlaylistPage from './pages/PlaylistPage';
import GenresListPage from './pages/GenresList';

const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px 0 0;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    margin: ${({ theme }) => theme.spacing(8)}px 0 0;
  }
`;

const Inner = styled.div`
  background-color: ${({ theme }) => theme.palette.background.primary};
  padding: ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    padding: ${({ theme }) => theme.spacing(3.5)}px;
  }
`;

const Layout = () => (
  <>
    <Header />
    <Wrapper>
      <Container>
        <Inner>
          <Switch>
            <Route path="/" exact component={GenresListPage} />
            <Route path="/genres" component={GenresListPage} />
            <Route path="/playlist/:type/:id" component={PlaylistPage} />
            <Route path="/about" component={PageAbout} />
          </Switch>
        </Inner>
      </Container>
    </Wrapper>
    <Player />
  </>
);

export default Layout;
