import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import DeleteBookMark from "./UpdateBookMark";
import questionListQuery from "../question-list/questionListQuery";
import gql from "graphql-tag";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { CURRENT_USER_QUERY } from "../auth/User";
import questionQuery from "../question-display/questionQuery";
import Error from "./../ErrorMessage.js";

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
    cursor: "pointer",
    marginTop: 5,
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
        <div>
          <BookmarkBorder
            className={classes.icon}
            onClick={e => this.submitForm(e, createBookMark)}
          >
            Mark
          </BookmarkBorder>
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
            variables: { filter: "My BookMarked" }
          }
        ]}
      >
        {(createBookMark, { error, loading }) => {
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
