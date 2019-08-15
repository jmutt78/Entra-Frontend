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
import ListItem from "../ListItem";

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
    width: layout.width,
    maxWidth: 1200,
    height: "100%",
    minHeight: layout.contentMinHeight
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
      <div className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="display3" className={classes.title}>
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
        <Pagination page={page} filter={filter} />
      </div>
    );
  }
}

export default withStyles(styles)(AnswerList);
