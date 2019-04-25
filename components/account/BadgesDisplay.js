import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },

  badge: {
    marginLeft: 30,
    marginRight: 30
  },
  badgeTitle: {
    marginRight: 5,
    marginTop: -30,
    marginBottom: 30
  },
  card: {
    width: "100%",
    height: 400
  },
  awesome: {
    justiftyContent: "center",
    color: "grey",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  awesomeAward: {
    justiftyContent: "center",
    color: "#E27D60",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

class BadgesDisplay extends Component {
  render() {
    const { classes } = this.props;
    const user = this.props.data.me;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={2} className={classes.grid} />
        <Grid item xs={7} className={classes.badgeTitle}>
          <Card className={classes.card}>
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={11} className={classes.badgeTitle}>
                <Typography variant="h4">Badges</Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesomeAward} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  First Question
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesomeAward} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  10 Questions
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesomeAward} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  25 Question
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  50 Questions
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  75 Questions
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  100 Questions
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  First Answer
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  10 Answers
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  25 Answers
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  50 Answers
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  75 Answers
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.badge}>
                <Icon className={classes.awesome} align="center">
                  <FontAwesomeIcon size="2x" icon={faAward} />
                </Icon>
                <Typography variant="h6" align="center">
                  100 Answers
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

BadgesDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BadgesDisplay);
