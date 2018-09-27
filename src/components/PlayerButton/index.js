import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const StyledPlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  cursor: ${({disabled}) => disabled ? 'default' : 'pointer'};
  position: relative;
  padding: 0 6px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${({active, disabled, theme}) => (
    disabled ? theme.colorButton : active ? theme.colorAccent : theme.colorButton
  )};
  transition: color .15s, transform .15s;

  & > svg {
    font-size: ${({iconSize}) => iconSize ? `${iconSize}px` : '24px'};
  }

  ${({disabled}) => !disabled && css`
    &:hover {
      color: ${({theme}) => theme.colorAccent};
    }
`} 

  ${({pseudoSelActive, disabled}) => pseudoSelActive && !disabled && css`
    &:active {
      & > svg {
        color: ${({theme}) => theme.colorAccent};
      }
    }
  `}
`

const PlayerButton = ({children, active, disabled, pseudoSelActive, iconSize, onClick}) => (
  <StyledPlayerButton
    onClick={onClick}
    iconSize={iconSize}
    active={active}
    pseudoSelActive={pseudoSelActive}
    disabled={disabled}
  >
    {children}
  </StyledPlayerButton>
)

PlayerButton.propTypes = {
  iconSize: PropTypes.number
}

export default PlayerButton