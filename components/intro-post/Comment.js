import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import { INTRO_QUERY } from './index';
import { CURRENT_USER_QUERY } from '../auth/User';
import ApproveComment from '../approval/AppoveComment.js';
import EditComment from './EditComment';
import Error from './../ErrorMessage';

export const DELETE_INTRO_COMMENT_MUTATION = gql`
  mutation DELETE_INTRO_COMMENT_MUTATION($id: ID!) {
    deleteIntroComment(id: $id) {
      id
    }
  }
`;

const Root = styled.div`
  flex-grow: 1;
  max-width: 850px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const NameContainer = styled.div`
  margin: 0 0 0 10px;

  a {
    text-decoration: none;
    color: #e27d60;
  }
`;

export const ButtonContainer = styled.div`
  padding: 0px 0 20px 0;
`;

export default function IntroComment({ me, comments, commentBy, introId }) {
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(true);
  };

  const setField = (field, val) => setEditing(false);

  const dateChecker =
    parseInt(
      (new Date() - new Date(comments.createdAt)) / (1000 * 60 * 60 * 24)
    ) <= 2;
  const ownsComment = me && commentBy.id === me.id;
  const hasPermissions =
    me &&
    me.permissions.some(permission =>
      ['ADMIN', 'MODERATOR'].includes(permission)
    );

  const canUpdate = (dateChecker && ownsComment) || hasPermissions;

  return (
    <Root>
      {!editing && (
        <Paper
          style={{
            background: '#f2f4ef',
            padding: '20px',
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: comments.body }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {commentBy.image === null || commentBy.image === '' ? (
              <Avatar
                style={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer'
                }}
              >
                {commentBy.display[0]}
              </Avatar>
            ) : (
              <Avatar
                alt={commentBy.name}
                src={commentBy.image}
                style={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer'
                }}
              />
            )}
            <NameContainer>
              <Link
                href={{
                  pathname: '/user',
                  query: { id: commentBy.id }
                }}
              >
                <a>{commentBy.display}</a>
              </Link>{' '}
              on{' '}
              <span>
                {format(parseISO(comments.createdAt), 'MMMM dd, yyyy')}
              </span>
            </NameContainer>
          </div>
          {canUpdate && (
            <ButtonContainer>
              <div>
                <ApproveComment
                  isApproved={comments.approval === true}
                  hasPermissions={hasPermissions}
                  approval={comments.approval}
                  id={comments.id}
                  introId={introId}
                />
              </div>
              <Mutation
                mutation={DELETE_INTRO_COMMENT_MUTATION}
                variables={{
                  id: comments.id
                }}
                refetchQueries={[
                  {
                    query: INTRO_QUERY,
                    variables: { id: introId }
                  },
                  { query: CURRENT_USER_QUERY }
                ]}
              >
                {(deleteIntroComment, { error, loading }) => {
                  if (loading)
                    return <CircularProgress style={{ margin: 20 }} />;
                  if (error) return <Error error={error} />;
                  const handleDelete = () => {
                    var r = confirm(
                      'Are you sure you want to delete your comment?'
                    );

                    if (r == true) {
                      return deleteIntroComment();
                    }
                  };
                  return (
                    <div>
                      <Button
                        color={'primary'}
                        disabled={loading}
                        onClick={handleDelete}
                        size="small"
                        style={{ float: 'right', color: 'red' }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                }}
              </Mutation>

              <Button
                size="small"
                style={{ float: 'right' }}
                onClick={handleClick}
              >
                Edit
              </Button>
            </ButtonContainer>
          )}
        </Paper>
      )}
      {editing && (
        <EditComment
          setEditing={setField.bind(null)}
          comments={comments}
          me={me}
          introId={introId}
        />
      )}
    </Root>
  );
}
