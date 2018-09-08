import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ProgressBar from '../ProgressBar'
import { getMousePosition } from '../../utils'

const Volume = styled.div`
  padding: 0 7px;
  position: relative;
`

const VolumeSlider = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  height: 110px;
  width: 30px;
  border-radius: 3px;
  background-color: ${props => props.theme.colorBg};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .25);
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transition: .2s opacity, .2s visibility;
  transition-delay: .5s;

  ${Volume}:hover & {
    opacity: 1;
    visibility: visible;
  }
`

class VolumeBar extends Component {

  state = {
    mouseButtonPressed: false
  }

  setVolumeFromPosition(ev, ref) {
    const { setVolume } = this.props
    const { topPosition } = getMousePosition(ev, ref)

    setVolume(1 - parseFloat(topPosition.toFixed(2)))
  }

  handleOnWheel(ev) {
    const { volume, setVolume } = this.props

    const oneScrollDelta = 53 // значение дельты по Y при одной прокрутке колесика
    const volumeCoeff = Math.abs(ev.deltaY / oneScrollDelta)
    
    let volumeDelta = volumeCoeff * 0.025
    volumeDelta = parseFloat(volumeDelta.toFixed(2))
    console.log(volumeDelta, volume)

    if (ev.deltaY < 0) {
      if (volume < 1) setVolume(parseFloat((volume + volumeDelta).toFixed(2)))
    } else {
      if (volume > 0) setVolume(parseFloat((volume - volumeDelta).toFixed(2)))
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
    const { volume, setVolume, muted, muteToggle } = this.props
    const volumeBarRef = React.createRef()
    //console.log(volume)
    return (
      <Volume>
        <button onClick={() => muteToggle()}>
          {!muted && volume !== 0
            ? <i className="material-icons">volume_up</i>
            : <i className="material-icons">volume_off</i>
          }
        </button>
        <VolumeSlider
          ref={volumeBarRef}
          onWheel={(ev) => this.handleOnWheel(ev)}
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
