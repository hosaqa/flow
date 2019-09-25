import { useMediaQuery } from 'react-responsive';
import { gridTheme } from '../app/theme';

const formatSecondsToMMSS = totalSeconds => {
  if (!totalSeconds) return '0:00';

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

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

const searchArrItemByID = (arr, id) => arr.find(item => item.id === id);

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const isDesktop = () => useMediaQuery({ minWidth: gridTheme.breakpoints.lg });

export {
  formatSecondsToMMSS,
  isNumeric,
  countDigits,
  getMousePosition,
  searchArrItemByID,
  getRandomInt,
  isDesktop,
};
