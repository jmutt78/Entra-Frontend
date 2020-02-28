import React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PageHeader from '../PageHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Points from '../points/index.js';
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
    padding: '1.5rem 0 3rem 1.2rem'
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

  pointsContainer: {
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

function getSteps() {
  return [
    'A Note from our founder',
    `Entra's Q&A`,
    `Entra's Business Idea
  Feature`,
    `Mastery System`
  ];
}

function getStepContent(
  stepIndex,
  noteContainer,
  subtitle,
  paragraph,
  credits,
  sectionTitle,
  pointsContainer
) {
  switch (stepIndex) {
    case 0:
      return (
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
      );
    case 1:
      return (
        <div className="video-container">
          {' '}
          <Typography variant="h6" className={sectionTitle}>
            Watch the video below to learn how to use Entra's Q&A Feature!
          </Typography>
          <div className="youtube-box">
            <iframe
              title="video"
              src="//www.youtube.com/embed/isFVLtFm8aI"
              allowFullScreen
              frameBorder="0"
              allow="autoplay; encrypted-media"
              className="youtube-iframe"
            ></iframe>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="video-container">
          {' '}
          <Typography variant="h6" className={sectionTitle}>
            Watch the video below to learn how to use Entra's Business Idea
            Feature!
          </Typography>
          <div className="youtube-box">
            <iframe
              title="video"
              src="//www.youtube.com/embed/3xum5UVXH9M"
              allowFullScreen
              frameBorder="0"
              allow="autoplay; encrypted-media"
              className="youtube-iframe"
            ></iframe>
          </div>
        </div>
      );
    case 3:
      return <Points welcome={true} />;

    default:
      return 'Unknown stepIndex';
  }
}

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

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className="main-welcome-container">
      <PageHeader title={'Welcome To Entra!'} />
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ background: '#fafafa' }}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {allStepsCompleted() ? null : (
        <Grid container className={container}>
          {getStepContent(
            activeStep,
            noteContainer,
            subtitle,
            paragraph,
            credits,
            sectionTitle
          )}
        </Grid>
      )}

      <div className={buttonContainer}>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              {activeStep !== 3 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
              ) : null}

              <Link href="/tag-select">
                <Button
                  type="button"
                  onClick={e => {
                    Mixpanel.track('Welcome Next');
                  }}
                  style={{ margin: '0.5rem' }}
                >
                  {activeStep === 3 ? 'Finish' : 'Skip'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
