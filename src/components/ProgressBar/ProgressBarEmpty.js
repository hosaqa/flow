import React from 'react'
import styled from 'styled-components'

const StyledProgressBarEmpty = styled.div`
  height: 100%;
  width: 4px;
  margin: auto;
  border-radius: 2px;
  background-color: ${props => props.theme.colorDraggableBg};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .05);
  position: relative;
`

export default function ProgressBarEmpty(props) {
  return (
    <StyledProgressBarEmpty />
  )
}