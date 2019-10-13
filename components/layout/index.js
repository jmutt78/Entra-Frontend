import React, { useState, useEffect, createContext, useContext } from 'react';
import { initGA, logPageView } from '../../utils/analytics.js';

const PageContext = createContext();

export const usePageContext = () => {
  return useContext(PageContext);
};

export default ({ children }) => {
  const [sortBy, setSortBy] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchScope, setSearchScope] = useState('all');
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  // useEffect(() => {
  //   console.log('searching', searchTerm, 'in scope', searchScope);
  // }, [searchTerm, searchScope]);

  return (
    <PageContext.Provider
      value={{
        setSortBy,
        sortBy,
        searchTerm,
        setSearchTerm,
        searchScope,
        setSearchScope
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
