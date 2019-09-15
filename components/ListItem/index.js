import React from 'react';
import { withRouter } from 'next/router';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '../Avatar';
import './index.css';

export const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`;

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },

  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  votesBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4.5rem',
    padding: '0 1rem',
    cursor: 'pointer'
  },
  votesCount: {
    fontWeight: 600
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },

  title: {
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,

    fontWeight: 'bold',
    lineHeight: '3rem'
  },
  body: {
    fontSize: '1rem',
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
    lineHeight: '2.1rem'
  },
  // tags: {},

  // nameLink: {
  //   fontWeight: 500,
  //   textDecoration: 'none',
  //   color: '#e27d60'
  // },
  button: {
    // /color: palette.primary.dark
  }
});

const ListItem = ({
  question,
  client,
  item: {
    answers,
    askedBy,
    body,
    createdAt,
    description,
    downVotes,
    id,
    link,
    tags,
    title,
    upVotes,
    views
  },
  classes,
  router,
  linkTo,
  user,
  userId,
  showDetails,
  display
}) => {
  const upVote = () => {
    client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: id,
        vote: 'up'
      }
      // refetchQueries: [{ query: questionQuery, variables: { id } }],
    });
  };
  const downVote = () => {
    client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: id,
        vote: 'down'
      }
      // refetchQueries: [{ query: questionQuery, variables: { id } }],
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.avatarBox}>
        <Avatar me={user} small />
      </div>
      <div className={classes.votesBox}>
        <Tooltip title="vote up" placement="top" onClick={upVote}>
          <UpIcon />
        </Tooltip>
        <div className={classes.votesCount}>{upVotes - downVotes}</div>
        <Tooltip title="vote down" placement="top" onClick={downVote}>
          <DownIcon />
        </Tooltip>
      </div>

      <div className={classes.textBox}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>

        <Typography variant="h5" className={classes.body}>
          {body || description}
        </Typography>

        {/*tags && (
          <div className="tags">
            {tags.map(({ id, name }) => (
              <div key={id} style={{ padding: '2px 0' }}>
                <Button
                  key={id}
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push({
                      pathname: '/tags',
                      query: { id: id },
                    })
                  }}
                >
                  {name}
                </Button>
              </div>
            ))}
          </div>
        )*/}
      </div>

      {/*
          <Typography style={{ paddingTop: 5 }}>
            <span>Posted by </span>
            <Link
              href={{
                pathname: '/user',
                  query: { id: userId }
              }}
            >
              <a className={classes.nameLink}>{display}</a>
          </Link>
          <span> on </span>
          <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
          </Typography>
      */}

      {/*showDetails && (
        <>
          <TableCell>{answers.length}</TableCell>
          <CustomTableCell>{views}</CustomTableCell>
        </>
      )*/}
    </div>
  );
};

export default withRouter(withStyles(styles)(withApollo(ListItem)));
