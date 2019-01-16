import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProgressBar from '../ProgressBar'
import { getMousePosition, searchTrackByID } from '../../utils'


const TimeLineWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TimerDisplay = styled.div`
  display: inline-block;
  width: 28px;
  user-select: none;
  font-size: 14px;
`

const ProgressBarWrapper = styled.div`
  padding: 0 12px;
`

const ProgressBarBody = styled.div`
  width: 355px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
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
  
  renderProgressBarSlider (trackPosition, trackDuration) {
    const {minutes, seconds} = trackDuration
  
    trackDuration = minutes * 60 + seconds
    trackPosition = (this.isNumeric(trackPosition)) ? trackPosition : 0
    const width = trackPosition / trackDuration * 100

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
    //console.log(this.state.dummyLineProgress, trackDuration)
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
    if (!this.props.playlist) return null
    
    const timelineRef = React.createRef()
    const trackDuration = this.getTrackDuration()

    let { trackPosition } = this.props
    
    const progressBar = this.renderProgressBarSlider(trackPosition, trackDuration)
    
    let { minutes, seconds } = trackDuration
    
    trackPosition = (this.state.dummyTime) ? this.state.dummyTime : trackPosition

    trackPosition = (this.isNumeric(trackPosition)) ? this.formateTimerValue(trackPosition) : '0:00'
  
    if (this.countDigits(seconds) < 2) seconds = '0' + seconds
  
    return (
      <TimeLineWrapper>
        <TimerDisplay>{trackPosition}</TimerDisplay>
        <ProgressBarWrapper>
          <ProgressBarBody 
            ref={timelineRef}
            onClick={(ev) => this.handleOnClick(ev, timelineRef)}
            onMouseDown={() => this.handleOnMouseDown()}
            onMouseUp={() => this.handleOnMouseUp()}
            onMouseLeave={() => this.handleOnMouseLeave()}
            onMouseMove={(ev) => this.handleOnMouseMove(ev, timelineRef)}
          >
            {progressBar}
          </ProgressBarBody>
        </ProgressBarWrapper>
        <TimerDisplay>{`${minutes}:${seconds}`}</TimerDisplay>
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