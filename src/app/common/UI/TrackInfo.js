import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import styled from '@emotion/styled';
import MusicNote from '@material-ui/icons/MusicNote';

const StyledTrackInfo = styled.div`
  display: flex;
  align-items: center;
  max-width: 180px;
`;
const ImgWrapper = styled.div`
  width: 37px;
  min-width: 37px;
  height: 37px;
  /* box-shadow: 1px 1px 1px rgba(0, 0, 0, .18); */
`;

const ImgDefault = styled.div`
  width: 100%;
  height: 100%;
  line-height: 37px;
  text-align: center;
  font-size: 39px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.theme};
  color: #fff;
`;

const Text = styled.div`
  padding: 0 0 0 10px;
  margin: 0 15px 0 0;
`;

const Track = styled.div`
  color: ${({ theme }) => theme.colors.fontPrimary};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  max-width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Artist = styled.div`
  font-size: 12px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.fontSecondary};
  max-width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TrackInfo = ({ trackname, artist, img }) => {
  if (!trackname) {
    return (
      <ContentLoader
        height={40}
        width={130}
        speed={2}
        primaryColor="#eee"
        secondaryColor="#dadada"
        style={{
          width: '140px',
          height: '40px',
        }}
      >
        <rect x="47" y="6" width="68" height="8" />
        <rect x="47" y="20" width="108" height="9" />
        <rect x="0" y="0" width="37" height="37" />
      </ContentLoader>
    );
  }

  return (
    <StyledTrackInfo>
      <ImgWrapper>
        {img ? (
          <img src={img} alt={`${artist} - ${trackname}`} />
        ) : (
          <ImgDefault>
            <MusicNote />
          </ImgDefault>
        )}
      </ImgWrapper>
      <Text>
        <Track>{trackname}</Track>
        <Artist>{artist}</Artist>
      </Text>
    </StyledTrackInfo>
  );
};

TrackInfo.propTypes = {
  trackname: PropTypes.string,
  artist: PropTypes.string,
  img: PropTypes.string,
};

export default TrackInfo;
