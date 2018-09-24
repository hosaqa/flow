import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  background-image: linear-gradient(154deg, ${props => props.theme.colorGradientStart}, ${props => props.theme.colorGradientEnd});
`

const Header = () => {
  return (
    <StyledHeader/>
  )
}

export default Header