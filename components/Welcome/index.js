import React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PageHeader from '../PageHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Mixpanel } from '../../utils/Mixpanel';
import './index.css';

const useStyles = makeStyles(({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },
  subtitle: {
    fontSize: '30px',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem',
    paddingLeft: '1.2rem'
  },
  sectionTitle: {
    fontSize: '30px',
    fontWeight: 700,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem',
    padding: '0.5rem 0 2rem 1.2rem'
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
    marginTop: '1rem',
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

export default () => {
  const {
    container,
    credits,
    noteContainer,
    paragraph,
    sectionTitle,
    subtitle,
    buttonContainer
  } = useStyles();
  return (
    <div>
      <Grid container className={container}>
        <PageHeader title={'Welcome To Entra!'} />
        <div className={noteContainer}>
          <Typography variant="h6" className={subtitle}>
            A Note from our founder
          </Typography>

          <p className={paragraph}>
            When I was starting out in business, it was tough to find a
            community of people to advise me on what to do. I had to rely on the
            few mentors in my life (mostly my father).{' '}
          </p>

          <p className={paragraph}>
            When I gained some experience and became more seasoned, I made it my
            priority to help other entrepreneurs in their journey.{' '}
          </p>

          <p className={paragraph}>
            Entra is a place for entrepreneurs to show off their expertise, help
            other people, and strengthen our community. This is something I wish
            I’d had when starting out and why I’m excited to share it with you.
          </p>
          <p className={credits}>- Justin McIntosh, CEO</p>
        </div>

        <Typography variant="h6" className={sectionTitle}>
          Watch the video below to learn how to use Entra!
        </Typography>

        <div className="youtube-box">
          <iframe
            title="video"
            src="//www.youtube.com/embed/3mxnannKu3E"
            allowFullScreen
            frameBorder="0"
            allow="autoplay; encrypted-media"
            className="youtube-iframe"
          ></iframe>
        </div>
      </Grid>
      <div className={buttonContainer}>
        <Link href="/tag-select">
          <Button
            variant="contained"
            type="button"
            onClick={e => {
              Mixpanel.track('Welcome Next');
            }}
            style={{ margin: '0.5rem' }}
          >
            NEXT
          </Button>
        </Link>
      </div>
    </div>
  );
};
