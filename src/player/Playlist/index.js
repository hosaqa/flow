import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PlaylistItem from './PlaylistItem';
import { playToggle, setCurrentTrack } from '../../store/ducks/player/actions';

const PlaylistItemStyled = styled(PlaylistItem)`
  &:not(:last-child) {
    margin: 0 0 ${({ theme }) => theme.spacing(1)}px;
  }
`;

const Playlist = ({
  currentTrackID,
  playlist,
  playlistNowPlaying,
  playToggle,
  playingNow,
  setCurrentTrack,
}) => {
  const currentPlaylist = playlist || playlistNowPlaying;

  if (!currentPlaylist)
    return (
      <>
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
      </>
    );
  return (
    <>
      {currentPlaylist.map(track => (
        <PlaylistItemStyled
          playToggle={playToggle}
          setTrack={setCurrentTrack}
          track={track}
          currentTrackID={currentTrackID}
          playingNow={playingNow}
          key={track.id}
        />
      ))}
    </>
  );
};

const playlistProp = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.number,
  })
);

Playlist.propTypes = {
  playlist: playlistProp,
  playlistNowPlaying: playlistProp,
  currentTrackID: PropTypes.string,
  playToggle: PropTypes.func,
  setCurrentTrack: PropTypes.func,
  playingNow: PropTypes.bool,
};

export default connect(
  ({ player }) => ({
    playlistNowPlaying: player.playlist,
    currentTrackID: player.currentTrackID,
    playingNow: player.playingNow,
  }),
  { playToggle, setCurrentTrack }
)(Playlist);
