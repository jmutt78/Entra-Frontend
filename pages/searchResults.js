import React from 'react';
import SearchResultQuestions from '../components/search-results-questions';
import Layout from '../components/layout/index.js';

function SearchResults(props) {
  return (
    <Layout>
      <SearchResultQuestions searchTerm={props.query.searchTerm} />
    </Layout>
  );
}
export default SearchResults;
