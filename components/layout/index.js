import { useEffect } from 'react';
import { initGA, logPageView } from '../../utils/analytics.js';

export default ({ children }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return children;
};
