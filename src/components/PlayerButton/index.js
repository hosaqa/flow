import React from 'react'
import styled from 'styled-components'

const StyledPlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  position: relative;
  padding: 0 6px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${props => props.active ? props.theme.colorAccent : props.theme.colorButtons};
  transition: color .15s, transform .15s;

  & > svg {
    font-size: ${props => props.iconSize ? props.iconSize : '24px'};
  }

  &:active {
    & > svg {
      color: ${props => props.theme.colorAccent};
    }
  }
`

export default ({children}) => <StyledPlayerButton>{children}</StyledPlayerButton>
