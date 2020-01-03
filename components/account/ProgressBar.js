import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

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
    width: '100%',
    paddingTop: '10px'
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

  progress: {
    position: 'relative',
    height: '25px',
    width: '80%',
    borderRadius: '50px',
    border: '1.2px solid #85bdcb',
    display: 'inline-grid',
    marginLeft: '10px',
    marginRight: '10px'
  },

  filler: {
    background: '#85bdcb',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in'
  },
  boarderContainer: { display: 'flex' }
}));

const ProgressBar = props => {
  console.log(props);
  return (
    <div className={props.classes.boarderContainer}>
      <div className={props.classes.progress}>
        <Filler percentage={props.percentage} classes={props.classes} />
      </div>
    </div>
  );
};

const Filler = props => {
  return (
    <div
      className={props.classes.filler}
      style={{ width: `${props.percentage}%` }}
    />
  );
};

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
  const handleLevel = () => {
    const level1 = (points / 300) * 100;
    const level2 = (points / 500) * 100;
    const level3 = (points / 1000) * 100;
    const level4 = (points / 2000) * 100;
    if (level4 > 100) {
      return 100;
    } else {
      return level4;
    }
  };

  const points = user.points;
  return (
    <div className={classes.container}>
      <div>
        <div>
          <ProgressBar
            percentage={handleLevel()}
            classes={classes}
            name1={'Level 3'}
            name2={'Level 4'}
          />
        </div>
      </div>
    </div>
  );
}
