import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  height: ${({thumbHeight}) => thumbHeight}px;
  width: 100%;
  background-color: #ff7777;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
  border-radius: 5px;
`

export default class ScrollBar extends Component {
  state = {
    thumbHeight: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.viewportHeight !== this.props.viewportHeight) {
      this.setState({
        thumbHeight: this.getThumbHeight()
      })
    }
  }

  getThumbHeight = () => {
    const { viewportHeight, contentHeight } = this.props

    return Math.round(viewportHeight / contentHeight * viewportHeight)
  }
  
  getThumbPosition = () => {
    const { viewportHeight, contentPosition, contentHeight } = this.props

    return (Math.abs(contentPosition) / (contentHeight - viewportHeight) * 100).toFixed(2)
  }

  render() {
    const { viewportHeight } = this.props
    const { thumbHeight } = this.state

    return (
      <Wrapper>
        <Track
          trackHeight={viewportHeight - thumbHeight}
        >
          <Thumb
            thumbHeight={thumbHeight}
            sliderPosition={this.getThumbPosition()}
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