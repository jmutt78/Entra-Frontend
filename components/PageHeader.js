import React from 'react';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import classNames from 'classnames';

const styles = ({ layout }) => ({
  table: {
    borderBottom: 'none'
  },
  icon: {
    color: 'black'
  }
});

const TypographyResponsive = styled.p`
  font-size: 25px;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
  border: none;
  font-weight: bold;
  margin: 8px 0;
  @media (max-width: 767px) {
    font-size: 20px;
    text-align: center;
  }
`;

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     width: 5
//   }
// }))(TableCell);

const PageHeader = ({ classes, title, styles }) => {
  return (
    <Table className={classNames(classes.table, styles)}>
      <TableHead>
        <TableRow style={{ marginRight: 10 }}>
          <TableCell>
            <TypographyResponsive>{title}</TypographyResponsive>
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default withStyles(styles)(PageHeader);
