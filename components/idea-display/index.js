import Link from 'next/link';
import { capitalize } from 'lodash';
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { steps, stepNames } from '../create-idea';
import PageHeader from '../PageHeader';
import Error from './../ErrorMessage.js';
import './index.css';

export const IDEAS_QUERY = gql`
  query IDEAS_QUERY($id: ID!) {
    businessIdea(id: $id) {
      id
      idea
      problem
      solution
      customer
      value
      createdBy {
        id
        name
        display
      }
      createdAt
    }
  }
`;

const usePageStyles = makeStyles(({ palette, spacing }) => ({
  container: {},
  cardsContainer: {
    padding: '0 0 3rem 0.5rem'
  }
}));

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
    fontSize: 16
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '1rem'
  }
}));

const Section = ({ sectionTitle, sectionContent }) => {
  const {
    cardContainer,
    card,
    title,
    content,
    buttonContainer
  } = useSectionStyles();
  const [editing, setEditing] = useState(false);

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
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={content}
          >
            {sectionContent}
          </Typography>
        </CardContent>
        <CardActions>
          <div className={buttonContainer}>
            <Button size="small">Edit</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default ({ idea, id }) => {
  const { container, cardsContainer } = usePageStyles();

  return (
    <Query
      query={IDEAS_QUERY}
      variables={{
        id
      }}
    >
      {({ data: { businessIdea }, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <div className={container}>
            <PageHeader title={`Business Idea`} subTitle={businessIdea.idea} />
            <div className={cardsContainer}>
              {steps.slice(1).map((s, i) => (
                <Section
                  sectionTitle={capitalize(s)}
                  sectionContent={businessIdea[s]}
                  stepName={stepNames[i]}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

// export default withRouter(withStyles(styles)(withApollo(DisplayIdea)));
