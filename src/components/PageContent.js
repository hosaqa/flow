import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'styled-bootstrap-grid';
import styled from 'styled-components';


const Wrapper = styled.div`
  margin: 100px 0 0;
`;

const Inner = styled.div`
  background-color: ${({theme}) => theme.colors.content};
  padding: 25px;
`;

const PageContent = ({children}) => (
  <Wrapper>
    <Container>
      <Inner>
        {children}
      </Inner>
    </Container>
  </Wrapper>
);

PageContent.propTypes = {
  children: PropTypes.node
};

export default PageContent;