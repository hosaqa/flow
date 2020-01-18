import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px`};
  width: 100%;
  margin: auto;
  box-shadow: ${({ theme }) => theme.shadows.secondary};

  ${({ theme }) => theme.mediaQueries.up('md')} {
    width: ${({ theme }) => `${theme.spacing(60)}px`};
  }
`;

export const TextPageLayout = ({ children }) => <Wrapper>{children}</Wrapper>;

TextPageLayout.propTypes = {
  children: PropTypes.node,
};

export default TextPageLayout;
