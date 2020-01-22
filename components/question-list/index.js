import React, { useEffect, useState } from 'react';
import { upperFirst } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '../ListItem';
import PageHeader from '../PageHeader';
import Search from '../search/QuestionSearch';
import { QuestionListContainer } from '../../src/styledComponents';

const useStyles = makeStyles(theme => ({
  search: {
    padding: '5px 0px 5px 35px'
  }
}));

function QuestionList(props) {
  const { questions, onLoadMore, name, hasMoreQuestions } = props;
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
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
      <div className={classes.search}>
        <Search />
      </div>
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
