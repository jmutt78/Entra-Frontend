import React, { useState } from 'react';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import TitleBar from '../header/TitleBar';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import Error from './../ErrorMessage.js';
import { usePageContext } from '../layout';

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%',
    paddingRight: 10
  }
});

const Questions = ({ classes }) => {
  const { searchScope, searchTerm, sortBy } = usePageContext();
  const [page, setPage] = useState(1);
  const filter = 'all';

  return (
    <div className={classes.container}>
      <TitleBar title={'All Questions'} sort={true} search={true} />
      <Query
        query={questionListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage,
          searchScope,
          searchTerm,
          sortBy
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { questions } = data;
          return (
            <QuestionList
              questions={questions}
              name={'all questions'}
              page={page}
              filter="all"
              fetchMore={() => setPage(page + 1)}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(Questions);
