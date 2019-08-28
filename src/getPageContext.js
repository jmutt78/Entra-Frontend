import { SheetsRegistry } from 'jss'
// TODO - removed because MUI is buggy as hell and throws here. Try again when they update
// import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import theme from './theme'

function createPageContext() {
  return {
    theme: createMuiTheme(theme),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    // generateClassName: createGenerateClassName(),
  }
}

let pageContext

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext()
  }

  return pageContext
}
