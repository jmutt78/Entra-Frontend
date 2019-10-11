import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

import questionListQuery from '../question-list/questionListQuery';

import { CURRENT_USER_QUERY } from '../auth/User';
import questionQuery from '../question-display/questionQuery';
import DeleteBookMark from './UpdateBookMark';
import { Mixpanel } from '../../utils/Mixpanel';
import Error from './../ErrorMessage.js';

export const CREATE_BOOKMARK_MUTATION = gql`
  mutation createBookMark($questionId: ID!) {
    createBookMark(questionId: $questionId) {
      id
    }
  }
`;

const styles = {
  icon: {
    fontSize: 30,
    marginTop: 3
  },
  viewsCount: {
    color: '#2d3436', //palette.accent.dark,
    fontSize: '1.2rem',
    padding: '8px 0 5px 8px'
  }
};

class CreateBookMark extends Component {
  submitForm = async (e, createBookMark) => {
    e.preventDefault();
    const res = await createBookMark({
      variables: {
        questionId: this.props.question.id
      }
    });
    Mixpanel.track('Create Bookmark');
  };

  handleBookMark(user, question, classes, createBookMark) {
    const questionId = question.id;
    const allBookMarks = user.myBookMarks.map(data => data.id);
    const questionBookmarks = question.bookMark;
    const flatQuestionBookMark = questionBookmarks.map(data => data.id);
    //---------------Test-------------------//
    const allQuestions = user.myBookMarks.map(data => data.questions);
    const flatQuestionId = allQuestions.reduce(
      (acc, id) => [...acc, ...id],
      []
    );
    var result = flatQuestionId.filter(obj => {
      return obj.id === questionId;
    });

    if (!result[0]) {
      return (
        <div
          onClick={e => this.submitForm(e, createBookMark)}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <BookmarkBorder className={classes.icon} />
          <span className={classes.viewsCount}>Bookmark this</span>
        </div>
      );
    } else {
      //---------------Find bookmarkId-------------------//

      const id = allBookMarks.filter(element =>
        flatQuestionBookMark.includes(element)
      );

      return <DeleteBookMark id={id} questionId={questionId} />;
    }
  }

  render() {
    const { classes } = this.props;
    const user = this.props.user;
    const question = this.props.question;

    return (
      <Mutation
        mutation={CREATE_BOOKMARK_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.question.id }
          },

          { query: CURRENT_USER_QUERY },
          {
            query: questionListQuery,
            variables: { filter: 'My BookMarked' }
          }
        ]}
      >
        {(createBookMark, { error, loading }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          return (
            <div>
              {this.handleBookMark(user, question, classes, createBookMark)}
              <Error error={error} />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateBookMark);
