import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const lightTheme = {
  colorFontPrimary: '#1f2023',
  colorFontSecondary: '#212121',
  colorButtons: '#1f2023',
  colorAccentBg: '#efefef',
  colorAccent: '#ff7070',
  colorDraggableBg: 'rgba(255, 112, 112, 0.50)',
  colorGradientStart: '#f90dc9',
  colorGradientEnd: '#ff1d1d'
}



injectGlobal`
  ${styledNormalize}

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
`