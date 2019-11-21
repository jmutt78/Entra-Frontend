import React from 'react';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { typography } from '@material-ui/system';

const styles = ({ layout }) => ({
  table: {
    margin: '0 0 25px 0'
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
    <Table className={[classes.table, styles]}>
      <TableHead>
        <TableRow style={{ marginRight: 10 }}>
          <TableCell>
            <TypographyResponsive>{title}</TypographyResponsive>
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
