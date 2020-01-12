import getRandomInt from './getRandomInt';

const randomizeArray = arr => {
  const prevIndexesSequence = [...Array(arr.length).keys()];
  const randomisedArray = [];

  while (prevIndexesSequence.length > 0) {
    const getRandomIndex = getRandomInt(1, prevIndexesSequence.length) - 1;
    randomisedArray.push(arr[prevIndexesSequence[getRandomIndex]]);
    prevIndexesSequence.splice(getRandomIndex, 1);
  }

  return randomisedArray;
};

export default randomizeArray;
