import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import raf from 'raf' // requestAnimationFrame polyfill

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
    mouseButtonPressed: false,
    animateTimeout: null,
    animTime: null,
  }

  componentDidMount() {
    this.setState({
      contentHeight: this.getContentHeight(),
      viewportHeight: this.getViewportHeight()
    })
  }

  componentWillUnmount() {
    this.clearRAF()
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
    const scrollSteps = 10 * scrollOccasions

    const extremeLimit = scrollOccasions > 0 ? viewportHeight - contentHeight : 0

    const toExtremeLimitRewindContidion = scrollOccasions > 0 ? (contentPosition - scrollSteps < extremeLimit) : (contentPosition - scrollSteps > extremeLimit)

    if (contentPosition !== extremeLimit) {
      let to = toExtremeLimitRewindContidion ? extremeLimit : this.state.contentPosition - scrollSteps
      this.smoothSlide(to)
    }
  }

  debounce = (fn, delay) => {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }
  smoothSlide = (to) => {
    console.log(to)
    this.clearRAF()

    const { contentPosition } = this.state
    const gap = contentPosition > to ? 1 : -1

    this.setState({
      contentPosition: contentPosition - gap
    })

    if (contentPosition !== to) {
      this._raf = raf(() => this.smoothSlide(to))
    } else {
      this.clearRAF()
    }
  }

  clearRAF = () => {
    raf.cancel(this._raf)
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
        onWheel={(ev) => this.debounce(this.handleOnWheel(ev), 100)}
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
