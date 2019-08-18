import React from "react";
import { upperFirst } from "lodash";

import Grid from "@material-ui/core/Grid";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ListItem from "../ListItem";
import Pagination from "../pagination";

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5
  }
}))(TableCell);

const styles = ({ layout }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // width: layout.width,
    maxWidth: 1200,
    height: "100%",
    // minHeight: layout.contentMinHeight
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)",
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  icon: {
    color: "black"
  },
  customColumnStyle: {
    maxWidth: ".3px"
  }
});

function QuestionList(props) {
  const { classes, questions, filter, page } = props;

  return (
    <div className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.title}>
                {upperFirst(props.name) || "Questions"}
              </Typography>
            </TableCell>
            <Tooltip title="Answers" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <QuestionAnswer className={classes.icon} />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Views" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <img src="/static/visibility.svg" />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Up Votes" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <img src="/static/thumb_up.svg" />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Down Votes" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <img src="/static/thumb_down.svg" />
              </CustomTableCell>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map(question => {
            console.log(question);
            return (
              <ListItem
                item={question}
                userName={question.askedBy[0].name}
                linkTo={{
                  pathname: "/question",
                  query: { id: question.id }
                }}
                showDetails={true}
                name={props.name}
                key={question.id}
              />
            );
          })}
        </TableBody>
      </Table>
      <Pagination page={page} filter={filter} />
    </div>
  );
}

export default withStyles(styles)(QuestionList);
