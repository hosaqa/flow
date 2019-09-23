import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import styled from '@emotion/styled';
import MusicNote from '@material-ui/icons/MusicNote';

const StyledTrackInfo = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({ theme }) => theme.spacing(20)};

  ${({ theme }) => theme.mediaQueries.up('sm')} {
    max-width: ${({ theme }) => theme.spacing(22)};
  }
`;
const ImgWrapper = styled.div`
  flex-shrink: 0;
  width: ${({ theme }) => theme.spacing(4.5)};
  height: ${({ theme }) => theme.spacing(4.5)};
`;

const ImgDefault = styled.div`
  width: 100%;
  height: 100%;
  line-height: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  font-size: ${({ theme }) => theme.spacing(4)};
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
`;

const Text = styled.div`
  padding: 0 0 0 ${({ theme }) => theme.spacing(1)};
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
