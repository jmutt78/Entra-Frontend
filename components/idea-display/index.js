import Link from 'next/link';
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { format, parseISO } from 'date-fns';
// import { withRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';

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
  container: {
    width: '100%',
    maxWidth: 1000,
    paddingTop: 5,
    height: '100%',
    minHeight: 'calc(100%)-80px-80px' //layout.contentMinHeight,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'flex',
    alignItems: 'center'
  },
  titleText: {
    fontSize: '33px',
    lineHeight: '2.7rem',
    fontWeight: 600,
    letterSpacing: '-1px'
  },
  bodyText: {
    whiteSpace: 'pre-wrap',
    fontSize: '1rem'
  },
  detailContainer: {
    background: '#f2f4ef',
    padding: '3px 0 5px 0',
    marginLeft: 15,
    marginRight: 15
  },
  editButton: {}
}));

export default ({ idea, id }) => {
  const {
    container,
    title,
    titleText,
    bodyText,
    detailContainer,
    editButton
  } = usePageStyles();

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

            <div className="titleContainer">
              <Typography variant="h6" className={title}>
                <div className={titleText}>{}</div>
              </Typography>
            </div>

            <div style={{ padding: '0 0 0 10px' }}>
              Created{' '}
              <span>
                {format(parseISO(businessIdea.createdAt), 'MMMM dd, yyyy')}
              </span>
            </div>

            <div className={detailContainer}>
              <div className="QuestionDetail-body">
                <div className={bodyText}>{businessIdea.problem}</div>
              </div>
              <div className="QuestionDetail-body">
                <div className={bodyText}>{businessIdea.solution}</div>
              </div>
              <div className="QuestionDetail-body">
                <div className={bodyText}>{businessIdea.customer}</div>
              </div>
              <div className="QuestionDetail-body">
                <div className={bodyText}>{businessIdea.value}</div>
              </div>
            </div>
            <Link
              href={{
                pathname: '/idea/edit-idea',
                query: { id: businessIdea.id }
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                className={editButton}
              >
                EDIT
              </Button>
            </Link>
          </div>
        );
      }}
    </Query>
  );
};

// export default withRouter(withStyles(styles)(withApollo(DisplayIdea)));
