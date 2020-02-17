import React from 'react';
import SearchResultQuestions from '../components/search-results-questions';
import Layout from '../components/layout/index.js';
import { ScrollablePageContainer } from '../src/styledComponents';

function SearchResults(props) {
  return (
    <Layout>
      <ScrollablePageContainer>
        <SearchResultQuestions searchTerm={props.query.searchTerm} />
      </ScrollablePageContainer>
    </Layout>
  );
}
export default SearchResults;
