import React from 'react'
import styled from 'styled-components'

const StyledTrackInfo = styled.div`
  display: flex;
  align-items: center;
  max-width: 180px;
`
const ImgWrapper = styled.div`
  width: 37px;
  min-width: 37px;
  height: 37px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .18);
`

const ImgDefault = styled.div`
  width: 100%;
  height: 100%;
  line-height: 37px;
  text-align: center;
  font-size: 39px;
  font-weight: 700;
  background-image: linear-gradient(154deg, ${props => props.theme.colorGradientStart}, ${props => props.theme.colorGradientEnd});
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
`

const Text = styled.div`
  padding: 0 0 0 10px;
  margin: 0 15px 0 0;
`

const Track = styled.div`
  color: ${props => props.theme.colorFontPrimary};
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  max-width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Artist = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colorFontSecondary};
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
          : <ImgDefault /> 
        }
      </ImgWrapper>
      <Text>
        <Track>{track}</Track>
        <Artist>{artist}</Artist>
      </Text>
    </StyledTrackInfo>
  )
}
