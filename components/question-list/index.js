import React, { useEffect, useState } from 'react';
import { upperFirst } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from '../ListItem';
import PageHeader from '../PageHeader';
import Search from '../search/QuestionSearch';
import { QuestionListContainer } from '../../src/styledComponents';

function QuestionList(props) {
  const { questions, onLoadMore, name, hasMoreQuestions } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [questions]);

  const handleScroll = (e, onLoadMore) => {
    e.preventDefault();
    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
      e.currentTarget.scrollHeight
    ) {
      setIsLoading(true);
      if (isLoading === false) {
        onLoadMore();
      }
    }
  };

  return (
    <QuestionListContainer>
      <PageHeader title={upperFirst(name)} />
      <ul onScroll={e => handleScroll(e, onLoadMore)}>
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
                name={name}
                key={question.id}
                display={question.askedBy[0].display}
              />
            );
          })}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading && hasMoreQuestions && (
          <CircularProgress
            style={{ marginBottom: 20, position: 'absolute', bottom: 0 }}
          />
        )}
      </div>
    </QuestionListContainer>
  );
}

export default QuestionList;
