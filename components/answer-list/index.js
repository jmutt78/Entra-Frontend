import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '../pagination';
import PageHeader from '../PageHeader';
import { upperFirst } from 'lodash';
import ListItem from '../ListItem';

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%'
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  }
});

class AnswerList extends Component {
  render() {
    const {
      classes,
      answers,
      page,
      paginationQuery,
      paginationVariables
    } = this.props;
    return (
      <div className={classes.container}>
        <PageHeader title={upperFirst(this.props.name) || 'Answers'} />
        {answers.map(answer => {
          return (
            <ListItem
              key={answer.id}
              item={answer}
              linkTo={{
                pathname: '/question',
                query: { id: answer.answeredTo[0].id }
              }}
              userName={answer.answeredBy.name}
              userId={answer.answeredBy.id}
              display={answer.answeredBy.display}
            />
          );
        })}

        {paginationQuery && (
          <Pagination
            page={page}
            query={paginationQuery}
            variables={paginationVariables}
            connectionKey="answersConnection"
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AnswerList);
