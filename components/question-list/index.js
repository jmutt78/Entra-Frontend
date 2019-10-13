import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// import { perPage } from '../../config.js';
import { usePageContext } from '../layout';
import ListItem from '../ListItem';
// import Pagination from '../pagination';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY(
    $filter: String!
    $searchScope: String
    $searchTerm: String
  ) {
    questionsConnection(
      filter: $filter
      searchScope: $searchScope
      searchTerm: $searchTerm
    ) {
      aggregate {
        count
      }
    }
  }
`;

function QuestionList({ filter, fetchMore, questions }) {
  const { searchScope, searchTerm } = usePageContext();
  const { loading, error, data } = useQuery(PAGINATION_QUERY, {
    variables: {
      searchScope,
      searchTerm,
      filter
    }
  });

  // const { questions, page, paginationVariables, paginationQuery } = props;

  if (!questions || !questions.length || loading || error) return null;

  const { count } = data.questionsConnection.aggregate;
  // const pages = Math.ceil(count / perPage)

  return (
    <InfiniteScroll
      dataLength={count}
      next={fetchMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {questions.map(question => {
        return (
          <ListItem
            item={question}
            user={question.askedBy[0]}
            userId={question.askedBy[0].id}
            linkTo={{
              pathname: '/question',
              query: { id: question.id }
            }}
            showDetails={true}
            name={props.name}
            key={question.id}
            display={question.askedBy[0].display}
          />
        );
      })}
      }
    </InfiniteScroll>
  );
}

// {paginationQuery && (
//   <Pagination
//     page={page}
//     query={paginationQuery}
//     variables={paginationVariables}
//     connectionKey="questionsConnection"
//   />
// )}

export default QuestionList;
