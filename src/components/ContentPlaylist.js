import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'styled-bootstrap-grid';

import Playlist from './Playlist';

const Wrapper = styled.div`
  background-color: ${({theme}) => theme.colors.contentPreload};
  padding: 15px 13px;
`;

const CoverImg = styled.img`
  max-width: 100%;
`;

const ContentPlaylist = ({playlist}) => (
    <Wrapper>
      <Row>
        <Col col={4}>
          <CoverImg src="img/cover.jpg" alt="cover" />
        </Col>
        <Col col={8}>
          <Playlist
            nonDefaultPlaylist={playlist}
          />
        </Col>
      </Row>
    </Wrapper>
  );

ContentPlaylist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.shape({
      minutes: PropTypes.number,
       seconds: PropTypes.number
    })
  }))
};

export default connect(({player}) => player, null)(ContentPlaylist);
