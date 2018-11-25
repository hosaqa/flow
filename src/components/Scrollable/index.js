import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Motion, spring} from 'react-motion'

import ScrollBar from './ScrollBar'


const Viewport = styled.div`
  height: ${({viewportHeight}) => viewportHeight ? `${viewportHeight}px` : 'auto'};
  overflow: hidden;
  position: relative;
`

const ContentWrapper = styled.div`
  position: absolute;
  transform: translate3d(0, ${({contentPosition}) => contentPosition}px, 0);
  top: 0;
  left: 0;
  width: calc(100% - 10px);
  height: 100%;

  &:hover {
    will-change: transform;
  }
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
    mouseButtonPressed: false,
    starttime: null
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
    return findDOMNode(this.viewport).parentElement.clientHeight
  }

  getContentHeight = () => {
    return findDOMNode(this.content).offsetHeight
  }

  scrollTo = (to) => {
    const { viewportHeight, contentHeight, contentPosition } = this.state

    const delta = to - contentPosition
 
    const extremeLimit = delta > 0 ? viewportHeight - contentHeight : 0

    const toExtremeLimitRewindCondition = delta > 0 ? (contentPosition - delta < extremeLimit) : (contentPosition - delta > extremeLimit)

    if (contentPosition !== extremeLimit) {
      let to = toExtremeLimitRewindCondition ? extremeLimit : this.state.contentPosition - delta

      this.setState({
        contentPosition: to
      })
    }
  }

  handleOnWheel = (ev) => {
    this.scrollTo(this.state.contentPosition + ev.deltaY)
  }

  render() {
    const { children } = this.props
    const { viewportHeight, contentHeight, contentPosition } = this.state

    return (
      <Viewport
        ref={this.getViewportRef}
        onWheel={this.handleOnWheel}
        viewportHeight={viewportHeight}
      >
        <Motion
          defaultStyle={{ top: 0 }}
          style={{ top: spring(contentPosition) }}
        >
          {interpolatedStyle => (
            <ContentWrapper contentPosition={interpolatedStyle.top}>
              <Content
                ref={this.getContentRef}
                contentHeight={contentHeight}
              >
                { children }
              </Content>
            </ContentWrapper>
          )}
        </Motion>
        <ScrollBar
          viewportHeight={viewportHeight}
          contentHeight={contentHeight}
          contentPosition={contentPosition}
          scrollTo={this.scrollTo}
        />
      </Viewport>
    )
  }
}

Scrollable.propTypes = {
  children: PropTypes.element.isRequired
}