import React, { useState, useEffect, createContext, useContext } from 'react';
import { initGA, logPageView } from '../../utils/analytics.js';

const PageContext = createContext();

export const usePageContext = () => {
  return useContext(PageContext);
};

export default ({ children }) => {
  const [sortBy, setSortBy] = useState('default');
  const [questionSearch, setQuestionSearch] = useState('');
  const [searchScope, setSearchScope] = useState('all');
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  useEffect(() => {
    console.log('searching', questionSearch, 'in scope', searchScope);
  }, [questionSearch, searchScope]);

  return (
    <PageContext.Provider
      value={{
        setSortBy,
        sortBy,
        questionSearch,
        setQuestionSearch,
        searchScope,
        setSearchScope
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
