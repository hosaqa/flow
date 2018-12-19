import { findDOMNode } from 'react-dom';

export const getMousePosition = (ev, ref) => {
  const { top, left, bottom, width, height } = findDOMNode(
    ref.current
  ).getBoundingClientRect();

  return {
    top,
    left,
    width,
    height,
    mouseX: ev.clientX,
    mouseY: ev.clientY,
    leftPosition: (ev.clientX - left) / width,
    topPosition: (ev.clientY - top) / height
  };
};

export const searchTrackByID = (playlist, id) =>
  playlist.find(track => track.id === id);
