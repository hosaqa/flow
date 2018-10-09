import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ScrollBar from './ScrollBar'


const Viewport = styled.div`
  height: ${({viewportHeight}) => viewportHeight ? `${viewportHeight}px` : 'auto'};
  overflow: hidden;
  position: relative;
`

const ContentWrapper = styled.div`
  position: absolute;
  top: ${({contentPosition}) => contentPosition}px;
  left: 0;
  width: calc(100% - 10px);
  height: 100%;
`

const Content = styled.div`
  position: relative;
  height: ${({contentHeight}) => contentHeight ? `${contentHeight}px` : 'auto'};
`

export default class Scrollable extends Component {
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

  getContentRef = node => {
    this.content = node
  }

  getViewportHeight = () => {
    return findDOMNode(this.viewport).parentElement.clientHeight
  }

  getContentHeight = () => {
    return findDOMNode(this.content).offsetHeight
  }

  slide = (scrollOccasions) => {
    const { viewportHeight, contentHeight, contentPosition } = this.state
    const extremeLimit = scrollOccasions > 0 ? viewportHeight - contentHeight : 0

    if (scrollOccasions < 0) {
 
      if (contentPosition !== extremeLimit) {
        let scrollSteps = 10 * scrollOccasions

        if (contentPosition - scrollSteps > extremeLimit) {
          this.setState({
            contentPosition: extremeLimit
          })
        } else {
          this.setState({
            contentPosition: this.state.contentPosition - scrollSteps
          })
        }
      }
    } else {
      if (contentPosition !== extremeLimit) {
        let scrollSteps = 10 * scrollOccasions
        //console.log(contentPosition)
        if (scrollSteps - contentPosition > extremeLimit) {
          this.setState({
            contentPosition: extremeLimit
          })
        } else {
          this.setState({
            contentPosition: this.state.contentPosition - scrollSteps
          })
        }
      }
    }
  }

  handleOnWheel = (ev) => {
    const oneScrollDelta = 53
    const scrollOccasions = ev.deltaY / oneScrollDelta

    const { viewportHeight, contentHeight, contentPosition } = this.state

    this.slide(scrollOccasions)
  }

  render() {
    const { children } = this.props
    const { viewportHeight, contentHeight, contentPosition } = this.state

    return (
      <Viewport
        ref={this.getViewportRef}
        onWheel={(ev) => this.handleOnWheel(ev)}
        viewportHeight={viewportHeight}
      >
        <ContentWrapper contentPosition={contentPosition}>
          <Content
            ref={this.getContentRef}
            contentHeight={contentHeight}
          >
            { children }
          </Content>
        </ContentWrapper>
        <ScrollBar
          viewportHeight={viewportHeight}
          contentHeight={contentHeight}
          contentPosition={contentPosition}
        />
      </Viewport>
    )
  }
}

Scrollable.propTypes = {

}