import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const lightTheme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  colorFontPrimary: '#1f2023',
  colorFontSecondary: '#212121',
  colorButton: '#1f2023',
  colorButtonDisabled: '#797979',
  colorMainBg: '#f9f9f9',
  // colorMainBg: '#efefef',
  colorAccent: '#ff7070',
  colorDraggableBg: 'rgba(255, 112, 112, 0.50)',
  colorGradientStart: '#f90dc9',
  colorGradientEnd: '#ff1d1d',
  borderRadiusMain: '3px',
  shadowMain: '1px 1px 2px rgba(0, 0, 0, .25)'
};

injectGlobal`
  ${styledNormalize}

  body {
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i');
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
