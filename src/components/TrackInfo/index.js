import React from 'react'
import styled from 'styled-components'

const StyledTrackInfo = styled.div`
  display: flex;
  align-items: center;

`
const ImgWrapper = styled.div`
  width: 40px;
  height: 40px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .55);
`

const ImgDefault = styled.div`
  width: 100%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  background-color: ${props => props.theme.colorAccent };
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
`

const Text = styled.div`
  padding: 0 0 0 15px;
`

const Track = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`

const Artist = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #333;
`

export default function TrackInfo(props) {
  const { track, artist, album, img } = props

  return (
    <StyledTrackInfo>
      <ImgWrapper>
        { img
          ? <img
              src={img || 'img/null.png'}
              alt={`${artist} - ${track}`}
            />
          : <ImgDefault>?</ImgDefault>  
        }
      </ImgWrapper>
      <Text>
        <Track>{track}</Track>
        <Artist>{artist}</Artist>
      </Text>
    </StyledTrackInfo>
  )
}
