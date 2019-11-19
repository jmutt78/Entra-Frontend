const layout = {
  width: '100%',
  height: '100vh',
  headerHeight: 80,
  navHeight: 80
};

export default {
  palette: {
    primary: {
      light: '#ffdab2',
      // fg from logo
      main: '#e8a77f',
      dark: '#e27d60'
    },
    secondary: {
      // main content area bg
      light: '#fff',
      // bg from logo
      main: '#f2f4ef',
      // this is "sour lemon" from https://flatuicolors.com/palette/us
      dark: '#ffeaa7'
    },
    accent: {
      // "dracula orchid" from the us pallete. for text
      dark: '#2d3436',
      // for secondary buttons etc
      grey: '#b2bec3',
      blue: '#85bdcb'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },

  layout: {
    ...layout,
    contentMinHeight: `calc(${layout.height} - ${layout.headerHeight}px - ${layout.navHeight}px)`,
    scrollContentMinHeight: `calc(70vh - ${layout.headerHeight}px - ${layout.navHeight}px)`
  }
};
