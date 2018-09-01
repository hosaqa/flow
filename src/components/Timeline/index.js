import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'



const colorPinkLight = 'rgba(255, 112, 112, 0.50)'
const colorPinkSoft = '#ff7070'
const colorPinkGradient = 'linear-gradient(154deg, #f90dc9, #ff1d1d)'

const TimerDisplay = styled.div`
  display: inline-block;
  width: 30px;
`

const ProgressBarWrapper = styled.div`
  width: 400px;
  height: 40px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ProgressBarBody = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${colorPinkLight};
  border-radius: 2px;
  box-shadow: ${props => (props.nowPlaying) ? '2px 2px 4px rgba(0, 0, 0, 0.15)' : '1px 1px 1px rgba(0, 0, 0, 0.1)'};
  transition: box-shadow .25s;
`

const ProgressBarMovable = styled.div`
  position: relative;
  width: ${props => props.width};
  height: 4px;
  background-image: ${colorPinkGradient};
  border-radius: 2px;
`

const ProgressBarSlider = styled.div`
  position: absolute;
  right: -4px;
  top: -4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4), -1px -1px 1px rgba(96, 96, 96, 0.25);
  transition: transform .12s;
  transform: scale(0);
 
  ${ProgressBarWrapper}:hover & {
    transform: scale(1);
  }
`

export default class Timeline extends Component {

  state = {
    usersProgress: null,
    mouseDowned: false
  }

  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  
  countDigits (number) {
    return (''+number).length
  }
  
  formateTimerValue (seconds) {
    seconds = Math.round(seconds)
  
    let minutes = 0
  
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60)
      seconds = seconds % 60
    }
  
    seconds = (this.countDigits(seconds) < 2) ? '0' + seconds : seconds
  
    return `${minutes}:${seconds}`
  }
  
  renderProgressBarSlider (currentTrackPosition, trackDuration) {
    const {minutes, seconds} = trackDuration
  
    trackDuration = minutes * 60 + seconds
    currentTrackPosition = (this.isNumeric(currentTrackPosition)) ? currentTrackPosition : 0
    const width = currentTrackPosition / trackDuration * 100
  
    return (
      <ProgressBarMovable width = {(this.state.usersProgress)? `${this.state.usersProgress}%` : `${width}%`}>
        <ProgressBarSlider />
      </ProgressBarMovable>
    )
  }

  handleOnMouseDown() {
    this.setState({mouseDowned: true})
  }

  handleOnMouseUp() {
    let trackDuration = this.props.trackDuration
    trackDuration = trackDuration.minutes * 60 + trackDuration.seconds

    this.props.onSeek(this.state.usersProgress / 100 * trackDuration)

    this.setState({
      mouseDowned: false,
      usersProgress: null
    })
  }

  handleOnMouseLeave() {
    if (this.state.mouseDowned) this.setState({mouseDowned: false})
  }  

  handleOnClick (ev, ref, trackDuration) {
    trackDuration = trackDuration.minutes * 60 + trackDuration.seconds

    const touchedPosition = this.getTouchedPosition(ev, ref)

    const rewindTo = Math.round(touchedPosition * trackDuration)
    
    this.props.onSeek(rewindTo)
  }

  handleOnMouseMove (ev, ref) {
    if (this.state.mouseDowned) {

      const touchedPosition = this.getTouchedPosition(ev, ref)
      this.setState({usersProgress: touchedPosition * 100})
    }
  }

  getTouchedPosition(ev, ref) {
    const { left, width } = findDOMNode(ref.current).getBoundingClientRect()
    return (ev.clientX - Math.round(left)) / width
  }

  render() {
    const timelineRef = React.createRef()

    let {trackDuration, nowPlaying, currentTrackPosition, onSeek} = this.props

    const progressBar = this.renderProgressBarSlider(currentTrackPosition, trackDuration)
    
    let {minutes, seconds} = trackDuration
    
    currentTrackPosition = (this.isNumeric(currentTrackPosition)) ? this.formateTimerValue(currentTrackPosition) : '0:00'
  
    if (this.countDigits(seconds) < 2) seconds = '0' + seconds
  
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <TimerDisplay>{currentTrackPosition || '0:00'}</TimerDisplay>
        <div>
          <ProgressBarWrapper 
            ref={timelineRef}
            onClick={(ev) => this.handleOnClick(ev, timelineRef, trackDuration)}
            onMouseDown={() => this.handleOnMouseDown()}
            onMouseUp={() => this.handleOnMouseUp()}
            onMouseLeave={() => this.handleOnMouseLeave()}
            onMouseMove={(ev) => this.handleOnMouseMove(ev, timelineRef)}
          >
            <ProgressBarBody nowPlaying={nowPlaying}>
              { progressBar }
            </ProgressBarBody>
          </ProgressBarWrapper>
        </div>
        <TimerDisplay>{`${minutes}:${seconds}`}</TimerDisplay>
      </div>
    )
  }
}



Timeline.propTypes = {
  trackDuration: PropTypes.shape({
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }),
  currentTrackPosition: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])
}