import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import DeleteBookMark from "./UpdateBookMark";
import questionListQuery from "../question-list/questionListQuery";
import gql from "graphql-tag";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { CURRENT_USER_QUERY } from "../auth/User";
import questionQuery from "../question-display/questionQuery";

export const CREATE_BOOKMARK_MUTATION = gql`
  mutation createBookMark($questionId: ID!) {
    createBookMark(questionId: $questionId) {
      id
    }
  }
`;

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  buttonReject: {
    backgroundColor: "#E27D60",
    marginTop: 10
  },
  buttonAccept: {
    backgroundColor: "#85BDCB",
    marginTop: 10
  },
  buttonAccepted: {
    backgroundColor: "#85BDCB",
    marginTop: 10,
    marginRight: 10
  },
  buttonRejected: {
    backgroundColor: "#E27D60",
    marginTop: 10
  },
  icon: {
    fontSize: 30,
    cursor: "pointer",
    marginLeft: 20,
    marginTop: 10
  }
};

class CreatBookMark extends Component {
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
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreatBookMark);
