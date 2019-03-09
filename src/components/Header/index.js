import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 62px;
  /* background-image: linear-gradient(154deg, ${props => props.theme.colorGradientStart}, ${props => props.theme.colorGradientEnd}); */
  background-image: linear-gradient(154deg, #ff6b6b, #ff486c, #ff1d6e);
  box-shadow: 0 3px 2px rgba(229, 0, 0, .2);
`;

const Header = () => (
  <StyledHeader>
    1
  </StyledHeader>
);

export default Header;