import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { getMousePosition } from '../../../utils';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  padding: 7px 0;
`;

const TrackArea = styled.div`
  height: ${({ axis }) => (axis === 'x' ? '4px' : '100%')};
  width: ${({ axis }) => (axis === 'y' ? '4px' : '100%')};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 2px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabled : theme.colorDraggableBg};
  box-shadow: ${({ active }) =>
    active ? '2px 2px 2px rgba(0, 0, 0, .1)' : 'none'};
  transition: box-shadow 0.35s, background-color 0.25s;
`;

const FilledArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ axis, filled }) => (axis === 'x' ? '4px' : filled)};
  width: ${({ axis, filled }) => (axis === 'y' ? '4px' : filled)};
  background-image: linear-gradient(
    154deg,
    ${({ theme }) => theme.colors.accentPrimary},
    ${({ theme }) => theme.colors.accentSecondary}
  );
  border-radius: 2px;
`;

const Thumb = styled.div`
  position: absolute;
  right: ${({ thumbRadius }) =>
    thumbRadius ? -(thumbRadius * 2 - 4) / 2 : -2}px;
  top: ${({ thumbRadius }) =>
    thumbRadius ? -(thumbRadius * 2 - 4) / 2 : -2}px;
  width: ${({ thumbRadius }) => (thumbRadius ? thumbRadius * 2 : 8)}px;
  height: ${({ thumbRadius }) => (thumbRadius ? thumbRadius * 2 : 8)}px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4),
    -1px -1px 1px rgba(96, 96, 96, 0.25);
  transition: transform 0.12s;
  transform: ${thumbShowOnHover =>
    thumbShowOnHover ? 'scale(1)' : 'scale(0)'};

  ${Wrapper}:hover & {
    transform: scale(1);
  }
`;

const Element = styled.div`
  touch-action: none;
  user-select: none;
  cursor: pointer;
  transform: translate(${({ x, y }) => `${x}px, ${y}px`});
`;

const getElMetrics = el => ({
  height: el.offsetHeight,
  width: el.offsetWidth,
});

// когда-нибудь закончу
const Draggable = ({
  children,
  axis,
  startPosition = { x: 0, y: 0 },
  disabled,
  onStart,
  onStop,
}) => {
  const [startMousePosition, setStartMousePosition] = useState(null);
  const [position, setPosition] = useState(startPosition);
  const [dragging, setDragging] = useState(false);

  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const childrenMetrics = getElMetrics(element.children[0]);
    element.style.height = `${childrenMetrics.height}px`;
    element.style.width = `${childrenMetrics.width}px`;
  });

  // clickH

  const handleClick = () => {
    setPosition({ x: 25, y: 25 });
  };

  const handleMouseDown = e => {
    setDragging(true);
    setStartMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStartMousePosition(null);
  };

  const handleMouseMove = (e, ref) => {
    if (dragging) {
      const { mouseX, mouseY } = getMousePosition(e, ref);
      const startX = startMousePosition.x;
      const startY = startMousePosition.y;
      // setPosition({x: mouseX, y: mouseY});
      // console.log(mouseX, mouseY);
      console.log(startX - e.clientX, startY - e.clientY);

      setPosition({ x: startX - e.clientX, y: startY - e.clientY });
    }
  };

  const handleMouseLeave = () => {
    // console.log('leave');
  };

  window.addEventListener('mousedown', e => {
    console.log(e.target, elementRef.current);
    console.log(e.target === elementRef.current);
  });

  return (
    <Element
      ref={elementRef}
      x={position.x}
      y={position.y}
      // onDragStart={() => false}
      // onClick={handleClick}
      // onMouseMove={e => {handleMouseMove(e, elementRef);}}
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseLeave}
    >
      {children}
    </Element>
  );
};

export default Draggable;
