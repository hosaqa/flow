import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${({theme}) => theme.colors.contentPreload};
  padding: 15px 13px;
`;

const StaticPage = ({children}) => (
    <Wrapper>
      {children}
    </Wrapper>
  );

StaticPage.propTypes = {
  children: PropTypes.node
};

export default StaticPage;
