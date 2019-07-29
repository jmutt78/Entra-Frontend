import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import questionQuery from "../question-display/questionQuery.js";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { CURRENT_USER_QUERY } from "../auth/User";

const CREATE_BOOKMARK_MUTATION = gql`
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
  }
};

class CreatBookMark extends Component {
  submitForm = async (e, createBookMark) => {
    console.log(this.props.question.id);
    e.preventDefault();
    const res = await createBookMark({
      variables: {
        questionId: this.props.question.id
      }
    });
  };

  handleBookMark(user, question, classes, createBookMark) {
    const questionId = question.id;
    const allQuestions = user.myBookMarks.map(data => data.questions);
    const flatQuestionId = allQuestions.reduce(
      (acc, id) => [...acc, ...id],
      []
    );

    var result = flatQuestionId.filter(obj => {
      return obj.id === questionId;
    });
    console.log(result[0]);

    if (!result[0]) {
      console.log("und");
      return (
        <div>
          <Button
            className={classes.buttonReject}
            variant="contained"
            onClick={e => this.submitForm(e, createBookMark)}
          >
            Mark
          </Button>
        </div>
      );
    } else {
      return <div />;
    }

    // if (result === null) {
    //   return <div />;
    // } else {
    //   if (result[0].id === questionId) {
    //     return <div />;
    //   } else {
    //     return (
    //       <div>
    //         {this.handleBookMark(user, question, classes)}
    //         <Button
    //           className={classes.buttonReject}
    //           variant="contained"
    //           onClick={e => this.submitForm(e, createBookMark)}
    //         >
    //           Mark
    //         </Button>
    //       </div>
    //     );
    //   }
    // }
  }

  render() {
    const { classes } = this.props;
    const user = this.props.user;
    const question = this.props.question;

    console.log(user);
    console.log(question);
    return (
      <Mutation
        mutation={CREATE_BOOKMARK_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.question.id }
          },
          { query: CURRENT_USER_QUERY }
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
