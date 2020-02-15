import React from 'react';
import { upperFirst } from 'lodash';

import PostItem from './PostItem';
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
  const { classes, introes } = props;

  return (
    <div className={classes.container}>
      <PageHeader title={upperFirst(props.name) || 'Introductions'} />
      {introes &&
        introes.map(introes => {
          console.log(introes);
          return (
            <PostItem
              item={introes}
              userId={introes.postedBy.id}
              user={introes.postedBy[0]}
              linkTo={{
                pathname: '/intro-post',
                query: { id: introes.id }
              }}
              showDetails={true}
              name={props.name}
              key={introes.id}
              display={introes.postedBy[0].display}
            />
          );
        })}
    </div>
  );
}

export default withStyles(styles)(IdeaList);
