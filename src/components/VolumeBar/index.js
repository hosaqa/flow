import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'

import ProgressBar from '../ProgressBar'
import { getMousePosition } from '../../utils'

const Volume = styled.div`
  padding: 0 7px;
  position: relative;
`

const VolumeToggle = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  background-color: transparent;
`

const VolumeSlider = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  height: 125px;
  width: 30px;
  border-radius: ${props => props.theme.borderRadiusMain};
  background-color: ${props => props.theme.colorMainBg};
  box-shadow: ${props => props.theme.shadowMain};
  padding: 13px 0;
  opacity: 0;
  visibility: hidden;
  transform: scale(0);
  transform-origin: center bottom;
  transition: .2s opacity, .2s visibility, .12s transform;
  transition-delay: .28s;

  ${Volume}:hover & {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
`

class VolumeBar extends Component {

  state = {
    mouseButtonPressed: false
  }

  setVolume = value => {
    const { setVolume } = this.props

    value = value < 0 ? 0 : value > 1 ? 1  : value
    setVolume(value)
  }

  setVolumeFromPosition(ev, ref) {
    const { setVolume } = this.props
    const { topPosition } = getMousePosition(ev, ref)

    let volumeValue = 1 - parseFloat(topPosition.toFixed(2))

    this.setVolume(1 - parseFloat(topPosition.toFixed(2)))
  }

  handleOnWheel(ev) {
    const { volume, setVolume } = this.props

    if (!this.state.mouseButtonPressed) {
      const oneScrollDelta = 53 // значение дельты по Y при одной прокрутке колесика
      const volumeCoeff = Math.abs(ev.deltaY / oneScrollDelta)
      
      let volumeDelta = volumeCoeff * 0.025
      volumeDelta = parseFloat(volumeDelta.toFixed(2))
  
      if (ev.deltaY < 0) {
        if (volume < 1) this.setVolume(parseFloat((volume + volumeDelta).toFixed(2)))
      } else {
        if (volume > 0) this.setVolume(parseFloat((volume - volumeDelta).toFixed(2)))
      }
    }

  }

  handleOnClick(ev, ref) {
    this.setVolumeFromPosition(ev, ref)
  }

  handleOnMouseMove(ev, ref) {
    if (this.state.mouseButtonPressed) this.setVolumeFromPosition(ev, ref)
  }

  handleOnMouseDown() {
    this.setState({
      mouseButtonPressed: true
    })
  }

  handleOnMouseUp() {
    this.setState({
      mouseButtonPressed: false
    })
  }
  
  handleOnMouseLeave() {
    this.setState({
      mouseButtonPressed: false
    })
  }  

  render() {
    //console.log('volume bar rendered')
    const { volume, setVolume, muted, muteToggle } = this.props
    const volumeBarRef = React.createRef()

    return (
      <Volume onWheel={(ev) => this.handleOnWheel(ev)}>
        <VolumeToggle onClick={() => muteToggle()}>
          {
            !muted && volume > 0.4 ? <VolumeUpIcon />
            : !muted && volume !== 0 ? <VolumeDownIcon />
            : <VolumeOffIcon />
          }
        </VolumeToggle>
        <VolumeSlider
          ref={volumeBarRef}
          onClick={(ev) => this.handleOnClick(ev, volumeBarRef)}
          onMouseMove={(ev) => this.handleOnMouseMove(ev, volumeBarRef)}
          onMouseDown={() => this.handleOnMouseDown()}
          onMouseUp={() => this.handleOnMouseUp()}
          onMouseLeave={() => this.handleOnMouseLeave()}
        >
          <ProgressBar
            direction={'vertical'}
            filled={muted ? 0 : volume * 100}
          />
        </VolumeSlider>
      </Volume>
    )
  }
}

VolumeBar.propTypes = {
  volume: PropTypes.number,
  setVolume: PropTypes.func,
  muted: PropTypes.bool,
  muteToggle: PropTypes.func,
}

export default VolumeBar
