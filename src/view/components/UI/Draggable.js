import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Swipe from 'react-easy-swipe';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  transform: translate(
    ${({ position }) => position.x}px,
    ${({ position }) => position.y}px
  );
`;

const Draggable = ({ children }) => {
  const elRef = useRef(null);

  const [startPosition, setStartPosition] = useState({
    x: 0,
    y: 0,
  });

  const [position, setPosition] = useState(startPosition);

  const handleSwipeStart = () => {
    document.body.style.userSelect = 'none';
  };

  const handleSwipeMove = position => {
    setPosition({
      x: startPosition.x + position.x,
      y: startPosition.y + position.y,
    });
  };

  const handleSwipeEnd = () => {
    setStartPosition({
      x: position.x,
      y: position.y,
    });

    document.body.style.userSelect = '';
  };

  return (
    <Wrapper ref={elRef} position={position}>
      <Swipe
        allowMouseEvents={true}
        onSwipeStart={handleSwipeStart}
        onSwipeMove={handleSwipeMove}
        onSwipeEnd={handleSwipeEnd}
      >
        {children}
      </Swipe>
    </Wrapper>
  );
};

Draggable.propTypes = {
  children: PropTypes.element,
};

export default Draggable;
