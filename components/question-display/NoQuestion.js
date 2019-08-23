import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  bigAvatar: {
    width: 70,
    height: 70
  },
  grid: {
    margin: theme.spacing(1)
  },
  root: {
    margin: theme.spacing(1),
    marginTop: 40
  },
  title: {
    marginBottom: 20,
    fontSize: 20
  },
  photoTitle: {
    display: "inline-flex",
    marginRight: 10,
    marginBottom: 20
  },
  paper: {
    backgroundColor: "#F2F4EF",
    padding: 30
  },
  tags: {
    display: "inline-flex",
    marginRight: 10,
    marginTop: 20
  },
  date: {
    marginTop: 20
  },
  description: {
    fontSize: 17
  }
});

class NoQuestion extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs />
        <Grid item xs={7} className={classes.grid}>
          <Paper className={classes.paper}>
            <div>
              <Typography>
                We are currently reviewing this question. Please check back
                later :)
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    );
  }
}

NoQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoQuestion);
