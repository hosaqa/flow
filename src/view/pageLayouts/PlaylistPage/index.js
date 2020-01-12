import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Playlist from '../../components/Playlist';
import coverImg from './cover.svg';

const Wrapper = styled.div`
  display: flex;
`;

const CoverImg = styled.div`
  width: 280px;
  height: 280px;
  margin: 0 20px 0 0;
  flex-shrink: 0;
  background: ${({ theme }) => theme.palette.background.secondary}
    url(${coverImg}) no-repeat center / 197px;
  box-shadow: ${({ theme }) => theme.shadows.secondary};
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  padding: 15px 20px;
  flex-grow: 1;
  box-shadow: ${({ theme }) => theme.shadows.secondary};
`;

const PlaylistPage = ({ playlistID }) => (
  <Wrapper>
    <CoverImg />
    <Content>
      <Playlist playlistID={playlistID} />
    </Content>
  </Wrapper>
);

PlaylistPage.propTypes = {
  playlistID: PropTypes.string,
};

export default PlaylistPage;
