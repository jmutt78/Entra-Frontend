import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import 'react-step-progress-bar/styles.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ProgressBar, Step } from 'react-step-progress-bar';
import Link from 'next/link';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import './Step.css';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: 10
  },

  badgeTitle: {
    width: '100%',
    lineHeight: '50px',
    padding: '30px 20px 15px 30px',

    alignItems: 'center'
  },
  card: {
    width: '100%',
    maxWidth: 1000
  },
  title: {
    color: '#2d3436', //theme.palette.accent.dark,
    padding: '40px 0 20px 50px',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: '2.5rem'
  },
  item: {
    width: '100%',
    lineHeight: '50px',
    padding: '10px 50px 30px 50px',

    alignItems: 'center'
  }
}));

const BadgeTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

const StepBar = ({
  level1,
  level2,
  level3,
  level4,
  level,
  points,
  classes
}) => {
  return (
    <div className={classes.item}>
      <ProgressBar percent={level} filledBackground="#85bdcb">
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            ></div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <BadgeTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Level 1 - 500 Points
                    </Typography>
                    <b>{'Share social media handles.'}</b>
                    <b>{'Added to Leaderboard.'}</b>
                  </React.Fragment>
                }
              >
                <img
                  src="/static/winner.svg"
                  alt="winner badge"
                  style={{
                    filter: `grayscale(${accomplished ? 0 : 80}%)`,
                    maxWidth: 45
                  }}
                />
              </BadgeTooltip>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <BadgeTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Level 2 - 1000 Points
                    </Typography>
                    <b>{'Share your email address and website.'}</b>
                    <br></br>
                  </React.Fragment>
                }
              >
                <img
                  src="/static/heart.svg"
                  alt="heart badge"
                  style={{
                    filter: `grayscale(${accomplished ? 0 : 80}%)`,
                    maxWidth: 45
                  }}
                />
              </BadgeTooltip>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <BadgeTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Level 3 - 1500 Points
                    </Typography>
                    <b>{'Receive an Entra sticker pack'}</b>
                  </React.Fragment>
                }
              >
                <img
                  src="/static/check.svg"
                  alt="check badge"
                  style={{
                    filter: `grayscale(${accomplished ? 0 : 80}%)`,
                    maxWidth: 45
                  }}
                />
              </BadgeTooltip>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <BadgeTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Level 4 - 2000 Points
                    </Typography>
                    <b>{'Recieve Entra ballcap and tee.'}</b>
                    <br></br>
                    <b>
                      {
                        'You are now a pro! A crown is now visible next to your name.'
                      }
                    </b>
                  </React.Fragment>
                }
              >
                <img
                  src="/static/champ.svg"
                  alt="champion badge"
                  style={{
                    filter: `grayscale(${accomplished ? 0 : 80}%)`,
                    maxWidth: 45
                  }}
                />
              </BadgeTooltip>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default function BadgesDisplay({ user }) {
  const classes = useStyles();

  const points = user.points;
  const level1 = user.mastery.level1;
  const level2 = user.mastery.level2;
  const level3 = user.mastery.level3;
  const level4 = user.mastery.level4;

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          Mastery
        </Typography>
        <StepBar
          classes={classes}
          level={(points / 2000) * 100}
          points={points}
          level1={level1}
          level2={level2}
          level3={level3}
          level4={level4}
        />
        <div className={classes.badgeTitle}>
          <Link href="/points">
            <Button size="medium">
              You have {points} points! Learn More >>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
