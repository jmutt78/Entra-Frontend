import React from 'react';
import { upperFirst } from 'lodash';

import CommentItem from './CommentItem';
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
  const { classes, introComments } = props;

  return (
    <div className={classes.container}>
      <PageHeader title={upperFirst(props.name) || 'Introductions'} />
      {introComments &&
        introComments.map(introComments => {
          return (
            <CommentItem
              item={introComments}
              userId={introComments.commentBy.id}
              user={introComments.commentBy}
              linkTo={{
                pathname: '/intro-post',
                query: { id: introComments.commentTo[0].id }
              }}
              showDetails={true}
              name={props.name}
              key={introComments.id}
              display={introComments.commentBy.display}
            />
          );
        })}
    </div>
  );
}

export default withStyles(styles)(IdeaList);
