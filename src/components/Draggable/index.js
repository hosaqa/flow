import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DraggableSlider from './DraggableSlider'


const StyledDraggable = styled.div`
  display: block;
`

const DraggableViewport = styled.div`
  height: ${({viewportHeight}) => viewportHeight ? `${viewportHeight}px` : 'auto'};
  overflow: hidden;
  position: relative;
`

const DraggableContentWrapper = styled.div`
  position: absolute;
  top: ${({contentPosition}) => contentPosition}px;
  left: 0;
  width: calc(100% - 10px);
  height: 100%;
`

const DraggableContent = styled.div`
  position: relative;
  height: ${({contentHeight}) => contentHeight ? `${contentHeight}px` : 'auto'};
`

export default class Draggable extends Component {
  state = {
    viewportHeight: null,
    contentHeight: null,
    contentPosition: 0,
    mouseButtonPressed: false
  }

  componentDidMount() {
    this.setState({
      contentHeight: this.getContentHeight(),
      viewportHeight: this.getViewportHeight()
    })
  }

  getViewportRef = node => {
    this.viewport = node
  }

  getContentRef = node => {
    this.content = node
  }

  getViewportHeight = () => {
    console.log(findDOMNode(this.viewport).parentElement.offsetHeight)
    return findDOMNode(this.viewport).parentElement.clientHeight
  }

  getContentHeight = () => {
    return findDOMNode(this.content).offsetHeight
  }

  handleOnWheel = (ev) => {
    const oneScrollDelta = 53
    const scrollOccasions = ev.deltaY / oneScrollDelta

    const { viewportHeight, contentHeight, contentPosition } = this.state

    if (scrollOccasions < 0) {
      if (contentPosition !== 0) {
        this.setState({
          contentPosition: this.state.contentPosition + 20
        })
      }
    } else {
      if (Math.abs(contentPosition) <= contentHeight - viewportHeight) {
        this.setState({
          contentPosition: this.state.contentPosition - 20
        })
      }
    }
  }

  render() {
    const { children } = this.props
    const { viewportHeight, contentHeight, contentPosition } = this.state

    return (
      <DraggableViewport
        ref={this.getViewportRef}
        onWheel={(ev) => this.handleOnWheel(ev)}
        viewportHeight={viewportHeight}
      >
        <DraggableContentWrapper contentPosition={contentPosition}>
          <DraggableContent
            ref={this.getContentRef}
            contentHeight={contentHeight}
          >
            { children }
          </DraggableContent>
        </DraggableContentWrapper>
        <DraggableSlider
          viewportHeight={viewportHeight}
          contentHeight={contentHeight}
          contentPosition={contentPosition}
        />
      </DraggableViewport>
    )
  }
}

Draggable.propTypes = {

}