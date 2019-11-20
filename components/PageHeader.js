import React from 'react';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
  subTitle: {
    fontSize: '30px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.67)',
    lineHeight: '2.6rem'
  },
  icon: {
    color: 'black'
  }
});

const PageHeader = ({ classes, title, subTitle }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow style={{ marginRight: 10 }}>
          <TableCell>
            <Typography className={classes.title}>{title}</Typography>
            {subTitle && (
              <Typography className={classes.subTitle}>{subTitle}</Typography>
            )}
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default withStyles(styles)(PageHeader);
