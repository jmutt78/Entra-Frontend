import ReactGA from 'react-ga';
const google = () =>
  process.env.NODE_ENV !== 'production' ? '//////////' : 'UA-145851763-1';

export const initGA = () => {
  ReactGA.initialize(google);
};
export const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({ category, action });
    }
  }
};
export const logException = (description = '', fatal = false) => {
  if (description) {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.exception({ description, fatal });
    }
  }
};
