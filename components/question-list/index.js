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
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%',
    paddingRight: 10
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
  questionListHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%'
  }
});

function QuestionList(props) {
  const {
    classes,
    questions,
    page,
    paginationVariables,
    paginationQuery
  } = props;

  return (
    <div className={classes.container}>
      <div className={classes.questionListHeader}>
        <PageHeader title={upperFirst(props.name) || 'Questions'} />
        {props.name === 'all questions' && <Search />}
      </div>
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
    </div>
  );
}

export default withStyles(styles)(QuestionList);
