import React, { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Query } from 'react-apollo';
import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import { Mixpanel } from '../../utils/Mixpanel';
import './index.css';

import { CURRENT_USER_QUERY } from '../auth/User';

const styles = theme => ({
  container: {
    width: '100%',
    padding: '40px 0 20px 0'
  },
  bigAvatar: {
    width: 120,
    height: 120
  },
  grid: {
    margin: theme.spacing(1)
  },
  root: {
    margin: theme.spacing(1),
    marginTop: 40
  },
  divider: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(1)
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10
  },
  name: {
    paddingLeft: '1.5rem'
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  }
});

class MainInfoDisplay extends Component {
  handleEditTrack(e) {
    Mixpanel.track('Edit Account');
  }
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          const { classes } = this.props;

          const user = this.props.user;
          const me = data.me;

          const dateToFormat = this.props.user.createdAt;

          return (
            <div className={classes.container}>
              <div className={classes.avatarContainer}>
                {user.image ? (
                  <Avatar src={user.image} className={classes.bigAvatar} />
                ) : (
                  <Avatar className={classes.bigAvatar}>{user.name[0]}</Avatar>
                )}

                <Typography variant="h4" className={classes.name}>
                  {user.name}
                </Typography>
              </div>
              <div className={classes.detailsContainer}>
                <Typography variant="h6">{user.display}</Typography>
                <Typography variant="subtitle1">
                  Location: {user.location}
                </Typography>
                <Typography variant="subtitle1">
                  Industry: {user.industry}
                </Typography>
                <Typography>
                  Member Since {format(parseISO(dateToFormat), 'MMMM dd, yyyy')}
                </Typography>
              </div>

              {me ? (
                me.id === user.id ? (
                  <Typography style={{ padding: 20 }}>
                    <Link href="/account/editaccount">
                      <Button
                        variant="contained"
                        type="button"
                        onClick={this.handleEditTrack}
                      >
                        EDIT ACCOUNT INFO
                      </Button>
                    </Link>
                    <Link href="/tag-select">
                      <Button
                        style={{ marginLeft: 20 }}
                        variant="contained"
                        type="button"
                        onClick={this.handleEditTrack}
                      >
                        EDIT FEED
                      </Button>
                    </Link>
                  </Typography>
                ) : null
              ) : null}

              <Typography className="about">{user.about}</Typography>
              <Divider className={classes.divider} variant="middle" />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(MainInfoDisplay);
