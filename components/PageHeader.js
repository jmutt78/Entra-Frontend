import React from 'react';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ layout }) => ({
  table: {
    margin: '0 0 25px 0'
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  icon: {
    color: 'black'
  }
});

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     width: 5
//   }
// }))(TableCell);

const PageHeader = ({ classes, title }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow style={{ marginRight: 10 }}>
          <TableCell>
            <Typography className={classes.title}>{title}</Typography>
          </TableCell>

          {/*
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
            */}
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default withStyles(styles)(PageHeader);
