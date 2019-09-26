import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Answers from '../answers-display';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateAnswer from '../create-answer';
import CreateBookMark from '../bookmark/CreateBookMark.js';
import Error from './../ErrorMessage.js';
import NoQuestion from './NoQuestion';
import QuestionDetail from './QuestionDetail';
import Vote from '../Vote';
import questionQuery from './questionQuery';
import { CURRENT_USER_QUERY } from '../auth/User';

import './index.css';

const styles = ({ palette, layout }) => ({
  container: {
    width: '100%',
    maxWidth: 1200,

    height: '100%',
    minHeight: 'calc(100%)-80px-80px' //layout.contentMinHeight,
  },
  title: {
    display: 'flex',
    fontSize: '30px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '2.4rem',
    fontWeight: 600,
    letterSpacing: '-1px'
  },
  voteContainer: {
    display: 'flex'
  },
  voteButton: {
    cursor: 'pointer'
  },
  upVote: {
    color: palette.primary.main,
    fontSize: '1.4rem',
    padding: '0 1rem'
  },
  downVote: {
    color: '#85bdcb', //palette.accent.blue,
    fontSize: '1.4rem',
    padding: '0 1rem'
  },
  viewsCount: {
    color: '#2d3436', //palette.accent.dark,
    fontSize: '1.4rem'
  }
});

export const CREATE_QUESTION_VIEW_MUTATION = gql`
  mutation CREATE_QUESTION_VIEW_MUTATION($questionId: ID!) {
    createQuestionView(questionId: $questionId)
  }
`;

const Wrapper = ({ client, classes, id }) => {
  return (
    <Query
      query={questionQuery}
      variables={{
        id
      }}
    >
      {({ data: { question }, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (!question) {
          return <p>Question not found</p>;
        }

        return (
          <DisplayQuestion
            question={question}
            client={client}
            classes={classes}
          />
        );
      }}
    </Query>
  );
};

class DisplayQuestion extends Component {
  componentDidMount() {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VIEW_MUTATION,
      variables: {
        questionId: this.props.question.id
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.question.id } }
      ]
    });

    this.props.client.query({
      query: CURRENT_USER_QUERY
    });
  }
  render() {
    const { classes, question } = this.props;

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const user = data.me;

          const askedby = question.askedBy[0] || null;
          const hasPermissions =
            !!user &&
            user.permissions.some(permission =>
              ['ADMIN', 'MODERATOR'].includes(permission)
            );
          const ownsQuestion = !!askedby && !!user && askedby.id === user.id;
          const isApproved = question.approval === true;

          if (!ownsQuestion && !hasPermissions && !isApproved) {
            return <NoQuestion />;
          }

          return (
            <div className={classes.container} id="tableBorderRemoveTarget">
              <div className="titleContainer">
                <Typography variant="h6" className={classes.title}>
                  <Vote id={question.id} />
                  {question.title}
                </Typography>

                <div className="controls">
                  {user && (
                    <Tooltip title="Bookmark this" placement="top">
                      <CreateBookMark user={user} question={question} />
                    </Tooltip>
                  )}
                </div>
              </div>

              <QuestionDetail
                item={question}
                linkTo={{
                  pathname: '/question',
                  query: { id: question.id }
                }}
                question={question}
                user={user}
              />

              <Answers id={this.props.id} question={question} />
              <CreateAnswer question={question} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withApollo(Wrapper));
