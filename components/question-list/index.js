import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Pagination from "../pagination";
import QuestionSearch from "../search/QuestionSearch.js";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { upperFirst } from "lodash";

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5
  }
}))(TableCell);

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },

  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },

  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)"
  },
  link: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)"
  }
});

class QuestionList extends Component {
  tagsList(tags) {
    return tags.map(tags => (
      <div key={tags.id} style={{ display: "inline-flex", marginRight: 10 }}>
        <Typography style={{ textTransform: "uppercase" }}>
          <strong>{tags.name} </strong>
        </Typography>
      </div>
    ));
  }

  render() {
    const { classes, questions, filter } = this.props;

    const customColumnStyle = {
      maxWidth: ".3px"
    };
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={3} className={classes.grid} />
        <Grid item xs={7} className={classes.grid}>
          {" "}
          <QuestionSearch />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="display3" className={classes.title}>
                    {upperFirst(filter)} Questions
                  </Typography>
                </TableCell>
                <CustomTableCell style={customColumnStyle}>A</CustomTableCell>
                <CustomTableCell style={customColumnStyle}>V</CustomTableCell>
                <CustomTableCell style={customColumnStyle}>U</CustomTableCell>
                <CustomTableCell style={customColumnStyle}>D</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map(question => {
                return (
                  <TableRow key={question.id}>
                    <TableCell component="th" scope="row">
                      <Typography>
                        <Link
                          href={{
                            pathname: "/question",
                            query: { id: question.id }
                          }}
                        >
                          <a className={classes.link}>
                            <div>{question.title}</div>
                          </a>
                        </Link>
                      </Typography>
                      <Typography>
                        Posted{" "}
                        {format(parseISO(question.createdAt), "MMMM dd, yyyy")}
                      </Typography>
                      {this.tagsList(question.tags)}
                    </TableCell>
                    <TableCell>{question.answers.length}</TableCell>
                    <CustomTableCell>{question.views}</CustomTableCell>
                    <CustomTableCell>{question.upVotes}</CustomTableCell>
                    <CustomTableCell>{question.downVotes}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Pagination page={this.props.page} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(QuestionList);
