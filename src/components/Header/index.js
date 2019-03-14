import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-image: linear-gradient(154deg, ${({theme}) => theme.colors.headerGradientFirst}, ${({theme}) => theme.colors.headerGradientSecond}, ${({theme}) => theme.colors.headerGradientThird});
  /* background-image: linear-gradient(154deg, #ff6b6b, #ff486c, #ff1d6e); */
  box-shadow: 0 3px 2px rgba(229, 0, 0, .2);
`;

const HeaderRow = styled(Row)`
  height: 62px;
`;

const Header = () => (
  <StyledHeader>
    <Container>
      <HeaderRow alignItems="center">
        <Col col="4">
          <Link to="/">
            <img src="/img/logo.svg" alt="logo"/>
          </Link>
        </Col>
        <Col col="8">
          <Navigation />
        </Col>
      </HeaderRow>
    </Container>
  </StyledHeader>
);

export default Header;