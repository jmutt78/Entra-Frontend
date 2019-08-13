import React from 'react'

import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = ({ palette }) => ({
  container: {
    flexShrink: 0,
    color: palette.text.secondary,
    marginLeft: '3rem',
  },
  button: {
    margin: 5,
    backgroundColor: palette.accent.grey,
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
  },
})

function PaginationActions({ classes, count, page, rowsPerPage, onChangePage }) {
  // function handleFirstPageButtonClick(event) {
  //   onChangePage(event, 0)
  // }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1)
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1)
  }

  // function handleLastPageButtonClick(event) {
  //   onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  // }

  return (
    <Typography className={classes.container}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleBackButtonClick}
        style={page === 0 ? { display: 'none' } : {}}
        size="small"
      >
        <KeyboardArrowLeft />
        {`Previous Page `}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleNextButtonClick}
        style={page >= Math.ceil(count / rowsPerPage) - 1 ? { display: 'none' } : {}}
        size="small"
      >
        {` Next Page`}
        <KeyboardArrowRight />
      </Button>
    </Typography>
  )
}

export default withStyles(styles)(PaginationActions)
