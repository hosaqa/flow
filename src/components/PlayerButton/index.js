import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const StyledPlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  position: relative;
  padding: 0 6px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${({active, theme}) => active ? theme.colorAccent : theme.colorButtons};
  transition: color .15s, transform .15s;

  & > svg {
    font-size: ${({iconSize}) => iconSize ? `${iconSize}px` : '24px'};
  }

  ${({disabled}) => !disabled && css`
    &:hover {
      color: ${({theme}) => theme.colorAccent};
    }
`} 

  ${({pseudoSelActive}) => pseudoSelActive && css`
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