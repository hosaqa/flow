import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'



const colorPinkLight = 'rgba(255, 112, 112, 0.50)'
const colorPinkSoft = '#ff7070'
const colorPinkGradient = 'linear-gradient(154deg, #f90dc9, #ff1d1d)'

const TimeLineWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TimerDisplay = styled.div`
  display: inline-block;
  width: 30px;
`

const ProgressBarWrapper = styled.div`
  padding: 0 12px;
`

const ProgressBarBody = styled.div`
  width: 400px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ProgressBarLine = styled.div`
  position: relative;
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
 
  ${ProgressBarBody}:hover & {
    transform: scale(1);
  }
`

export default class Timeline extends Component {
  static propTypes = {
    trackDuration: PropTypes.shape({
      minutes: PropTypes.number,
      seconds: PropTypes.number
    }),
    currentTrackPosition: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    seek: PropTypes.func
  }


  state = {
    trackDurationInSeconds: null,
    dummyLineProgress: null,
    dummyTime: null,
    mouseDowned: false
  }

  componentWillMount() {
    this.setState({
      trackDurationInSeconds: this.convertDurationToSecond(this.props.trackDuration)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      trackDurationInSeconds: this.convertDurationToSecond(nextProps.trackDuration)
    })
  }

  convertDurationToSecond(trackDuration) {
    const { minutes, seconds }= trackDuration
    return minutes * 60 + seconds
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
      <ProgressBarMovable width = {(this.state.dummyLineProgress)? `${this.state.dummyLineProgress}%` : `${width}%`}>
        <ProgressBarSlider />
      </ProgressBarMovable>
    )
  }

  getTouchedPosition(ev, ref) {
    const { left, width } = findDOMNode(ref.current).getBoundingClientRect()
    return (ev.clientX - Math.round(left)) / width
  }

  onMouseUpRewind() {
    let trackDuration = this.state.trackDurationInSeconds

    this.props.seek(this.state.dummyLineProgress / 100 * trackDuration)

    this.setState({
      mouseDowned: false,
      dummyLineProgress: null,
      dummyTime: null
    })
  }

  handleOnMouseDown() {
    this.setState({mouseDowned: true})
  }

  handleOnMouseUp() {
    this.onMouseUpRewind()
  }

  handleOnMouseLeave() {  
    if (this.state.mouseDowned && this.state.dummyLineProgress) {
      this.onMouseUpRewind()
    }
  }

  handleOnClick (ev, ref) {
    let trackDuration = this.state.trackDurationInSeconds

    const touchedPosition = this.getTouchedPosition(ev, ref)

    const rewindTo = Math.round(touchedPosition * trackDuration)
    
    this.props.seek(rewindTo)
  }

  handleOnMouseMove (ev, ref) {
    if (this.state.mouseDowned) {
      let trackDuration = this.state.trackDurationInSeconds

      const touchedPosition = this.getTouchedPosition(ev, ref)

      if (touchedPosition > 0 && touchedPosition < 1) {
        this.setState({
          dummyLineProgress: touchedPosition * 100,
          dummyTime: touchedPosition * trackDuration
        })
      }
    }
  }

  render() {
    const timelineRef = React.createRef()

    let {trackDuration, nowPlaying, currentTrackPosition, seek} = this.props

    const progressBar = this.renderProgressBarSlider(currentTrackPosition, trackDuration)
    
    let {minutes, seconds} = trackDuration
    
    currentTrackPosition = (this.state.dummyTime) ? this.state.dummyTime : currentTrackPosition

    currentTrackPosition = (this.isNumeric(currentTrackPosition)) ? this.formateTimerValue(currentTrackPosition) : '0:00'
  
    if (this.countDigits(seconds) < 2) seconds = '0' + seconds
  
    return (
      <TimeLineWrapper>
        <TimerDisplay>{currentTrackPosition}</TimerDisplay>
        <ProgressBarWrapper>
          <ProgressBarBody 
            ref={timelineRef}
            onClick={(ev) => this.handleOnClick(ev, timelineRef)}
            onMouseDown={() => this.handleOnMouseDown()}
            onMouseUp={() => this.handleOnMouseUp()}
            onMouseLeave={() => this.handleOnMouseLeave()}
            onMouseMove={(ev) => this.handleOnMouseMove(ev, timelineRef)}
          >
            <ProgressBarLine nowPlaying={nowPlaying}>
              { progressBar }
            </ProgressBarLine>
          </ProgressBarBody>
        </ProgressBarWrapper>
        <TimerDisplay>{`${minutes}:${seconds}`}</TimerDisplay>
      </TimeLineWrapper>
    )
  }
}