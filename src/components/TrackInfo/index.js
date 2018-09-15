import React from 'react'
import styled from 'styled-components'

const StyledTrackInfo = styled.div`
  display: flex;
  align-items: center;
`
const ImgWrapper = styled.div`
  width: 37px;
  height: 37px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .32);
`

const ImgDefault = styled.div`
  width: 100%;
  height: 100%;
  line-height: 37px;
  text-align: center;
  font-size: 39px;
  font-weight: 700;
  background-color: ${props => props.theme.colorAccent };
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
`

const Text = styled.div`
  padding: 0 0 0 15px;
  margin: 0 22px 0 0;
`

const Track = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  max-width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Artist = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #333;
  max-width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
