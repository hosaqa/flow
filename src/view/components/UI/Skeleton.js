import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';

const SkeletonStyled = styled.span`
  span {
    border-radius: 0;
    height: 100%;
  }
`;

const SkeletonEnchanced = () => (
  <SkeletonStyled>
    <Skeleton />
  </SkeletonStyled>
);

export default SkeletonEnchanced;
