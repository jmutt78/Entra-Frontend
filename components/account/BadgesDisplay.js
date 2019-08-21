import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { pickBy } from "lodash";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import CommentIcon from "@material-ui/icons/Comment";
import FlightIcon from "@material-ui/icons/Flight";
import HowToVote from "@material-ui/icons/HowToVote";
import Whatshot from "@material-ui/icons/Whatshot";
import HowToReg from "@material-ui/icons/HowToReg";
import School from "@material-ui/icons/School";
import Favorite from "@material-ui/icons/Favorite";
import Cached from "@material-ui/icons/Cached";

const styles = theme => ({
  grid: {
    margin: theme.spacing(1)
  },
  root: {
    margin: theme.spacing(1),
    marginTop: 40
  },
  badge: {
    alignItems: "center"
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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  awesomeAward: {
    justiftyContent: "center",
    color: "#E27D60",
    alignItems: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
});

const badgesConfig = {
  autobiographer: {
    title: "Autobiographer",
    icon: LibraryBooksIcon
  },
  critic: {
    title: "Critic",
    icon: ThumbDownIcon
  },
  patron: {
    title: "Patron",
    icon: ThumbUpIcon
  },
  reviewer: {
    title: "Reviewer",
    icon: RateReviewIcon
  },
  analyst: {
    title: "Analyst",
    icon: ThreeSixtyIcon
  },
  commentor: {
    title: "Commentor",
    icon: CommentIcon
  },
  frequentFlyer: {
    title: "Frequent Flyer",
    icon: FlightIcon
  },
  niceAnswer: {
    title: "Nice Answer",
    icon: Whatshot
  },
  expert: {
    title: "Expert",
    icon: HowToReg
  },
  teacher: {
    title: "Teacher",
    icon: School
  },
  pundit: {
    title: "Pundit",
    icon: Favorite
  },
  powerVoter: {
    title: "Power Voter",
    icon: HowToVote
  },
  provoker: {
    title: "Provoker",
    icon: Cached
  }
};

export function BadgeItem({ type, classes }) {
  const badgeConfig = badgesConfig[type];
  const { title, icon: Icon } = badgeConfig;
  return (
    <Grid container item xs={2} className={classes.badge} direction="column">
      <Icon style={{ fontSize: 64 }} />
      <Typography variant="h6" align="center">
        {title}
      </Typography>
    </Grid>
  );
}

export function BadgesList({ badges, classes }) {
  const yourBadges = pickBy(badges, value => value === true);
  const badgeKeys = Object.keys(yourBadges);
  if (!badgeKeys.length) {
    return (
      <Typography variant="h6" align="center">
        No bages yet
      </Typography>
    );
  }
  return (
    <Grid container>
      {badgeKeys.map(badge => (
        <BadgeItem key={badge} type={badge} classes={classes} />
      ))}
    </Grid>
  );
}

export class BadgesDisplay extends Component {
  render() {
    const { classes } = this.props;
    const user = this.props.user;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={2} className={classes.grid} />
        <Grid item xs={8} className={classes.badgeTitle}>
          <Card className={classes.card}>
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={11} className={classes.badgeTitle}>
                <Typography variant="h4">Badges</Typography>
              </Grid>
            </Grid>
            <BadgesList badges={user.badges} classes={classes} />
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(BadgesDisplay);
