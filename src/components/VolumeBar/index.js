import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'



const VolumeBarWrapper = styled.div`
  padding: 0 7px;
  position: relative;
`

const VolumeSliderWrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  height: 110px;
  width: 30px;
  border-radius: 3px;
  background-color: ${props => props.theme.colorBg};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .25);
  padding: 8px;
`

const VolumeSlider = styled.div`
  height: 100%;
  width: 4px;
  margin: auto;
  border-radius: 2px;
  background-color: ${props => props.theme.colorDraggableBg};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .05);
  position: relative;
`

const VolumeSliderMovable = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height};
  background-image: linear-gradient(154deg, ${props => props.theme.colorGradientStart}, ${props => props.theme.colorGradientEnd});
  border-radius: 2px;
  transition: height .12s;
`

const VolumeSliderDraggable = styled.div`
  position: absolute;
  right: -2px;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4), -1px -1px 1px rgba(96, 96, 96, 0.25);
  transition: transform .12s;
`

const VolumeBar = (props) => {
  const { volume, setVolume, mute, muteToggle } = props
  const height = 0

  const handleOnWheel = (ev) => {
    const ONE_SCROLL_DELTA = 53 // значение дельты по Y при одной прокрутке колесика
    const volumeCoeff = Math.abs(ev.deltaY / ONE_SCROLL_DELTA)
    const volumeDelta = volumeCoeff * 0.015

    if (ev.deltaY < 0) {
      if (volume < 1) setVolume(volume + volumeDelta)
    } else {
      if (volume > 0) setVolume(volume - volumeDelta)
    }
  }

  return (
    <VolumeBarWrapper>
      <button onClick={() => muteToggle()}>
        {!mute && volume !== 0
          ? <i className='material-icons'>volume_up</i>
          : <i className="material-icons">volume_off</i>
        }
      </button>
      <VolumeSliderWrapper onWheel={handleOnWheel}>
        <VolumeSlider>
          <VolumeSliderMovable height={`${volume * 100}%`}>
            <VolumeSliderDraggable/>
          </VolumeSliderMovable>  
        </VolumeSlider>
      </VolumeSliderWrapper>
    </VolumeBarWrapper>
  )
}



export default VolumeBar