import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Pagination from "../pagination";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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

class AnswerList extends Component {
  render() {
    const { classes, answers, filter, page } = this.props;

    const customColumnStyle = {
      maxWidth: ".3px"
    };

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={3} className={classes.grid} />
        <Grid item xs={7} className={classes.grid}>
          {" "}
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="display3" className={classes.title}>
                    {upperFirst(filter)} Answers
                  </Typography>
                </TableCell>
                <Tooltip title="Up Votes" placement="top">
                  <CustomTableCell style={customColumnStyle}>
                    <img src="/static/thumb_up.svg" />
                  </CustomTableCell>
                </Tooltip>
                <Tooltip title="Down Votes" placement="top">
                  <CustomTableCell style={customColumnStyle}>
                    <img src="/static/thumb_down.svg" />
                  </CustomTableCell>
                </Tooltip>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers.map(answer => {
                return (
                  <TableRow key={answer.id}>
                    <TableCell component="th" scope="row">
                      <Typography>
                        <Link
                          href={{
                            pathname: "/question",
                            query: { id: answer.answeredTo[0].id }
                          }}
                        >
                          <a className={classes.link}>
                            <div>{answer.body}</div>
                          </a>
                        </Link>
                      </Typography>
                      <Typography>
                        Posted{" "}
                        {format(parseISO(answer.createdAt), "MMMM dd, yyyy")}
                      </Typography>
                    </TableCell>
                    <CustomTableCell>{answer.upVotes}</CustomTableCell>
                    <CustomTableCell>{answer.downVotes}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Pagination page={page} filter={filter} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AnswerList);
