import React from 'react';
import { upperFirst } from 'lodash';

import IdeaItem from './IdeaItem';
import PageHeader from '../PageHeader';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%',
    paddingRight: 10
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  icon: {
    color: 'black'
  },
  customColumnStyle: {
    maxWidth: '.3px'
  }
});

function IdeaList(props) {
  const {
    classes,
    businessIdeas,
    page,
    paginationVariables,
    paginationQuery
  } = props;

  return (
    <div className={classes.container}>
      <PageHeader title={upperFirst(props.name) || 'Idea'} />
      {businessIdeas &&
        businessIdeas.map(businessIdea => {
          return (
            <IdeaItem
              item={businessIdea}
              linkTo={{
                pathname: '/idea/idea',
                query: { id: businessIdea.id }
              }}
              showDetails={true}
              name={props.name}
              key={businessIdea.id}
            />
          );
        })}
    </div>
  );
}

export default withStyles(styles)(IdeaList);
