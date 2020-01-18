import { useState } from 'react';

const useLocalStorage = ({ key, initialState }) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  );

  const setStateEchanced = nextValue => {
    localStorage.setItem(key, JSON.stringify(nextValue));
    setState(nextValue);
  };

  return [state, setStateEchanced];
};

export default useLocalStorage;
