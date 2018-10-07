import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

const SliderLine = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: #d0d0d0;
  box-shadow: -1px 0 1px rgba(0, 0, 0, .05);
  border-radius: 5px;
`

const Slider = styled.div`
  position: absolute;
  right: 0;
  top: ${({sliderPosition}) => sliderPosition}%;
  /* transition: .2s all ease-in-out; */
  height: 20px;
  width: 100%;
  background-color: #ff7777;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
  border-radius: 5px;
`

const Test = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 20px);
`

export default class DraggableSlider extends Component {
  state = {
    sliderHeight: null
  }

  componentDidMount() {
    this.setState({
      sliderHeight: this.getSliderHeight()
    })
  }

  getSliderRef = node => {
    this.slider = node
  }

  getSliderHeight = () => {
    return findDOMNode(this.slider).offsetHeight
  }
  
  getSliderPosition = () => {
    const { contentHeight, contentPosition, viewportHeight } = this.props

    return ((Math.abs(contentPosition))) / (viewportHeight) * 100
  }

  render() {
    const { contentHeight, contentPosition } = this.props

    return (
      <SliderLine>
        <Test>
        <Slider
          ref={this.getSliderRef}
          sliderPosition={this.getSliderPosition()}
        />
        </Test>

      </SliderLine>
    )
  }
}

// DraggableSlider.propTypes = {
//   viewportHeight: PropTypes.number.isRequired, 
//   contentHeight: PropTypes.number.isRequired,
//   contentPosition: PropTypes.number.isRequired
// }

DraggableSlider.propTypes = {
  viewportHeight: PropTypes.number, 
  contentHeight: PropTypes.number,
  contentPosition: PropTypes.number
}