import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "../ui/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import ApproveAnswer from "../approval/AppoveAnswer.js";
import DeleteAnswer from "../delete-answer";
import SelectAnswer from "../approval/SelectAnswer";
import questionQuery from "../question-display/questionQuery";

const CREATE_ANSWER_VOTE_MUTATION = gql`
  mutation CREATE_ANSWER_VOTE_MUTATION($answerId: ID!, $vote: String) {
    createAnswerVote(answerId: $answerId, vote: $vote) {
      id
    }
  }
`;

const styles = ({ spacing, palette }) => ({
  body: {
    color: palette.primary.dark,
    padding: "5px 0 15px 0",
    margin: 0,
    maxWidth: 800,
    fontWeight: 300
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: "none",
    color: palette.primary.dark
  },
  tableRow: {
    background: palette.secondary.main
  },
  selectedTableRow: {
    background: "#b8e994"
  },
  button: {
    color: palette.primary.dark
  },
  detailContainer: {
    padding: "5px 15px"
  },
  buttonTop: {
    backgroundColor: "#E27D60",
    marginLeft: spacing.unit * 2
  },
  textTop: {
    color: "white",
    fontSize: 20
  },
  editButton: {
    backgroundColor: palette.primary.blue
  },
  signupButton: {
    backgroundColor: palette.primary.dark,
    "&:hover": {
      backgroundColor: palette.primary.main
    },
    marginLeft: 10
  },
  avatar: {
    width: 70,
    height: 70,
    cursor: "pointer"
  },
  credits: { paddingTop: 5, display: "flex", alignItems: "center" },
  viewContainer: {
    display: "flex",
    alignItems: "center"
  },
  viewsCount: {
    color: palette.primary.dark,
    fontSize: "1.2rem",
    padding: "5px 0 5px 8px"
  },
  itemFooter: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0 0 0"
  },
  votesContainer: {
    display: "flex",
    alignItems: "center"
  },
  voteContainer: {
    display: "flex"
  },
  voteButton: {
    cursor: "pointer"
  },
  upVote: {
    color: palette.primary.main,
    fontSize: "1.4rem",
    padding: "8px 8px 5px 0"
  },
  downVote: {
    color: palette.primary.blue,
    fontSize: "1.4rem",
    padding: "8px 0 5px 8px"
  }
});

const EditAndDelete = ({ answer, classes, user, question }) => {
  const selected = answer.selected;

  const date1 = new Date(answer.createdAt);
  const date2 = new Date();
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

  return user &&
    answer.answeredBy.id === user.id &&
    diffDays <= 2 &&
    selected === null ? (
    <Typography style={{ padding: "10px 0" }}>
      <Link
        href={{
          pathname: "/edit-answer",
          query: { id: answer.id }
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
      <DeleteAnswer id={answer.id} questionId={question.id} />
    </Typography>
  ) : null;
};

const Answer = ({ answer, classes, user, client, question }) => {
  const answeredBy = answer.answeredBy.id;
  const ownsAnswer = user && answeredBy === user.id;
  const isApproved = answer.approval === true;
  const questionId = answer.answeredTo[0].id;
  const hasPermissions =
    user &&
    user.permissions.some(permission =>
      ["ADMIN", "MODERATOR"].includes(permission)
    );

  const upVote = answerId => {
    client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: "up"
      },
      refetchQueries: [{ query: questionQuery, variables: { id: question.id } }]
    });
  };

  const downVote = answerId => {
    client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: "down"
      },
      refetchQueries: [{ query: questionQuery, variables: { id: question.id } }]
    });
  };

  if (!ownsAnswer && !hasPermissions && !isApproved) {
    return null;
  }

  return (
    <div className={classes.detailContainer}>
      <Table>
        <TableBody>
          <TableRow className={classes.tableRow}>
            <TableCell
              component="th"
              scope="row"
              style={{ padding: "25px 35px" }}
            >
              <Typography>
                {answer.body && <h3 className={classes.body}>{answer.body}</h3>}
              </Typography>

              <SelectAnswer
                canSelect={user && question.askedBy[0].id === user.id}
                selected={answer.selected}
                id={answer.id}
                questionId={questionId}
              />

              <div style={{ paddingBottom: 10, paddingTop: 10 }}>
                <ApproveAnswer
                  hasPermissions={hasPermissions}
                  isApproved={isApproved}
                  approval={answer.approval}
                  id={answer.id}
                  questionId={questionId}
                />
              </div>

              <EditAndDelete
                answer={answer}
                classes={classes}
                user={user}
                question={question}
              />

              <Typography className={classes.itemFooter}>
                <div className={classes.credits}>
                  <Link
                    href={{
                      pathname: "/user",
                      query: { id: answeredBy }
                    }}
                  >
                    {answer.answeredBy.image === null ||
                    answer.answeredBy.image === "" ? (
                      <Avatar className={classes.avatar}>
                        {answer.answeredBy.display[0]}
                      </Avatar>
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        src={answer.answeredBy.image}
                        className={classes.bigAvatar}
                      />
                    )}
                  </Link>

                  <span>{`  Answered by `}</span>
                  <Link
                    href={{
                      pathname: "/user",
                      query: { id: answeredBy }
                    }}
                  >
                    <a className={classes.nameLink}>
                      {answer.answeredBy.display[0]}
                    </a>
                  </Link>
                  <span>{` on `}</span>
                  <span>
                    {format(parseISO(answer.createdAt), "MMMM dd, yyyy")}
                  </span>
                </div>

                <div className={classes.votesContainer}>
                  <Tooltip
                    title="vote up"
                    placement="top"
                    className={classes.voteButton}
                    onClick={() => upVote(answer.id)}
                  >
                    <div className={classes.voteContainer}>
                      <span className={classes.upVote}>{answer.upVotes}</span>
                      <img src="/static/thumb_up.svg" />
                    </div>
                  </Tooltip>
                  <span>{"    "}</span>
                  <Tooltip
                    title="vote down"
                    placement="top"
                    className={classes.voteButton}
                    onClick={() => downVote(answer.id)}
                  >
                    <div className={classes.voteContainer}>
                      <img src="/static/thumb_down.svg" />
                      <span className={classes.downVote}>
                        {answer.downVotes}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(withApollo(Answer));
