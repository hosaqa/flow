import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import MusicNote from '@material-ui/icons/MusicNote';
import Skeleton from './Skeleton';
import SkeletonRectangle from './SkeletonRectangle';

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
  font-size: ${({ theme }) => theme.spacing(1.75)}px;
  line-height: 1.4;
  font-weight: 700;
  min-width: ${({ theme }) => theme.spacing(10)}px;
`;

const Artist = styled(TextLine)`
  font-size: ${({ theme }) => theme.spacing(1.5)}px;
  line-height: 1.4;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const ArtistLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TrackInfo = ({ children, className, trackname, artist }) => {
  return (
    <Wrapper className={className}>
      <ArtCover>
        {!trackname ? (
          <SkeletonRectangle />
        ) : artist.img ? (
          <img src={artist.img} alt={`${artist.name} - ${trackname}`} />
        ) : (
          <ArtCoverDefault>
            <MusicNote />
          </ArtCoverDefault>
        )}
        {children}
      </ArtCover>
      <Text>
        <Track>{!trackname ? <Skeleton /> : trackname}</Track>

        <Artist>
          {!artist ? (
            <Skeleton />
          ) : (
            <ArtistLink to={`/playlist/artist/${artist._id}`}>
              {artist.name}
            </ArtistLink>
          )}
        </Artist>
      </Text>
    </Wrapper>
  );
};

TrackInfo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  trackname: PropTypes.string,
  artist: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
  }),
};

export default TrackInfo;
