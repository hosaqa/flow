import styled from '@emotion/styled';
import Skeleton from './Skeleton';

const SkeletonRectangle = styled(Skeleton)`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  display: block;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  & > span {
    position: absolute;
    left: 0;
    top: 0;
  }

  span {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default SkeletonRectangle;
