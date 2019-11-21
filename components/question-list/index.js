import React from 'react';
import { upperFirst } from 'lodash';

import ListItem from '../ListItem';
import PageHeader from '../PageHeader';
import Search from '../search/QuestionSearch';
import { QuestionListContainer } from '../../src/styledComponents';

function QuestionList(props) {
  const { classes, questions, onLoadMore } = props;

  const handleScroll = ({ currentTarget }, onLoadMore) => {
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight
    ) {
      onLoadMore();
    }
  };

  return (
    <QuestionListContainer>
      <PageHeader title={upperFirst(props.name) || 'Questions'} />
      {props.name === 'all questions' && <Search />}
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
                name={props.name}
                key={question.id}
                display={question.askedBy[0].display}
              />
            );
          })}
      </ul>
    </QuestionListContainer>
  );
}

export default QuestionList;
