import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  container: {
    width: '100%'
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
  boarderContainer: {}
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 30,
    backgroundColor: lighten('#ff6c5c', 0.9)
  },
  bar: {
    borderRadius: 40,
    backgroundColor: '#ff6c5c'
  }
})(LinearProgress);

export default function BadgesDisplay({ user }) {
  const classes = useStyles();

  const handleLevel1 = () => {
    const value = (points / 300) * 100;
    console.log(value);
    if (value > 100) {
      return 100;
    } else {
      return value;
    }
  };
  const handleLevel2 = () => {
    const value = (points / 500) * 100;
    console.log(value);
    if (value > 100) {
      return 100;
    } else {
      return value;
    }
  };
  const handleLevel3 = () => {
    const value = (points / 1000) * 100;
    console.log(value);
    if (value > 100) {
      return 100;
    } else {
      return value;
    }
  };
  const handleLevel4 = () => {
    const value = (points / 2000) * 100;
    console.log(value);
    if (value > 100) {
      return 100;
    } else {
      return value;
    }
  };

  const points = user.points;
  return (
    <div className={classes.container}>
      <div>
        {points < 300 ? (
          <div>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={handleLevel1()}
            />
          </div>
        ) : null}
        {points < 500 && points > 300 ? (
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={handleLevel2()}
          />
        ) : null}
        {points < 1000 && points > 500 ? (
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={handleLevel3()}
          />
        ) : null}
        <div>
          {points <= 2000 && points > 1000 ? (
            <div>
              <div>
                <div className={classes.boarderContainer}>
                  Yo
                  <BorderLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    color="secondary"
                    value={handleLevel4()}
                  />
                  yo
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
