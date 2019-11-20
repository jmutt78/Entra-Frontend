import React from 'react';
import { upperFirst } from 'lodash';

import ListItem from '../ListItem';
import PageHeader from '../PageHeader';
import Pagination from '../pagination';
import { withStyles } from '@material-ui/core/styles';
import Search from '../search/QuestionSearch';

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: 1200,
    minWidth: '90%',
    paddingRight: 10,
    marginLeft: 20
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  icon: {
    color: 'black'
  },
  customColumnStyle: {
    maxWidth: '.3px'
  },
  scrollableContainer: {
    overflow: 'auto',
    margin: 0
  }
});

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
    <div className={classes.container}>
      <PageHeader title={upperFirst(props.name) || 'Questions'} />
      {props.name === 'all questions' && <Search />}
      <ul
        className={classes.scrollableContainer}
        onScroll={e => handleScroll(e, onLoadMore)}
      >
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
    </div>
  );
}

export default withStyles(styles)(QuestionList);
