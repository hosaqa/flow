import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const colorPinkLight = 'rgba(255, 112, 112, 0.50)'
const colorPinkSoft = '#ff7070'
const colorPinkGradient = 'linear-gradient(154deg, #f90dc9, #ff1d1d)'

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
  background-color: #efefef;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .25);
  padding: 8px;
`

const VolumeSlider = styled.div`
  height: 100%;
  width: 4px;
  margin: auto;
  border-radius: 2px;
  background-color: ${colorPinkLight};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .05);
`

const VolumeBar = (props) => {
  const { volume, setVolume, mute, muteToggle } = props
  
  return (
    <VolumeBarWrapper>
      <button onClick={() => muteToggle()}>
        {!mute && volume !== 0
          ? <i className='material-icons'>volume_up</i>
          : <i className="material-icons">volume_off</i>
        }
      </button>
      <VolumeSliderWrapper>
      <VolumeSlider />
      </VolumeSliderWrapper>
    </VolumeBarWrapper>
  )
}

export default VolumeBar