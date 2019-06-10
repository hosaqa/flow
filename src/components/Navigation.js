import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
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

const Navigation = () => (
    <Wrapper>
      <StyledLink to="/playlist">Playlist</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Wrapper>
  );


export default Navigation;

