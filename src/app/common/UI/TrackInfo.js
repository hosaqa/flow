import React from 'react';
import PropTypes from 'prop-types';
//import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';
import MusicNote from '@material-ui/icons/MusicNote';
import Skeleton from './Skeleton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({ theme }) => theme.spacing(20)}px;

  ${({ theme }) => theme.mediaQueries.up('sm')} {
    min-width: ${({ theme }) => theme.spacing(22)}px;
    width: ${({ theme }) => theme.spacing(22)}px;
    max-width: ${({ theme }) => theme.spacing(22)}px;
  }
`;
const ArtCover = styled.div`
  flex-shrink: 0;
  width: ${({ theme }) => theme.spacing(5)}px;
  height: ${({ theme }) => theme.spacing(5)}px;
  position: relative;
`;

const ArtCoverDefault = styled.div`
  width: 100%;
  height: 100%;
  line-height: ${({ theme }) => theme.spacing(5)}px;
  text-align: center;
  font-size: ${({ theme }) => theme.spacing(4)}px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.palette.primary.normal};
  color: ${({ theme }) => theme.palette.white};
`;

const Text = styled.div`
  padding: 0 0 0 ${({ theme }) => theme.spacing(1)}px;
`;

const TextLine = styled.div`
  max-width: ${({ theme }) => theme.spacing(16)}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Track = styled(TextLine)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  min-width: ${({ theme }) => theme.spacing(10)}px;
`;

const Artist = styled(TextLine)`
  font-size: 12px;
  line-height: 17px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const TrackInfo = ({ children, className, trackname, artist, img }) => (
  <Wrapper className={className}>
    <ArtCover>
      {!trackname ? (
        <Skeleton />
      ) : img ? (
        <img src={img} alt={`${artist} - ${trackname}`} />
      ) : (
        <ArtCoverDefault>
          <MusicNote />
        </ArtCoverDefault>
      )}
      {children}
    </ArtCover>
    <Text>
      <Track>{!trackname ? <Skeleton /> : trackname}</Track>
      <Artist>{!artist ? <Skeleton /> : artist}</Artist>
    </Text>
  </Wrapper>
);

TrackInfo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  trackname: PropTypes.string,
  artist: PropTypes.string,
  img: PropTypes.string,
};

export default TrackInfo;
