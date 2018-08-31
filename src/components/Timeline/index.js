import React from 'react'
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
  width: 300px;
  height: 20px;
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

const Timeline = (props) => {
  const timelineRef = React.createRef()

  let {trackDuration, currentTrackPosition, nowPlaying, onSeek} = props

  const progressBar = renderProgressBarSlider(currentTrackPosition, trackDuration)
  
  let {minutes, seconds} = trackDuration
  
  currentTrackPosition = (isNumeric(currentTrackPosition)) ? formateTimerValue(currentTrackPosition) : '0:00'

  if (countDigits(seconds) < 2) seconds = '0' + seconds

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TimerDisplay>{currentTrackPosition || '0:00'}</TimerDisplay>
      <div>
        <ProgressBarWrapper ref={timelineRef} onClick={handleOnClick(timelineRef, trackDuration, onSeek)} onMouseDown={handleOnMouseDown}>
          <ProgressBarBody nowPlaying={nowPlaying}>
            { progressBar }
          </ProgressBarBody>
        </ProgressBarWrapper>
      </div>
      <TimerDisplay>{`${minutes}:${seconds}`}</TimerDisplay>
    </div>
  )
}

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const countDigits = (number) => {
  return (''+number).length
}

const formateTimerValue = (seconds) => {
  seconds = Math.round(seconds)

  let minutes = 0

  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
  }

  seconds = (countDigits(seconds) < 2) ? '0' + seconds : seconds

  return `${minutes}:${seconds}`
}

const renderProgressBarSlider = (currentTrackPosition, trackDuration) => {
  const {minutes, seconds} = trackDuration

  trackDuration = minutes * 60 + seconds
  currentTrackPosition = (isNumeric(currentTrackPosition)) ? currentTrackPosition : 0
  const width = currentTrackPosition / trackDuration * 100

  return (
    <ProgressBarMovable width = {`${width}%`}>
      <ProgressBarSlider />
    </ProgressBarMovable>
  )
}

const handleOnClick = (ref, trackDuration, callback) => (ev) => {
  const { left, right, width } = findDOMNode(ref.current).getBoundingClientRect()

  const touchedPosition = ev.clientX - Math.round(left)

  trackDuration = trackDuration.minutes * 60 + trackDuration.seconds

  const rewindTo = Math.round(touchedPosition / width * trackDuration)
  
  callback(rewindTo)
} 

const handleOnMouseDown = (ev) => {
  // console.log(ev)
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

export default Timeline