import React from 'react';
import { Query } from 'react-apollo';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Error from './../ErrorMessage.js';
import { CURRENT_USER_QUERY } from '../auth/User';
import Answer from './Answer';

const styles = ({ spacing, palette, layout }) => ({
  title: {
    color: '#2d3436',
    padding: '15px 0 20px 20px',
    maxWidth: 800,
    fontWeight: 500,
    textAlign: 'left'
    // lineHeight: "2rem",
  }
});

const Answers = ({ classes, question, user }) => {
  const { answers } = question;

  return question.answers.length === 0 ? null : (
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        const user = data.me;

        return (
          <div className="answerDisplay-container">
            {answers === null || answers === '' || !answers.length ? null : (
              <Typography variant="h5" className={classes.title}>
                {answers.length} Answer{answers.length > 1 ? 's' : ''}
              </Typography>
            )}

            {answers.map(answer => (
              <Answer
                answer={answer}
                user={user}
                question={question}
                key={answer.id}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(Answers);
