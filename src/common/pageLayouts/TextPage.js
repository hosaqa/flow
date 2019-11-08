import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.contentPreload};
  padding: 24px 48px;
  width: 490px;
  margin: auto;
  box-shadow: ${({ theme }) => theme.shadows.secondary};
`;

export const Title = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: ${({ theme }) => theme.spacing(6)};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.fontPrimary};
  margin: 0 0 15px;
`;

export const Paragraph = styled.div`
  margin: 10px 0;
`;

export const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.theme};

  &:hover {
    text-decoration: none;
  }
`;

export const MarkedList = styled.ul`
  margin: 5px 0;
  padding: 0;
  list-style-type: none;
`;

export const MarkedListItem = styled.li`
  display: flex;

  &:before {
    content: '';
    display: block;
    width: 7px;
    height: 0;
    margin: 9px 7px 0 0;
    border-top: 1px solid ${({ theme }) => theme.colors.theme};
  }
`;

export const TextPage = ({ children }) => <Wrapper>{children}</Wrapper>;

TextPage.propTypes = {
  children: PropTypes.node,
};
