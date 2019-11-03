import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Playlist from '../../../player/Playlist';
import coverImg from './cover.svg';

const Wrapper = styled.div`
  display: flex;
`;

const CoverImg = styled.div`
  width: 280px;
  height: 280px;
  margin: 0 20px 0 0;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.contentPreload} url(${coverImg})
    no-repeat center / 197px;
  box-shadow: ${({ theme }) => theme.shadows.secondary};
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.contentPreload};
  padding: 15px 20px;
  flex-grow: 1;
  box-shadow: ${({ theme }) => theme.shadows.secondary};
`;

const ContentPlaylist = ({ playlist }) => (
  <Wrapper>
    <CoverImg />
    <Content>
      <Playlist nonDefaultPlaylist={playlist} />
    </Content>
  </Wrapper>
);

ContentPlaylist.propTypes = {
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      artist: PropTypes.string,
      trackname: PropTypes.string,
      album: PropTypes.string,
      src: PropTypes.string,
      img: PropTypes.string,
      duration: PropTypes.number,
    })
  ),
};

export default connect(
  ({ player }) => player,
  null
)(ContentPlaylist);
