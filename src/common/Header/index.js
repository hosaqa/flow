import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { ButtonDefault } from '../UI/Buttons';

import logo from './logo.svg';

const Wrapper = styled.header`
  position: relative;
  height: ${({ theme }) => theme.spacing(6)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    height: ${({ theme }) => theme.spacing(8)}px;
  }
`;

const Inner = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.palette.primary.normal}, ${theme.palette.secondary})`};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.spacing(6)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    height: ${({ theme }) => theme.spacing(8)}px;
  }
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

const Logo = styled(Link)`
  display: block;
  width: ${({ theme }) => theme.spacing(10)}px;
`;

const MenuButton = styled(ButtonDefault)`
  position: relative;
  height: ${({ theme }) => theme.spacing(2.25)}px;
  width: ${({ theme }) => theme.spacing(3)}px;

  &::before,
  &::after,
  span {
    content: '';
    display: block;
    height: ${({ theme }) => theme.spacing(0.25)}px;
    width: ${({ theme }) => theme.spacing(3)}px;
    background-color: ${({ theme }) => theme.palette.white};
    position: absolute;
    left: 0;
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

const Header = () => (
  <Wrapper>
    <Inner>
      <Container>
        <Content>
          <Logo to="/">
            <img src={logo} alt="Flow Music Streaming App" />
          </Logo>
          <Menu>
            <StyledLink to="/playlist">Playlist</StyledLink>
            <StyledLink to="/about">About</StyledLink>
          </Menu>
          <MenuButton>
            <span></span>
          </MenuButton>
        </Content>
      </Container>
    </Inner>
  </Wrapper>
);

export default Header;
