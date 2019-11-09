import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import logo from './logo.svg';

const Wrapper = styled.header`
  position: relative;
  height: ${({ theme }) => theme.spacing(8)}px;
`;

const Inner = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.palette.primary.normal}, ${theme.palette.secondary})`};
  box-shadow: 0 2px 2px rgba(229, 0, 0, 0.2);
`;

const Menu = styled.nav`
  text-align: right;
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.spacing(2.25)}px;
  color: ${({ theme }) => theme.palette.white};
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing(3)}px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const RowStyled = styled(Row)`
  height: ${({ theme }) => theme.spacing(8)}px;
`;

const Header = () => (
  <Wrapper>
    <Inner>
      <Container>
        <RowStyled alignItems="center">
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
        </RowStyled>
      </Container>
    </Inner>
  </Wrapper>
);

export default Header;
