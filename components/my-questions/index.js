import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config.js";
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

const MYQUESTIONS_QUERY = gql`
  query MYQUESTIONS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    questions(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      createdAt
      answers {
        id
        body
      }
      tags {
        id
        name
      }
      views {
        id
      }
    }
  }
`;

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

class MyQuestions extends Component {
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
    const { classes } = this.props;

    const customColumnStyle = {
      maxWidth: ".3px"
    };
    return (
      <Query
        query={MYQUESTIONS_QUERY}
        fetchPolicy="network-only"
        variables={{
          skip: this.props.page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data: { questions }, loading }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={3} className={classes.grid} />
              <Grid item xs={7} className={classes.grid}>
                {" "}
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="display3"
                          className={classes.title}
                        >
                          My Questions
                        </Typography>
                      </TableCell>
                      <CustomTableCell style={customColumnStyle}>
                        A
                      </CustomTableCell>
                      <CustomTableCell style={customColumnStyle}>
                        V
                      </CustomTableCell>
                      <CustomTableCell style={customColumnStyle}>
                        U
                      </CustomTableCell>
                      <CustomTableCell style={customColumnStyle}>
                        D
                      </CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map(questions => (
                      <TableRow key={questions.id}>
                        <TableCell component="th" scope="row">
                          <Typography>
                            <Link
                              href={{
                                pathname: "/question",
                                query: { id: questions.id }
                              }}
                            >
                              <a className={classes.link}>
                                <div>{questions.title}</div>
                              </a>
                            </Link>
                          </Typography>
                          <Typography>
                            Posted{" "}
                            {format(
                              parseISO(questions.createdAt),
                              "MMMM dd, yyyy"
                            )}
                          </Typography>
                          {this.tagsList(questions.tags)}
                        </TableCell>
                        <TableCell>{questions.answers.length}</TableCell>
                        <CustomTableCell>
                          {questions.views.length}
                        </CustomTableCell>
                        <CustomTableCell>0</CustomTableCell>
                        <CustomTableCell>0</CustomTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination page={this.props.page} />
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(MyQuestions);
