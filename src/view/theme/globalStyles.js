import { css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import { lightTheme } from './index';

export const globalStyles = css`
  ${emotionNormalize}
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i');

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 900;
    src: local('Montserrat Black Italic'), local('Montserrat-BlackItalic'),
      url(https://fonts.gstatic.com/s/montserrat/v14/JTUPjIg1_i6t8kCHKm459WxZSgnz_PZw.woff2)
        format('woff2'),
      url(https://fonts.gstatic.com/s/montserrat/v14/JTUPjIg1_i6t8kCHKm459WxZSgnz_PZ2.woff)
        format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: ${lightTheme.spacing(2)}px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${lightTheme.palette.background.secondary};
  }

  #root {
    z-index: 10;
    position: relative;
  }

  img {
    max-width: 100%;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  iframe {
    display: block;
  }
`;
