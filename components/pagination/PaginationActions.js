import React from 'react'

import Typography from '@material-ui/core/Typography'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: '3rem',
  },
})

function PaginationActions({ classes, count, page, rowsPerPage, onChangePage }) {
  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0)
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1)
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1)
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.container}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <LastPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <FirstPageIcon />
      </IconButton>
    </div>
  )
}

export default withStyles(styles)(PaginationActions)
