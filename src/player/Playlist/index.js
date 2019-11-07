import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PlaylistItem from './PlaylistItem';
import { playToggle, setCurrentTrack } from '../actions';

const PlaylistItemStyled = styled(PlaylistItem)`
  &:not(:last-child) {
    margin: 0 0 ${({ theme }) => theme.spacing(1)}px;
  }
`;

const Playlist = ({
  currentTrackID,
  playlist,
  playToggle,
  playingNow,
  setCurrentTrack,
}) => {
  if (!playlist)
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
      {playlist.map(track => (
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
  currentTrackID: PropTypes.string,
  playToggle: PropTypes.func,
  setCurrentTrack: PropTypes.func,
  playingNow: PropTypes.bool,
};

export default connect(
  ({ player }) => ({ ...player }),
  { playToggle, setCurrentTrack }
)(Playlist);
