import isNumeric from './isNumeric';

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

export default humanizeTrackTime;
