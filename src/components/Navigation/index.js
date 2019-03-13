import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const Linked = styled.a`
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  margin-right: 23px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Navigation = (props) => (
  
    <div>
      
      <div>
        <Link to="/playlist">Playlist</Link>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Route path="/playlist" component={() => 1} />
        <Route path="/about" component={() => 2} />
      </div>
      
    </div>
  
  );

Navigation.propTypes = {

};

export default Navigation;

