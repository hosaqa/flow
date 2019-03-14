import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import ContentPlaylist from './ContentPlaylist';


const Wrapper = styled.div`
  margin: 100px 0 0;
`;

const Inner = styled.div`
  background-color: ${({theme}) => theme.colors.content};
  padding: 25px;
`;

const PageContent = () => (
  <Wrapper>
    <Container>
      <Inner>
        <Switch>
          <Route exact path="/" component={ContentPlaylist} />
          <Route path="/playlist" component={ContentPlaylist} />
          <Route path="/about" component={() => 2} />
        </Switch>
      </Inner>
    </Container>
  </Wrapper>
);

export default PageContent;