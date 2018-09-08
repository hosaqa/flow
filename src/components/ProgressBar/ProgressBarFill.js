import React from 'react'
import styled from 'styled-components'

const StyledProgressBarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height};
  background-image: linear-gradient(154deg, ${props => props.theme.colorGradientStart}, ${props => props.theme.colorGradientEnd});
  border-radius: 2px;
  transition: height .12s;
`

export default function ProgressBarFill(props) {
  return (
    <StyledProgressBarFill />
  )
}