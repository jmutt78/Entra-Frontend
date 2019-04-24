import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  bigAvatar: {
    width: 120,
    height: 120
  },
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  qaGrid: {
    marginLeft: 50,
    marginRight: 50
  },
  badge: {
    marginLeft: 50,
    marginRight: 50
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
    alignItems: "center",
    margin: theme.spacing.unit * 2
  }
});

class DisplayAccount extends Component {
  handleImage(user, classes) {
    if (user.image == null || user.image == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{user.name[0]}</Avatar>
        </div>
      );
    }
    return (
      <div>
        <Avatar
          alt="Remy Sharp"
          src={user.image}
          className={classes.bigAvatar}
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.me;
          const dateToFormat = data.me.createdAt;
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={1} className={classes.grid}>
                {this.handleImage(user, classes)}
              </Grid>
              <Grid item xs={4} className={classes.grid}>
                <Typography variant="h4">{data.me.name}</Typography>
                <Typography variant="h6">{data.me.display}</Typography>
                <Typography variant="subheading">
                  Location: {data.me.location}
                </Typography>
                <Typography variant="subheading">
                  Industry: {data.me.industry}
                </Typography>
                <Typography>
                  Member Since {format(parseISO(dateToFormat), "MMMM dd, yyyy")}
                </Typography>
              </Grid>
              <Grid item className={classes.grid} />
              <Grid item className={classes.grid}>
                <Typography>
                  <Link href="/account/editaccount">
                    <a style={{ textDecoration: "none", color: "grey" }}>
                      EDIT ACCOUNT INFO
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={7} className={classes.grid}>
                <Typography>{data.me.about}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={7} className={classes.grid}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={6} className={classes.grid}>
                <Typography variant="h4">Q&A Activity</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>
                  <Link href="/">
                    <a style={{ textDecoration: "none", color: "grey" }}>
                      VIEW ALL
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  8
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/">
                    <a style={{ textDecoration: "none", color: "grey" }}>
                      Questions
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  13
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/">
                    <a style={{ textDecoration: "none", color: "grey" }}>
                      Answers
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  0
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/">
                    <a style={{ textDecoration: "none", color: "grey" }}>
                      Accepted Answers
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  2
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/">
                    <a style={{ textDecoration: "none", color: "grey" }}>
                      Badges
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={7} className={classes.grid}>
                <Card className={classes.card}>
                  <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={11} className={classes.badgeTitle}>
                      <Typography variant="h4">Badges</Typography>
                    </Grid>
                    <Grid item xs={1} className={classes.badge}>
                      <Paper>
                        <Icon className={classes.awesome} align="center">
                          <FontAwesomeIcon size="2x" icon={faAward} />
                        </Icon>
                        <Typography variant="h6" align="center">
                          First Question
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={2} className={classes.grid} />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

DisplayAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayAccount);
