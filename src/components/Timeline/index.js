import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProgressBar from '../ProgressBar'
import { getMousePosition, searchTrackByID, isNumeric, countDigits } from '../../utils'


const TimeLineWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TimerDisplay = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  user-select: none;
  font-size: 14px;
  transition: color .25s;
  color: ${({theme, disabled}) => disabled ? theme.colors.buttonDisabled : theme.colors.fontPrimary};
`

const ProgressBarWrapper = styled.div`
  padding: 0 12px;
  width: 355px;
  height: 40px;
  display: flex;
  align-items: center;
`

class Timeline extends Component {
  state = {
    dummyLineProgress: null,
    dummyTime: null,
    mouseDowned: false
  }


  getTrackDuration() {
    const { playlist, track } = this.props

    return searchTrackByID(playlist, track).duration
  }

  convertDurationToSecond(trackDuration) {
    const { minutes, seconds } = trackDuration
    
    return minutes * 60 + seconds
  }
  
  formateTimerValue (seconds) {
    seconds = Math.round(seconds)
  
    let minutes = 0
  
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60)
      seconds = seconds % 60
    }
  
    seconds = (countDigits(seconds) < 2) ? '0' + seconds : seconds
  
    return `${minutes}:${seconds}`
  }
  
  renderProgressBarSlider (trackPosition, trackDuration) {
    const {minutes, seconds} = trackDuration
  
    trackDuration = minutes * 60 + seconds
    trackPosition = (isNumeric(trackPosition)) ? trackPosition : 0
    const width = parseFloat((trackPosition / trackDuration * 100).toFixed(0))

    return (
      <ProgressBar
        disabled={!this.props.playlist}
        active={this.props.nowPlaying}
        thumbShowOnHover={true}
        thumbRadius={6}
        direction={'horizontal'}
        filled={(this.state.dummyLineProgress)? this.state.dummyLineProgress : width}
      />
    )
  }

  getTouchedPosition(ev, ref) {
    const { left, width } = getMousePosition(ev, ref)
    return (ev.clientX - Math.round(left)) / width
  }

  onMouseUpRewind() {
    const trackDuration = this.convertDurationToSecond(this.getTrackDuration())
    this.props.setTrackPosition(this.state.dummyLineProgress / 100 * trackDuration)

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
    const trackDuration = this.convertDurationToSecond(this.getTrackDuration())

    const touchedPosition = this.getTouchedPosition(ev, ref)

    const rewindTo = Math.round(touchedPosition * trackDuration)
    this.props.setTrackPosition(rewindTo)
  }

  handleOnMouseMove (ev, ref) {
    if (this.state.mouseDowned) {
      const trackDuration = this.convertDurationToSecond(this.getTrackDuration())

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
     if (!this.props.playlist) return (


      <TimeLineWrapper>
        <TimerDisplay disabled={true}>{'--:--'}</TimerDisplay>
        <ProgressBarWrapper>
          <ProgressBar
            disabled={true}
            active={this.props.nowPlaying}
            thumbShowOnHover={true}
            thumbRadius={6}
            direction={'horizontal'}
          />
        </ProgressBarWrapper>
        <TimerDisplay disabled={true}>{'--:--'}</TimerDisplay>
      </TimeLineWrapper>
     )

    const timelineRef = React.createRef()

    const trackDuration = this.getTrackDuration()
      
    let { trackPosition } = this.props
    
    const progressBar = this.renderProgressBarSlider(trackPosition, trackDuration)
    
    let { minutes, seconds } = trackDuration
    
    trackPosition = (this.state.dummyTime) ? this.state.dummyTime : trackPosition

    trackPosition = (isNumeric(trackPosition)) ? this.formateTimerValue(trackPosition) : '0:00'
  
    if (countDigits(seconds) < 2) seconds = '0' + seconds
  
    return (
      <TimeLineWrapper>
        <TimerDisplay>{trackPosition || '--:--'}</TimerDisplay>
          <ProgressBarWrapper 
            ref={timelineRef}
            onClick={(ev) => this.handleOnClick(ev, timelineRef)}
            onMouseDown={() => this.handleOnMouseDown()}
            onMouseUp={() => this.handleOnMouseUp()}
            onMouseLeave={() => this.handleOnMouseLeave()}
            onMouseMove={(ev) => this.handleOnMouseMove(ev, timelineRef)}
          >
            {progressBar}
          </ProgressBarWrapper>
        <TimerDisplay>{`${minutes}:${seconds}` || '--:--'}</TimerDisplay>
      </TimeLineWrapper>
    )
  }
}

Timeline.propTypes = {
  trackDuration: PropTypes.shape({
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }),
  trackPosition: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  setTrackPosition: PropTypes.func
}


export default connect(({player}) => player)(Timeline)