import React, { useState, useEffect, createContext, useContext } from 'react';
import { initGA, logPageView } from '../../utils/analytics.js';

const PageContext = createContext();

export const usePageContext = () => {
  return useContext(PageContext);
};

export default ({ children }) => {
  const [sortBy, setSortBy] = useState('default');
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <PageContext.Provider
      value={{
        setSortBy,
        sortBy
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
