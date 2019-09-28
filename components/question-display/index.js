import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Answers from '../answers-display';
import ApproveQuestion from '../approval/AppoveQuestion.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateAnswer from '../create-answer';
import CreateBookMark from '../bookmark/CreateBookMark.js';
import DeleteQuestion from '../delete-question';
import Error from './../ErrorMessage.js';
import Icon from '../ui/Icon';
import NoQuestion from './NoQuestion';
import PromptBar from './PromptBar';
import Vote from '../Vote';
import questionQuery from './questionQuery';
import { CURRENT_USER_QUERY } from '../auth/User';

import './index.css';

const styles = ({ palette, layout }) => ({
  container: {
    width: '100%',
    maxWidth: 1000,
    paddingTop: 5,
    height: '100%',
    minHeight: 'calc(100%)-80px-80px' //layout.contentMinHeight,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'flex',
    alignItems: 'center'
  },
  titleText: {
    fontSize: '33px',
    lineHeight: '2.7rem',
    fontWeight: 600,
    letterSpacing: '-1px'
  },
  bodyText: {
    whiteSpace: 'pre-wrap',
    fontSize: '1rem'
  }
});

const viewsStyles = ({ palette, layout }) => ({
  viewsCount: {
    color: '#2d3436', //palette.accent.dark,
    fontSize: '1.2rem',
    padding: '5px 0 5px 8px'
  }
});

const creditsStyles = ({ palette, layout }) => ({
  creditsContainer: {
    padding: '0 0 10px 20px',
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: 70,
    height: 70,
    cursor: 'pointer'
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60'
  }
});

const editStyles = ({ palette, layout }) => ({
  editButton: {
    backgroundColor: palette.accent.blue
  }
});

export const CREATE_QUESTION_VIEW_MUTATION = gql`
  mutation CREATE_QUESTION_VIEW_MUTATION($questionId: ID!) {
    createQuestionView(questionId: $questionId)
  }
`;

const Wrapper = ({ client, classes, id, router }) => {
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
            router={router}
          />
        );
      }}
    </Query>
  );
};

const Tags = ({ tags, router }) => {
  if (!tags || !tags.length) return null;

  return (
    <div className="tagButtons">
      {tags.map(({ id, name }) => (
        <div key={id} style={{ padding: '2px 0' }}>
          <Button
            size="small"
            variant="contained"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              router.push({
                pathname: '/tags',
                query: { id }
              });
            }}
          >
            {name}
          </Button>
        </div>
      ))}
    </div>
  );
};

const Views = withStyles(viewsStyles)(({ views, classes }) => {
  return (
    <Tooltip title={`${views} views`} placement="top">
      <div className="viewContainer">
        <Icon src="/static/visibility.svg" />
        <span className={classes.viewsCount}>{`${views} ${
          views > 1 ? 'views' : 'view'
        }`}</span>
      </div>
    </Tooltip>
  );
});

const Bookmark = withStyles(viewsStyles)(({ user, question, classes }) => {
  if (!user) {
    return null;
  }

  return (
    <Tooltip title="Bookmark this" placement="top">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CreateBookMark user={user} question={question} />
      </div>
    </Tooltip>
  );
});

const Credits = withStyles(creditsStyles)(({ classes, user, createdAt }) => {
  return (
    <div className={classes.creditsContainer}>
      <Link
        href={{
          pathname: '/user',
          query: { id: user.id }
        }}
      >
        {user.image === null || user.image === '' ? (
          <Avatar className={classes.avatar}>{user.display[0]}</Avatar>
        ) : (
          <Avatar alt={user.name} src={user.image} className={classes.avatar} />
        )}
      </Link>

      <div style={{ padding: '0 0 0 10px' }}>
        Asked by{' '}
        <Link
          href={{
            pathname: '/user',
            query: { id: user.id }
          }}
        >
          <a className={classes.nameLink}>{user.display}</a>
        </Link>{' '}
        on <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
      </div>
    </div>
  );
});

const EditSection = withStyles(editStyles)(
  ({ question, user, classes, hasPermissions }) => {
    const answers = question.answers.length;
    const date1 = new Date(question.createdAt);
    const date2 = new Date();
    const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

    return (user &&
      question.askedBy[0].id === user.id &&
      diffDays <= 1 &&
      !answers) ||
      hasPermissions ? (
      <>
        <Typography className="editSection-container" component={'div'}>
          {user &&
            question.askedBy[0].id === user.id &&
            diffDays <= 1 &&
            !answers && (
              <>
                <Link
                  href={{
                    pathname: '/edit-question',
                    query: { id: question.id }
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.editButton}
                  >
                    EDIT
                  </Button>
                </Link>
                <DeleteQuestion id={question.id} />
              </>
            )}
          {hasPermissions && (
            <div style={{ display: 'inline', paddingLeft: 5 }}>
              <ApproveQuestion
                hasPermissions={hasPermissions}
                isApproved={question.approval === true}
                id={question.id}
                approval={question.approval}
              />
            </div>
          )}
        </Typography>

        <div className="questionDetail-divider">
          <Divider variant="middle" />
        </div>
      </>
    ) : null;
  }
);

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

          // if (!ownsQuestion && !hasPermissions && question.approval === true) {
          //   return <NoQuestion />;
          // }

          return (
            <div className={classes.container} id="tableBorderRemoveTarget">
              <div className="titleContainer">
                <Typography variant="h6" className={classes.title}>
                  <div className="voteContainer">
                    <Vote id={question.id} />
                  </div>
                  <div className={classes.titleText}>{question.title}</div>
                </Typography>
              </div>

              <div className="subHeadingContainer">
                <Tags tags={question.tags} router={this.props.router} />
                <div
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    padding: '10px 0 20px 0',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <Bookmark user={user} question={question} />
                  {'   '}
                  <Views views={question.views} />
                </div>
              </div>

              <div className="questionDetail-divider">
                {user ? <Divider variant="middle" /> : <PromptBar />}
              </div>

              {question.description && (
                <div className="QuestionDetail-body">
                  <div className={classes.bodyText}>{question.description}</div>
                </div>
              )}

              <Credits
                user={question.askedBy[0]}
                createdAt={question.createdAt}
              />

              <div style={{ maxWidth: 1000, padding: '15px 0 20px 0' }}>
                <Divider variant="middle" />
              </div>

              <EditSection
                question={question}
                user={user}
                classes={classes}
                hasPermissions={hasPermissions}
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

export default withRouter(withStyles(styles)(withApollo(Wrapper)));
