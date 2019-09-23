import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'styled-bootstrap-grid';
import styled from '@emotion/styled';
import ContentPlaylist from './ContentPlaylist';
import PageAbout from './StaticPage/PageAbout';

const Wrapper = styled.div`
  margin: 100px 0;
`;

const Inner = styled.div`
  background-color: ${({ theme }) => theme.colors.content};
  padding: 25px;
`;

const PageContent = () => (
  <Wrapper>
    <Container>
      <Inner>
        <Switch>
          <Route exact path="/" component={ContentPlaylist} />
          <Route path="/playlist" component={ContentPlaylist} />
          <Route path="/about" component={PageAbout} />
        </Switch>
      </Inner>
    </Container>
  </Wrapper>
);

export default PageContent;
