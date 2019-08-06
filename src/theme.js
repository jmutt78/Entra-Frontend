export default {
  palette: {
    primary: {
      light: '#ffdab2',
      // fg from logo
      main: '#e8a77f',
      dark: '#e27d60',
    },
    secondary: {
      // main content area bg
      light: '#fff',
      // bg from logo
      main: '#f2f4ef',
      // this is "sour lemon" from https://flatuicolors.com/palette/us
      // ideally the nav + copyright footer will be in this color
      dark: '#ffeaa7',
    },
    accent: {
      // "dracula orchid" from the us pallete. for text
      dark: '#2d3436'
    }
  },
  typography: {
    useNextVariants: true,
  },
  layout: {
    width: '100vw',
    height: '100vh',
    headerHeight: 120,
    navHeight: 80,
  },
}