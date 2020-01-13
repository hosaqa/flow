import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';

const SkeletonStyled = styled.span`
  span {
    border-radius: 0;
    height: 100%;
  }
`;

const SkeletonEnchanced = ({ className }) => (
  <SkeletonStyled className={className}>
    <Skeleton />
  </SkeletonStyled>
);

SkeletonEnchanced.propTypes = {
  className: PropTypes.string,
};

export default SkeletonEnchanced;
