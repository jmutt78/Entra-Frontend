import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  veiwButton: {
    width: '300px',
    height: '3.5rem',
    maxWidth: '90%',
    border: 'none',
    borderRadius: '100px',
    background: '#85bdcb',
    margin: '0 70px 5rem 70px',
    padding: '5px'
  }
}));

const Demo = () => {
  const [question, setQuestion] = useState(true);
  const [idea, setIdea] = useState(false);
  const [ask, setAsk] = useState(true);
  const [vote, setVote] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [accept, setAccept] = useState(false);
  const [questionButton, setQuestionButton] = useState(true);
  const [ideaButton, setIdeaButton] = useState(false);
  const classes = useStyles();

  const handleAsk = () => {
    setAsk(true);
    setVote(false);
    setAnswer(false);
    setAccept(false);
  };
  const handleVote = () => {
    setAsk(false);
    setVote(true);
    setAnswer(false);
    setAccept(false);
  };
  const handleAnswer = () => {
    setAsk(false);
    setVote(false);
    setAnswer(true);
    setAccept(false);
  };
  const handleAccept = () => {
    setAsk(false);
    setVote(false);
    setAnswer(false);
    setAccept(true);
  };
  const handleQuestionClick = () => {
    setQuestionButton(true);
    setIdeaButton(false);
    setQuestion(true);
    setIdea(false);
    setAsk(true);
    setVote(false);
    setAnswer(false);
    setAccept(false);
  };

  const handleIdeaClick = () => {
    setQuestionButton(false);
    setIdeaButton(true);
    setQuestion(false);
    setIdea(true);
    setAsk(true);
    setVote(false);
    setAnswer(false);
    setAccept(false);
  };
  const questionButtons = [
    {
      name: 'Ask A Question',
      image: 'https://via.placeholder.com/300/09f/fff.gif',
      activeImage: ask,
      click: handleAsk
    },
    {
      name: 'Vote',
      image: 'https://via.placeholder.com/300fsdf/09f/fff.gif',
      activeImage: vote,
      click: handleVote
    },
    {
      name: 'Answer Questions',
      image: 'https://via.placeholder.com/300/0dsfsdf9f/fff.gif',
      activeImage: answer,
      click: handleAnswer
    },
    {
      name: 'Accept an Answer',
      image: 'https://via.placeholder.com/300/sdfsd/fff.gif',
      activeImage: accept,
      click: handleAccept
    }
  ];

  const ideaButtons = [
    {
      name: 'Create Title',
      image: 'https://via.placeholder.com/300/09f/fff.gif',
      activeImage: ask,
      click: handleAsk
    },
    {
      name: 'Formulate and Improve',
      image: 'https://via.placeholder.com/300/09f/fff.gif',
      activeImage: vote,
      click: handleVote
    },
    {
      name: 'Organize and Update',
      image: 'https://via.placeholder.com/300/09f/fff.gif',
      activeImage: answer,
      click: handleAnswer
    },
    {
      name: 'Get Feedback',
      image: 'https://via.placeholder.com/300/sdfsd/fff.gif',
      activeImage: accept,
      click: handleAccept
    }
  ];

  return (
    <div className="whyContainer">
      <div className="whyContent">
        <h2 className="howHeader sans">How It Works</h2>

        <div>
          <Button
            className={classes.veiwButton}
            variant="contained"
            color="primary"
            onClick={handleQuestionClick}
            style={questionButton ? { background: '#e27d60' } : null}
          >
            Question and Answer
          </Button>
          <Button
            style={ideaButton ? { background: '#e27d60' } : null}
            className={classes.veiwButton}
            variant="contained"
            color="primary"
            onClick={handleIdeaClick}
          >
            Business Idea
          </Button>
        </div>

        {question ? (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {questionButtons.map(({ name, image, activeImage, click }) => (
                  <div key={name}>
                    <Button
                      onClick={click}
                      style={activeImage ? { color: 'red' } : null}
                    >
                      {name}
                    </Button>
                  </div>
                ))}
              </Grid>
              <Grid item xs={6}>
                {questionButtons.map(({ name, image, activeImage }) => (
                  <div key={name}>
                    {activeImage ? (
                      <div>
                        <img src={image}></img>
                      </div>
                    ) : null}
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        ) : null}

        {idea ? (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {ideaButtons.map(({ name, image, activeImage }) => (
                  <div key={name}>
                    {activeImage ? (
                      <div>
                        <img src={image}></img>
                      </div>
                    ) : null}
                  </div>
                ))}
              </Grid>
              <Grid item xs={6}>
                {ideaButtons.map(({ name, image, activeImage, click }) => (
                  <div key={name}>
                    <Button
                      onClick={click}
                      style={activeImage ? { color: 'red' } : null}
                    >
                      {name}
                    </Button>
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Demo;
