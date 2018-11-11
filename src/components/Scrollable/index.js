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
  transform: translateY(${({contentPosition}) => contentPosition}px);
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
  constructor(props){
    super(props)
  }

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

  componentWillUnmount() {
    //this.clearRAF()
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
 
    const scrollSteps = scrollOccasions

    const extremeLimit = scrollOccasions > 0 ? viewportHeight - contentHeight : 0

    const toExtremeLimitRewindCondition = scrollOccasions > 0 ? (contentPosition - scrollSteps < extremeLimit) : (contentPosition - scrollSteps > extremeLimit)

    if (contentPosition !== extremeLimit) {
      let to = toExtremeLimitRewindCondition ? extremeLimit : this.state.contentPosition - scrollSteps

      // this.setState({
      //   contentPosition: to
      // })
      this._raf = raf((timestamp) => {
        this.setState({
          starttime: timestamp
        })
        const duration = parseFloat((Math.abs(to - contentPosition) / 53 * 350).toFixed(0))
        this.animMove(timestamp, contentPosition, to, duration)
      })
    }
  }

  animMove = (timestamp, from, to, duration) => {
    timestamp = timestamp || new Date().getTime()
    
    const runtime = timestamp - this.state.starttime
    
    let progress = runtime / duration
    progress = Math.min(progress, 1)

    const intermediate = (to - from) * progress

    this.setState({
      contentPosition: from + parseFloat((intermediate * progress).toFixed(2))
    })

    if (runtime < duration) {
      raf((timestamp) => {
        this.animMove(timestamp, from, to, duration)
      })
    }
  }

  clearRAF = () => {
    console.log('clear raf')
    raf.cancel(this._raf)
  }

  handleOnWheel = (ev) => {
    this.clearRAF()
    const scrollOccasions = ev.deltaY

    this.slide(scrollOccasions)
  }

  render() {
    console.log(1)
    const { children } = this.props
    const { viewportHeight, contentHeight, contentPosition } = this.state

    return (
      <Viewport
        ref={this.getViewportRef}
        onWheel={this.handleOnWheel}
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
  children: PropTypes.element.isRequired
}