import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: #d0d0d0;
  box-shadow: -1px 0 1px rgba(0, 0, 0, .05);
  border-radius: 5px;
`

const Track = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: ${({trackHeight}) => trackHeight}px;
  width: 100%;
`

const Thumb = styled.div`
  position: absolute;
  right: 0;
  top: ${({sliderPosition}) => sliderPosition}%;
  height: ${({sliderHeight}) => sliderHeight}px;
  width: 100%;
  background-color: #ff7777;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
  border-radius: 5px;
`


export default class ScrollBar extends Component {
  state = {
    sliderHeight: null
  }

  getSliderRef = node => {
    this.slider = node
  }

  getSliderHeight = () => {
    const { viewportHeight, contentHeight } = this.props
    return Math.round(viewportHeight / contentHeight * viewportHeight)
  }
  
  getSliderPosition = () => {
    const { viewportHeight, contentHeight, contentPosition } = this.props

    return ((Math.abs(contentPosition))) / (viewportHeight) * 100
  }

  render() {
    const { viewportHeight, contentHeight, contentPosition } = this.props

    return (
      <Wrapper>
        <Track
          trackHeight={viewportHeight - this.getSliderHeight()}
        >
          <Thumb
            sliderHeight={this.getSliderHeight()}
            sliderPosition={this.getSliderPosition()}
          />
        </Track>
      </Wrapper>
    )
  }
}

ScrollBar.propTypes = {
  viewportHeight: PropTypes.number, 
  contentHeight: PropTypes.number,
  contentPosition: PropTypes.number
}