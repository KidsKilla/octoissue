import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle({
  body: {
    margin: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  'html,body': {
    minHeight: '100%',
    margin: 0,
    padding: 0,
  },
})
