const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

export default getViewportHeight;
