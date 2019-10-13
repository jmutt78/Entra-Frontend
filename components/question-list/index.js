import React from 'react';

import ListItem from '../ListItem';
import Pagination from '../pagination';

function QuestionList(props) {
  const { questions, page, paginationVariables, paginationQuery } = props;

  return (
    <>
      {questions &&
        questions.map(question => {
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

      {paginationQuery && (
        <Pagination
          page={page}
          query={paginationQuery}
          variables={paginationVariables}
          connectionKey="questionsConnection"
        />
      )}
    </>
  );
}

export default QuestionList;
