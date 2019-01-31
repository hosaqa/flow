import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const lightTheme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  colors: {
    border: '#dcdcdc',
    content: '#f8f8f8',
    contentPreload: '#fff',
    skeleton: '#eee',
    skeletonSecondary: '#dadada',
    button: '#000',
    buttonDisabled: '#dedede'
  },
  colorFontPrimary: '#1f2023',
  colorFontSecondary: '#212121',
  colorButton: '#000',
  colorButtonDisabled: '#dedede',
  colorMainBg: '#f9f9f9',
  // colorMainBg: '#efefef',
  colorAccent: '#ff7070',
  colorDraggableBg: 'rgba(255, 112, 112, 0.50)',
  colorGradientStart: '#f90dc9',
  colorGradientEnd: '#ff1d1d',
  borderRadiusMain: '3px',
  shadowPrimary:
    '2px 4px 4px rgba(0, 0, 0, .17), -1px -1px 2px rgba(0, 0, 0, .1)'
};

export const gridTheme = {
  breakpoints: {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 575
  },
  container: {
    padding: 0,
    maxWidth: {
      xl: 1024,
      lg: 960,
      md: 720,
      sm: 540,
      xs: 540
    }
  }
};

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i');
  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  img {
    max-width: 100%;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
`;
