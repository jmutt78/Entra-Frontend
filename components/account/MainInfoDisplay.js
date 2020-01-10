import React, { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Query, Mutation } from 'react-apollo';
import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { withStyles } from '@material-ui/core/styles';
import Share from './Share';
import Error from './../ErrorMessage.js';
import { Mixpanel } from '../../utils/Mixpanel';
import './index.css';

import { CURRENT_USER_QUERY_PROFILE } from '../auth/User';

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
    paddingLeft: '1.5rem',
    whiteSpace: 'nowrap'
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  icon: {
    marginRight: '10px',
    color: '#85BDCB',
    fontWeight: 'bold'
  },
  crown: {
    clear: 'both',
    display: 'inline-block',
    whiteSpace: 'nowrap'
  }
});

class MainInfoDisplay extends Component {
  handleEditTrack(e) {
    Mixpanel.track('Edit Account');
  }
  render() {
    return (
      <Query query={CURRENT_USER_QUERY_PROFILE}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          const { classes } = this.props;

          const user = this.props.user;
          const level4 = this.props.user.mastery.level4;
          const me = data.me;
          const social = user.shareSocial && this.props.user.mastery.level1;
          const emailTrue = user.shareEmail && this.props.user.mastery.level2;
          console.log(emailTrue);
          console.log(social);
          const crown = level4 ? (
            <div>
              <img
                src="/static/king.svg"
                alt="crown"
                style={{
                  maxWidth: 30,
                  filter: `invert(78%) sepia(5%) saturate(3581%) hue-rotate(333deg) brightness(91%) contrast(101%)`,
                  marginBottom: '25px',
                  marginRight: '-30px'
                }}
              />
              {user.name}
            </div>
          ) : (
            <div>{user.name}</div>
          );
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
                  {crown}
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
                {emailTrue || me === user ? (
                  <div>
                    <Typography variant="subtitle1">
                      <Link>
                        <a
                          href={`mailto: ${user.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            color: '#85BDCB',
                            fontWeight: 'bold'
                          }}
                        >
                          {user.email}
                        </a>
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1">
                      <Link>
                        <a
                          href={`http://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            color: '#85BDCB',
                            fontWeight: 'bold'
                          }}
                        >
                          {user.website}
                        </a>
                      </Link>
                    </Typography>
                  </div>
                ) : null}
                {social || me === user ? (
                  <div>
                    {user.instagram ? (
                      <a
                        href={`https://www.instagram.com/${user.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InstagramIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                      </a>
                    ) : null}

                    {user.twitter ? (
                      <a
                        href={`https://www.twitter.com/${user.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TwitterIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                      </a>
                    ) : null}

                    {user.facebook ? (
                      <a
                        href={`https://www.facebook.com/${user.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                      </a>
                    ) : null}

                    {user.linkedIn ? (
                      <a
                        href={`https://www.linkedin.com/${user.linkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedInIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                      </a>
                    ) : null}
                  </div>
                ) : null}
                <Typography>
                  Member Since {format(parseISO(dateToFormat), 'MMMM dd, yyyy')}
                </Typography>
              </div>

              {me ? (
                me.id === user.id ? (
                  <div>
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
                    <Share me={me} />
                  </div>
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
