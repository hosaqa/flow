import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'styled-bootstrap-grid';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import PageAbout from './pages/About';
import Artist from './pages/Artist';

const Wrapper = styled.div`
  margin: 100px 0;
`;

const Inner = styled.div`
  background-color: ${({ theme }) => theme.palette.background.primary};
  padding: 25px;
`;

const Layout = () => (
  <Wrapper>
    <Container>
      <Inner>
        <Switch>
          <Route exact path="/" component={Artist} />
          <Route path="/about" component={PageAbout} />
        </Switch>
      </Inner>
    </Container>
  </Wrapper>
);

export default Layout;
