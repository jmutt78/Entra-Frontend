import React from 'react';

import Grid from '@material-ui/core/Grid';
import PageHeader from '../PageHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './index.css';

const useStyles = makeStyles(({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },
  subtitle: {
    fontSize: '25px',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem',
    paddingLeft: '1.2rem'
  },
  sectionTitle: {
    fontSize: '30px',
    fontWeight: 700,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem',
    padding: '1.5rem 0 1rem 1.2rem'
  },
  paragraph: {
    fontSize: '16px',
    padding: '0 1rem',
    maxWidth: 800
  },
  credits: {
    padding: '0 1rem',
    fontStyle: 'italic',
    fontWeight: 500
  },
  noteContainer: {
    marginTop: '2rem',
    marginBottom: '2rem',
    background: palette.secondary.main,
    padding: '1rem 0.5rem',
    borderRadius: 2
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '1rem'
  }
}));

export default props => {
  const {
    container,
    credits,
    noteContainer,
    paragraph,
    sectionTitle,
    subtitle
  } = useStyles();
  return (
    <div className={props.welcome ? null : 'main-welcome-container'}>
      <PageHeader title={'Points and Mastery System'} />
      <Grid container className={container}>
        <div className={noteContainer}>
          <Typography variant="h2" className={sectionTitle}>
            Mastery
          </Typography>
          <Typography variant="h3" className={subtitle}>
            Level 1 - 500 Points
          </Typography>
          <p className={paragraph}>
            Share social media handles - Add your Instagram, Twitter, LinkedIn
            and Facebook handles.
          </p>

          <p className={paragraph}>
            Added to Leaderboard - Gain notoriety with the Entra community while
            learning and helping other entrepreneurs.
          </p>

          <Typography variant="h3" className={subtitle}>
            Level 2 - 1000 Points
          </Typography>
          <p className={paragraph}>
            Share your email address and website - Your personal contact info
            will be visible to other Entra community members if you choose.
          </p>
          <Typography variant="h3" className={subtitle}>
            Level 3 - 1500 Points
          </Typography>
          <p className={paragraph}>
            Receive an Entra sticker pack - Show your Entra community support
            with our high-quality sticker pack.
          </p>
          <Typography variant="h3" className={subtitle}>
            Level 4 - 2000 Points
          </Typography>
          <p className={paragraph}>
            Shhhhwwwwwaaag - Receive an Entra ball cap and Tee.
          </p>
          <p className={paragraph}>
            Receive a crown icon - You are now a pro! A crown is now visible
            next to your name.
          </p>
        </div>
      </Grid>
      <Grid container className={container}>
        <div className={noteContainer}>
          <Typography variant="h2" className={sectionTitle}>
            Points
          </Typography>
          <Typography variant="h3" className={subtitle}>
            Questions
          </Typography>
          <p className={paragraph}>+30 Points - Ask a question.</p>
          <p className={paragraph}>
            +5 Points - You select a top answer to your question.
          </p>
          <p className={paragraph}>
            +2 Points - A community member upvotes your question.
          </p>
          <p className={paragraph}>
            -2 Points - A community member downvotes your question.
          </p>

          <Typography variant="h3" className={subtitle}>
            Answers
          </Typography>
          <p className={paragraph}>+15 Points - Answer a question.</p>
          <p className={paragraph}>+30 Points - Your answer is selected.</p>
          <p className={paragraph}>
            +2 Points - A community member upvotes your answer.
          </p>
          <p className={paragraph}>
            -2 Points - A community member downvotes your answer.
          </p>
          <Typography variant="h3" className={subtitle}>
            Bounty
          </Typography>
          <p className={paragraph}>
            A bounty is a special award given to answers.
          </p>
          <p className={paragraph}>
            It is funded by the points of the user who offers it, and is
            non-refundable.
          </p>
          <p className={paragraph}>
            If you see a question that has not gotten a satisfactory answer, a
            bounty may help attract more attention and more answers.
          </p>
          <p className={paragraph}>
            All bounties are paid for up front and non-refundable under any
            circumstances.
          </p>
        </div>
      </Grid>
    </div>
  );
};
