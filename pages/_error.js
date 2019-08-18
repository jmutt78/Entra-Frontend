import React from 'react'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  sub: {
    color: palette.primary.dark,
    padding: "5px 0 0 20px",
    margin: '2rem 0',
  },
  link: {
    color: palette.primary.blue,
    padding: "5px 0 0 20px",
    margin: 0,
    cursor: 'pointer',
  },
})

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <Grid container className={this.props.classes.container}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="display3" className={this.props.classes.title}>
                  {this.props.statusCode}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <h2 className={this.props.classes.sub}>
          {this.props.statusCode
            ? `Sorry, an error ${this.props.statusCode} occurred on the server.`
            : 'Sorry, an error occurred on the client.'}
        </h2>
        <h2 className={this.props.classes.link} onClick={() => window.history.back()}>
          Go back
        </h2>
      </Grid>
    )
  }
}

export default withStyles(styles)(Error)
