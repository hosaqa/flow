import tinycolor from 'tinycolor2';

const GRID_UNIT = 8;
const BORDER_RADIUS_COEFFICIENT = 2;

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
      xs: GRID_UNIT * 50,
      sm: GRID_UNIT * 60,
      md: GRID_UNIT * 76,
      lg: GRID_UNIT * 110,
      xl: GRID_UNIT * 130,
    },
  },
};

const common = {
  dark: '#000',
  light: '#fff',
  main: '#ff6b6b',
  success: '#5dff5d',
  error: '#ff3a3a',
  warning: '#fcff3a',
  info: '#3a77ff',
};
export const lightTheme = {
  palette: {
    white: common.light,
    text: {
      primary: common.dark,
      secondary: '#878787',
      light: common.light,
    },
    primary: {
      translucent: tinycolor(common.main)
        .setAlpha(0.4)
        .toString(),
      normal: common.main,
      light: tinycolor(common.main)
        .lighten(20)
        .toString(),
      dark: tinycolor(common.main)
        .darken(20)
        .toHexString(),
    },
    secondary: '#ff1d6e',
    border: {
      primary: '#dcdcdc',
    },
    background: {
      primary: '#f8f8f8',
      secondary: common.light,
      alt: 'rgb(237, 237, 237)',
      overlay: tinycolor(common.light)
        .setAlpha(0.8)
        .toString(),
    },
    action: {
      disabled: '#dedede',
      focus: tinycolor(common.main)
        .setAlpha(0.35)
        .toString(),
    },
    skeleton: {
      primary: '#dedede',
      secondary: '#efefef',
    },
    status: {
      success: common.success,
      error: common.error,
      warning: common.warning,
      info: common.info,
    },
  },
  shadows: {
    primary:
      '1px 3px 4px rgba(0, 0, 0, 0.12), -1px -1px 2px rgba(0, 0, 0, 0.05)',
    secondary: '0 4px 4px rgba(0, 0, 0, .05)',
    around: `1px 1px 1px ${tinycolor(common.dark)
      .setAlpha(0.35)
      .toString()},
    -1px -1px 1px ${tinycolor(common.dark)
      .setAlpha(0.25)
      .toString()}`,
  },
  transitions: {
    short: 150,
    default: 250,
  },
  spacing: increment => GRID_UNIT * increment,
  borderRadius: increment => `${BORDER_RADIUS_COEFFICIENT * increment}`,
  breakpoints: gridTheme.breakpoints,
  mediaQueries: {
    up: breakpoint =>
      `@media screen and (min-width: ${gridTheme.breakpoints[breakpoint]}px)`,
    down: breakpoint =>
      `@media screen and (max-width: ${gridTheme.breakpoints[breakpoint] -
        1}px)`,
  },
};
