import { css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

export const globalStyles = css`
  ${emotionNormalize}
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i');
  @import url('https://fonts.googleapis.com/css?family=Montserrat:900i');
  body {
    font-family: 'Source Sans Pro', sans-serif;
    min-height: 4000px;
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
