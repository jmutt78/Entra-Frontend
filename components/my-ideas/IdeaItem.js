import React from 'react';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

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

  title: {
    padding: '0px 0px 0px 15px',
    margin: 0,
    color: '#333',
    maxWidth: 800,
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'pointer'
  }
});

const IdeaItem = ({
  client,
  item: { idea, createdAt },
  classes,
  router,
  linkTo,
  user,
  userId,
  showDetails,
  display
}) => {
  function handleTracking(e) {
    Mixpanel.track('My Idea Link');
  }

  return (
    <Card className={classes.container}>
      <div className={classes.textBox}>
        <Link href={linkTo}>
          <a style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={handleTracking}
            >
              {idea}
            </Typography>
          </a>
        </Link>
        <div style={{ padding: '5px 0 10px 15px' }}>
          Created On <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
        </div>
      </div>
    </Card>
  );
};

export default withRouter(withStyles(styles)(IdeaItem));
