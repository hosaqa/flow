const GRID_UNIT = 8;
const BORDER_RADIUS_COEFFICIENT = 3;

export const gridTheme = {
  breakpoints: {
    xs: 0,
    sm: GRID_UNIT * 72,
    md: GRID_UNIT * 96,
    lg: GRID_UNIT * 124,
    xl: GRID_UNIT * 150,
  },
  container: {
    padding: GRID_UNIT * 2,
    maxWidth: {
      xs: 'auto',
      sm: GRID_UNIT * 60,
      md: GRID_UNIT * 76,
      lg: GRID_UNIT * 110,
      xl: GRID_UNIT * 130,
    },
  },
};

export const lightTheme = {
  spacing: value => {
    return `${GRID_UNIT * value}px`;
  },
  borderRadius: increment => `${BORDER_RADIUS_COEFFICIENT * increment}px`,
  breakpoints: gridTheme.breakpoints,
  mediaQueries: {
    up: breakpoint =>
      `@media screen and (min-width: ${gridTheme.breakpoints[breakpoint]}px)`,
    down: breakpoint =>
      `@media screen and (max-width: ${gridTheme.breakpoints[breakpoint] -
        1}px)`,
  },
  colors: {
    border: '#dcdcdc',
    content: '#f8f8f8',
    contentPreload: '#fff',
    skeleton: '#eee',
    skeletonSecondary: '#dadada',
    button: '#000',
    buttonDisabled: '#dedede',
    fontPrimary: '#1f2023',
    fontSecondary: '#878787',
    accentPrimary: '#f90dc9',
    accentSecondary: '#ff1d1d',
    theme: '#ff6b6b',
    colorDraggableBg: 'rgba(255, 112, 112, 0.50)',
    headerGradientFirst: '#ff6b6b',
    headerGradientSecond: '#ff486c',
    headerGradientThird: '#ff1d6e',
  },
  transition: '.25s',
  shadows: {
    primary:
      '1px 3px 4px rgba(0, 0, 0, 0.12), -1px -1px 2px rgba(0, 0, 0, 0.05)',
    secondary: '0 4px 4px rgba(0, 0, 0, .05)',
  },
};
