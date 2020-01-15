import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { getPlaylistByID } from '../../store/ducks/playlists';
import Playlist from '../components/Playlist';
import Skeleton from '../components/UI/Skeleton';
import SkeletonRectangle from '../components/UI/SkeletonRectangle';
import { TitleLarge, TitleMedium } from '../components/UI/Typography';

const Wrapper = styled.main`
  ${({ theme }) => theme.mediaQueries.up('md')} {
    display: flex;
    align-items: flex-start;
  }
`;

const PlaylistWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  padding: ${({ theme }) => theme.spacing(1.5)}px;
  box-shadow: ${({ theme }) => theme.shadows.secondary};

  ${({ theme }) => theme.mediaQueries.up('md')} {
    flex-grow: 1;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`;

const ArtCoverWrapper = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  margin: 0 0 ${({ theme }) => theme.spacing(1.5)}px;
  box-shadow: ${({ theme }) => theme.shadows.secondary};

  ${({ theme }) => theme.mediaQueries.up('md')} {
    max-width: ${({ theme }) => theme.spacing(24)}px;
    flex-shrink: 0;
    margin: 0 ${({ theme }) => theme.spacing(2)}px 0 0;
  }

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    max-width: ${({ theme }) => theme.spacing(35)}px;
  }
`;

const ArtCoverImage = styled.img`
  width: 100%;
  display: block;
`;

const ArtCoverDefault = styled.div`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Title = styled(TitleMedium.withComponent('h1'))`
  display: inline-block;
  min-width: ${({ theme }) => theme.spacing(26)}px;
  margin: 0 0 ${({ theme }) => theme.spacing(1)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    margin: 0 0 ${({ theme }) => theme.spacing(2)}px;
    min-width: ${({ theme }) => theme.spacing(30)}px;
  }
`;

const PlaylistPageLayout = ({ playlistID, artCoverSrc }) => {
  const theme = useTheme();

  const playlistState = useSelector(getPlaylistByID(playlistID)) || {};
  const { isLoading, title, items, fetchError } = playlistState;

  if (!isLoading && !items && !fetchError) return null;

  if (fetchError) return <div>{fetchError}</div>;

  return (
    <Wrapper>
      <ArtCoverWrapper>
        {isLoading ? (
          <SkeletonRectangle />
        ) : (
          <>
            {artCoverSrc ? (
              <ArtCoverImage src={artCoverSrc} />
            ) : (
              <ArtCoverDefault>
                <svg
                  width="75%"
                  height="75%"
                  viewBox="0 0 197 197"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="98.5"
                    cy="98.5"
                    r="98.5"
                    fill={theme.palette.primary.normal}
                  />
                  <path
                    d="M99 41.75V107.688C95.3125 105.562 91.0625 104.25 86.5 104.25C72.6875 104.25 61.5 115.438 61.5 129.25C61.5 143.062 72.6875 154.25 86.5 154.25C100.312 154.25 111.5 143.062 111.5 129.25V66.75H136.5V41.75H99Z"
                    fill={theme.palette.background.secondary}
                  />
                </svg>
              </ArtCoverDefault>
            )}
          </>
        )}
      </ArtCoverWrapper>
      <PlaylistWrapper>
        <Title className={TitleLarge}>
          {isLoading ? <Skeleton /> : <span>{title}</span>}
        </Title>
        <Playlist playlistID={playlistID} />
      </PlaylistWrapper>
    </Wrapper>
  );
};

PlaylistPageLayout.propTypes = {
  playlistID: PropTypes.string,
  artCoverSrc: PropTypes.string,
};

export default PlaylistPageLayout;
