import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Error from './../ErrorMessage.js';
import Vote from '../Vote';
import { Mixpanel } from '../../utils/Mixpanel';
import './index.css';

const IDEAS_QUERY = gql`
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

const styles = ({ palette, layout }) => ({
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
  }
});

class DisplayIdea extends Component {
  render() {
    const { classes, idea, id } = this.props;

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
          console.log(businessIdea);
          return (
            <div className={classes.container} id="tableBorderRemoveTarget">
              <div className="titleContainer">
                <Typography variant="h6" className={classes.title}>
                  <div className={classes.titleText}>{businessIdea.idea}</div>
                </Typography>
              </div>
              <div style={{ padding: '0 0 0 10px' }}>
                Created{' '}
                <span>
                  {format(parseISO(businessIdea.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>

              <div
                style={{
                  background: '#f2f4ef',
                  padding: '3px 0 5px 0',
                  marginLeft: 15,
                  marginRight: 15
                }}
              >
                <div className="QuestionDetail-body">
                  <div className={classes.bodyText}>{businessIdea.problem}</div>
                </div>
                <div className="QuestionDetail-body">
                  <div className={classes.bodyText}>
                    {businessIdea.solution}
                  </div>
                </div>
                <div className="QuestionDetail-body">
                  <div className={classes.bodyText}>
                    {businessIdea.customer}
                  </div>
                </div>
                <div className="QuestionDetail-body">
                  <div className={classes.bodyText}>{businessIdea.value}</div>
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
                  className={classes.editButton}
                >
                  EDIT
                </Button>
              </Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(withApollo(DisplayIdea)));
export { IDEAS_QUERY };
