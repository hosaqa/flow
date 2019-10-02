import { useMediaQuery } from 'react-responsive';
import { gridTheme } from '../app/theme';

const humanizeTrackTime = duration => {
  if (!isNumeric(duration)) {
    return '--:--';
  }

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${Math.floor(seconds)
    .toString()
    .padStart(2, '0')}`;
};

const isNumeric = n => !Number.isNaN(parseFloat(n)) && Number.isFinite(n);

const countDigits = number => `${number}`.length;

const getMousePosition = (ev, ref) => {
  const { top, left, width, height } = ref.current.getBoundingClientRect();

  return {
    top,
    left,
    width,
    height,
    mouseX: ev.clientX,
    mouseY: ev.clientY,
    leftPosition: (ev.clientX - left) / width,
    topPosition: (ev.clientY - top) / height,
  };
};

const searchArrItemByID = (arr, id) => {
  if (!arr || typeof id === 'undefined') return false;

  return arr.find(item => item.id === id);
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const isDesktop = () => useMediaQuery({ minWidth: gridTheme.breakpoints.lg });

export {
  humanizeTrackTime,
  isNumeric,
  countDigits,
  getMousePosition,
  searchArrItemByID,
  getRandomInt,
  isDesktop,
};
