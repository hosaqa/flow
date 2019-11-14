import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from '@emotion/styled';
import { Container } from 'styled-bootstrap-grid';
import { ButtonDefault } from '../UI/Buttons';
import { mediaUpLG } from '../../utils/mediaQueries';

import logo from './logo.svg';

const Wrapper = styled.header`
  position: relative;
  height: ${({ theme }) => theme.spacing(6)}px;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
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
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    overflow: visible;
    text-align: right;
    position: relative;
    top: auto;
    left: auto;
    width: auto;
  }
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  transform: ${({ menuIsOpen }) =>
    menuIsOpen ? 'translateY(0)' : 'translateY(-110%)'};
  transition: ${({ theme }) => theme.transitions.default}ms;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    transition: none;
    transform: translateY(0);
  }
`;

const MenuItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.primary};

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    border-bottom: 0;
    display: inline-block;
    margin-right: ${({ theme }) => theme.spacing(3)}px;
  }

  &:last-of-type {
    ${({ theme }) => theme.mediaQueries.up('lg')} {
      margin-right: 0;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: ${({ theme }) => `${theme.spacing(1.5)}px ${theme.spacing(2)}px`};
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.background.primary};

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    display: inline-block;
    padding: 0;
    color: ${({ theme }) => theme.palette.white};
    background-color: transparent;

    font-size: ${({ theme }) => theme.spacing(2.25)}px;
    color: ${({ theme }) => theme.palette.white};
  }
`;

const Logo = styled(Link)`
  display: block;
  flex-shrink: 0;
  width: ${({ theme }) => theme.spacing(9)}px;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    width: ${({ theme }) => theme.spacing(18)}px;
  }
`;

const MenuButton = styled(ButtonDefault)`
  display: block;
  position: relative;
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
  transform: ${({ menuIsOpen }) => (menuIsOpen ? 'rotate(225deg)' : 'none')};

  &::before,
  &::after,
  span {
    content: '';
    display: block;
    height: ${({ theme }) => theme.spacing(0.25)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.white};
    position: absolute;
    left: 0;
  }

  span {
    top: 50%;
    transform: translateY(-50%);
  }

  &:before {
    top: ${({ menuIsOpen, theme }) =>
      menuIsOpen ? 'auto' : `${theme.spacing(0.5)}px`};
    transform: ${({ menuIsOpen }) => (menuIsOpen ? 'rotate(-90deg)' : 'none')};
  }

  &:after {
    bottom: ${({ menuIsOpen, theme }) =>
      menuIsOpen ? 'auto' : `${theme.spacing(0.5)}px`};
  }

  span {
    visibility: ${({ menuIsOpen }) => (menuIsOpen ? 'hidden' : 'visible')};
  }
`;

const Header = () => {
  const [menuIsOpen, setMenuVisibility] = useState(false);

  const toggleMenu = () => {
    if (!menuIsOpen) {
      enableBodyScroll();
      setMenuVisibility(true);
    } else {
      disableBodyScroll();
      setMenuVisibility(false);
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        toggleMenu();
      }}
      disabled={!menuIsOpen}
    >
      <Wrapper>
        <Inner>
          <Container>
            <Content>
              <Logo to="/">
                <img src={logo} alt="Flow Music Streaming App" />
              </Logo>
              <Menu>
                <MenuList menuIsOpen={menuIsOpen}>
                  <MenuItem>
                    <StyledLink to="/playlist">Playlist</StyledLink>
                  </MenuItem>
                  <MenuItem>
                    <StyledLink to="/about">About</StyledLink>
                  </MenuItem>
                </MenuList>
              </Menu>
              {!mediaUpLG() && (
                <MenuButton menuIsOpen={menuIsOpen} onClick={toggleMenu}>
                  <span></span>
                </MenuButton>
              )}
            </Content>
          </Container>
        </Inner>
      </Wrapper>
    </OutsideClickHandler>
  );
};

export default Header;
