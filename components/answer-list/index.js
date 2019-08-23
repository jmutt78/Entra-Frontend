import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Pagination from "../pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { upperFirst } from "lodash";
import gql from "graphql-tag";
import ListItem from "../ListItem";

const ANSWER_PAGINATION_QUERY = gql`
  query ANSWER_PAGINATION_QUERY($filter: String!) {
    answersConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

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
    height: "100%"
    // minHeight: layout.contentMinHeight
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "bold"
  },
  link: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)"
  }
});

class AnswerList extends Component {
  render() {
    const { classes, answers, filter, page, enablePagination } = this.props;

    const customColumnStyle = {
      maxWidth: ".3px"
    };

    return (
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.title}>
                  {upperFirst(this.props.name) || "Answers"}
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
                <ListItem
                  key={answer.id}
                  item={answer}
                  linkTo={{
                    pathname: "/question",
                    query: { id: answer.answeredTo[0].id }
                  }}
                  userName={answer.answeredBy.name}
                  userId={answer.answeredBy.id}
                />
              );
            })}
          </TableBody>
        </Table>
        {enablePagination && (
          <Pagination
            page={page}
            filter={filter}
            query={ANSWER_PAGINATION_QUERY}
            connectionKey="answersConnection"
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AnswerList);
