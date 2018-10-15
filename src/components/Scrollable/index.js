import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import raf from 'raf' // requestAnimationFrame polyfill

import ScrollBar from './ScrollBar'
import throttle from 'lodash'


const Viewport = styled.div`
  height: ${({viewportHeight}) => viewportHeight ? `${viewportHeight}px` : 'auto'};
  overflow: hidden;
  position: relative;
`

const ContentWrapper = styled.div`
  position: absolute;
  /* top: ${({contentPosition}) => contentPosition}px; */
  transform: translateY(${({contentPosition}) => contentPosition}px);
  left: 0;
  width: calc(100% - 10px);
  height: 100%;
`

const Content = styled.div`
  position: relative;
  height: ${({contentHeight}) => contentHeight ? `${contentHeight}px` : 'auto'};
`

export default class Scrollable extends Component {
  constructor(props){
    super(props)
    this.teste = throttle(1000, this.teste)
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
 
    const scrollSteps = scrollOccasions

    const extremeLimit = scrollOccasions > 0 ? viewportHeight - contentHeight : 0

    const toExtremeLimitRewindCondition = scrollOccasions > 0 ? (contentPosition - scrollSteps < extremeLimit) : (contentPosition - scrollSteps > extremeLimit)

    if (contentPosition !== extremeLimit) {
      let to = toExtremeLimitRewindCondition ? extremeLimit : this.state.contentPosition - scrollSteps

      this._raf = raf((timestamp) => {
        this.setState({
          starttime: timestamp
        })
        const  b = Math.abs(to - contentPosition) / 53 * 200
        const dur = parseFloat(b.toFixed(0))
        this.animMove(timestamp, contentPosition, to, dur)
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

  move = (to) => {
    this.setState({
      contentPosition: to
    })
  }

  clearRAF = () => {
    raf.cancel(this._raf)
  }

  handleOnWheel = (ev) => {
    console.log(1)
    const { viewportHeight, contentHeight, contentPosition } = this.state

    this.clearRAF()

    const scrollOccasions = ev.deltaY

    this.slide(scrollOccasions)
  }

  thrro = (ev) => {
    throttle(this.handleOnWheel(ev), 1000)
  }

  teste = () => {
    console.log(111)
  }

  render() {
    const { children } = this.props
    const { viewportHeight, contentHeight, contentPosition } = this.state
    console.log(this.teste)
    return (
      <Viewport
        ref={this.getViewportRef}
        onWheel={this.teste}
        // onWheel={throttle(()=>console.log(555), 1000)}
        // onWheel={(ev) => throttle(this.handleOnWheel(ev), 1000)}
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
