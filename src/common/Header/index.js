import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import logo from './logo.svg';

const Wrapper = styled.header`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-image: linear-gradient(
    154deg,
    ${({ theme }) => theme.colors.headerGradientFirst},
    ${({ theme }) => theme.colors.headerGradientSecond},
    ${({ theme }) => theme.colors.headerGradientThird}
  );
  /* background-image: linear-gradient(154deg, #ff6b6b, #ff486c, #ff1d6e); */
  box-shadow: 0 3px 2px rgba(229, 0, 0, 0.2);
`;

const Menu = styled.nav`
  text-align: right;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  margin-right: 23px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const HeaderRow = styled(Row)`
  height: 62px;
`;

const Header = () => (
  <Wrapper>
    <Container>
      <HeaderRow alignItems="center">
        <Col col="4">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        <Col col="8">
          <Menu>
            <StyledLink to="/playlist">Playlist</StyledLink>
            <StyledLink to="/about">About</StyledLink>
          </Menu>
        </Col>
      </HeaderRow>
    </Container>
  </Wrapper>
);

export default Header;
