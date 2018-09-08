import React from 'react'
import styled from 'styled-components'

const StyledProgressBarThumb = styled.div`
  position: absolute;
  right: -2px;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4), -1px -1px 1px rgba(96, 96, 96, 0.25);
  transition: transform .12s;
`

export default function ProgressBarThumb(props) {
  return (
    <StyledProgressBarThumb />
  )
}