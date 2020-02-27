import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import DOMPurify from 'dompurify';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '../Avatar';
import { Mixpanel } from '../../utils/Mixpanel';
import './index.css';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    maxWidth: '1000px',
    height: '160px',
    borderRadius: 0,
    borderBottom: '1px solid #e8e8e8'
  },

  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },

  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60'
  }
});

const IdeaItem = ({
  client,
  item: { body, createdAt },
  classes,
  router,
  linkTo,
  user,
  userId,
  showDetails,
  display
}) => {
  function handleTracking(e) {
    Mixpanel.track('Idea Link');
  }

  function handleUserTracking(e) {
    Mixpanel.track('User Profile');
  }
  const html = DOMPurify.sanitize(body);

  return (
    <Card className={classes.container}>
      <div className="avatarBox">
        <Avatar me={user} small linkToId={userId} />
      </div>
      <div className={classes.textBox}>
        <Link href={linkTo}>
          <a style={{ textDecoration: 'none' }}>
            <div
              className="giveMeEllipsis"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </a>
        </Link>
        <div style={{ padding: '5px 0 10px 0', fontSize: '.75rem' }}>
          Created by {}
          <Link
            href={{
              pathname: '/user',
              query: { id: userId }
            }}
          >
            <a className={classes.nameLink} onClick={handleUserTracking}>
              {display}
            </a>
          </Link>{' '}
          on <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
        </div>
      </div>
    </Card>
  );
};

export default withRouter(withStyles(styles)(IdeaItem));
