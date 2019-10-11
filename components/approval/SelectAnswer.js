import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import questionQuery from '../question-display/questionQuery.js';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CheckIcon from '@material-ui/icons/Check';
import Error from './../ErrorMessage.js';

export const SELECT_ANSWER_MUTATION = gql`
  mutation selectAnswer($id: ID!) {
    selectAnswer(id: $id) {
      id
    }
  }
`;

const styles = {
  buttonAccept: {
    backgroundColor: '#85BDCB',

    margin: '0 5px'

  },
  acceptedText: {
    marginRight: 10
  },
  selected: {

    margin: '0 5px',
    backgroundColor: '#badc58',

    cursor: 'default',
    '&:hover': {
      backgroundColor: '#badc58'
    }
  }
};

class SelectAnswer extends Component {
  handleSelect = async (e, selectAnswer) => {
    e.preventDefault();
    const res = await selectAnswer({
      variables: {
        id: this.props.id
      }
    });
  };

  render() {
    const { classes, questionId, selected, canSelect } = this.props;
    if (selected) {
      return (
        <Button className={classes.selected} variant="contained">
          <CheckIcon />
          Selected Answer
        </Button>
      );
    }

    if (!canSelect || selected === true || selected === null) {
      return null;
    }

    return (
      <Mutation
        mutation={SELECT_ANSWER_MUTATION}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: questionId }
          }
        ]}
      >
        {(selectAnswer, { error, loading }) => {
          return (
            <>
              <Button
                className={classes.buttonAccept}
                variant="contained"
                onClick={e => this.handleSelect(e, selectAnswer)}
              >
                Select
              </Button>
              <Error error={error} />
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(SelectAnswer);
