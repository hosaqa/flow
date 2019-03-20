import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {ThreeBounce} from 'styled-spinkit';

import ProgressBar from '../ProgressBar';
import { getMousePosition, searchTrackByID, isNumeric, countDigits } from '../../utils';


const TimeLineWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TimerDisplay = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  user-select: none;
  font-size: 14px;
  transition: color .25s;
  color: ${({theme, disabled}) => disabled ? theme.colors.buttonDisabled : theme.colors.fontPrimary};
`;

const ProgressBarWrapper = styled.div`
  margin: 0 12px;
  width: 355px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Preloader = styled.div`
  width: 25px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
`;

class Timeline extends Component {
  state = {
    dummyLineProgress: null,
    dummyTime: null,
    mouseDowned: false
  }

  getTrackDuration() {
    const {player} = this.props;
    const { playlist, track } = player;

    return searchTrackByID(playlist, track).duration;
  }

  convertDurationToSecond(trackDuration) {
    const { minutes, seconds } = trackDuration;
    
    return minutes * 60 + seconds;
  }
  
  formateTimerValue (seconds) {
    seconds = Math.round(seconds);
  
    let minutes = 0;
  
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds %= 60;
    }
  
    seconds = (countDigits(seconds) < 2) ? '0' + seconds : seconds;
  
    return `${minutes}:${seconds}`;
  }
  
  renderProgressBarSlider (trackPosition, trackDuration) {
    const {player} = this.props;
    const {playlist, nowPlaying, trackIsLoaded} = player;
    const {dummyLineProgress} = this.state;
    const {minutes, seconds} = trackDuration;
  
    trackDuration = minutes * 60 + seconds;
    trackPosition = (isNumeric(trackPosition)) ? trackPosition : 0;
    const width = parseFloat((trackPosition / trackDuration * 100).toFixed(1));

    return (
      <ProgressBar
        disabled={!playlist}
        isLoading={!trackIsLoaded}
        active={nowPlaying}
        thumbShowOnHover
        thumbRadius={6}
        direction="horizontal"
        filled={dummyLineProgress || width}
      />
    );
  }

  getTouchedPosition(ev, ref) {
    const { left, width } = getMousePosition(ev, ref);
    return (ev.clientX - Math.round(left)) / width;
  }

  onMouseUpRewind() {
    const {setTrackPosition} = this.props;
    const {dummyLineProgress} = this.state;

    const trackDuration = this.convertDurationToSecond(this.getTrackDuration());
    setTrackPosition(dummyLineProgress / 100 * trackDuration);

    this.setState({
      mouseDowned: false,
      dummyLineProgress: null,
      dummyTime: null
    });
  }

  handleOnMouseDown() {
    this.setState({mouseDowned: true});
  }

  handleOnMouseUp() {
    this.onMouseUpRewind();
  }

  handleOnMouseLeave() {
    const {mouseDowned, dummyLineProgress} = this.state;

    if (mouseDowned && dummyLineProgress) {
      this.onMouseUpRewind();
    }
  }

  handleOnClick (ev, ref) {
    const {setTrackPosition} = this.props;

    const trackDuration = this.convertDurationToSecond(this.getTrackDuration());

    const touchedPosition = this.getTouchedPosition(ev, ref);

    const rewindTo = Math.round(touchedPosition * trackDuration);
    setTrackPosition(rewindTo);
  }

  handleOnMouseMove (ev, ref) {
    const {mouseDowned} = this.state;

    if (mouseDowned) {
      const trackDuration = this.convertDurationToSecond(this.getTrackDuration());

      const touchedPosition = this.getTouchedPosition(ev, ref);

      if (touchedPosition > 0 && touchedPosition < 1) {
        this.setState({
          dummyLineProgress: touchedPosition * 100,
          dummyTime: touchedPosition * trackDuration
        });
      }
    }
  }

  render() {
    const {player, trackTime} = this.props;
    
    const {playlist, nowPlaying, trackIsLoaded} = player;
    const {dummyTime} = this.state;
    
    if (!playlist) return (
      <TimeLineWrapper>
        <TimerDisplay disabled>--:--</TimerDisplay>
        <ProgressBarWrapper>
          <ProgressBar
            disabled
            active={nowPlaying}
            thumbShowOnHover
            thumbRadius={6}
            direction="horizontal"
          />
        </ProgressBarWrapper>
        <TimerDisplay disabled>--:--</TimerDisplay>
      </TimeLineWrapper>
     );

    const timelineRef = React.createRef();

    const trackDuration = this.getTrackDuration();
      
    let { trackPosition } = trackTime;
    
    const progressBar = this.renderProgressBarSlider(trackPosition, trackDuration);
    
    let { seconds } = trackDuration;
    const { minutes } = trackDuration;

    trackPosition = dummyTime || trackPosition;

    trackPosition = (isNumeric(trackPosition)) ? this.formateTimerValue(trackPosition) : '0:00';
  
    if (countDigits(seconds) < 2) seconds = '0' + seconds;
    console.log(trackIsLoaded);
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
            {!trackIsLoaded && 
            <Preloader>
              <ThreeBounce color='#ff6b6b' size={25} />
            </Preloader>
            }
            {progressBar}
          </ProgressBarWrapper>
        <TimerDisplay>{`${minutes}:${seconds}` || '--:--'}</TimerDisplay>
      </TimeLineWrapper>
    );
  }
}

Timeline.propTypes = {
  trackDuration: PropTypes.shape({
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }),
  trackTime: PropTypes.shape({
    setTrackPosition: PropTypes.number
  }),
  setTrackPosition: PropTypes.func
};


export default connect(({player, trackTime}) => ({player, trackTime}))(Timeline);