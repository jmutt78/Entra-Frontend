import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import StepContent from '../create-idea/StepContent';

import './index.css';

const useSectionStyles = makeStyles(({ palette }) => ({
  cardContainer: {
    padding: '1rem 0'
  },
  card: {
    minWidth: 275,
    maxWidth: 800
  },
  title: {
    fontWeight: 500
  },
  content: {
    fontSize: 17
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '1rem'
  },
  stepContentContainer: {
    padding: '1.5rem 0 0 0'
  }
}));

export default ({ sectionTitle, sectionContent, index }) => {
  const {
    cardContainer,
    card,
    title,
    content,
    buttonContainer,
    stepContentContainer
  } = useSectionStyles();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(sectionContent);

  return (
    <div className={cardContainer}>
      <Card className={card}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={title}
          >
            {sectionTitle}
          </Typography>

          {editing ? (
            <div className={stepContentContainer}>
              <StepContent step={index} value={value} setField={setValue} />
            </div>
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={content}
            >
              {sectionContent}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <div className={buttonContainer}>
            <Button
              size="small"
              onClick={() => setEditing(e => !e)}
              color={editing ? 'primary' : undefined}
            >
              {editing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
