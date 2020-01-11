import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'points', label: 'Points', minWidth: 100 },
  {
    id: 'questions',
    label: 'Questions',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'answers',
    label: 'Answers',
    minWidth: 170,
    align: 'right'
  }
];

export default function User({ user }) {
  const questions = Object.keys(user.myQuestions).length;
  const answers = Object.keys(user.myAnswers).length;

  return (
    <TableBody>
      <TableRow>
        <TableCell>{user.display}</TableCell>
        <TableCell>{user.points}</TableCell>
        <TableCell>{questions}</TableCell>
        <TableCell>{answers}</TableCell>
      </TableRow>
    </TableBody>
  );
}
