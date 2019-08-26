import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { pickBy } from 'lodash'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import RateReviewIcon from '@material-ui/icons/RateReview'
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty'
import CommentIcon from '@material-ui/icons/Comment'
import FlightIcon from '@material-ui/icons/Flight'
import HowToVote from '@material-ui/icons/HowToVote'
import Whatshot from '@material-ui/icons/Whatshot'
import HowToReg from '@material-ui/icons/HowToReg'
import School from '@material-ui/icons/School'
import Favorite from '@material-ui/icons/Favorite'
import Cached from '@material-ui/icons/Cached'

const styles = theme => ({
  container: {
    width: '100%',
    padding: 10,
  },
  badge: {
    alignItems: 'center',
  },
  badgeTitle: {
    marginRight: 5,
    marginTop: -30,
    marginBottom: 30,
  },
  card: {
    width: '100%',
    maxWidth: 1000,
  },
  title: {
    color: '#2d3436', //theme.palette.accent.dark,
    padding: '40px 0 20px 50px',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: '2.5rem',
  },
  item: {
    width: 150,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justiftyContent: 'center',
    alignItems: 'center',
  },
})

const badgesConfig = {
  autobiographer: {
    title: 'Autobiographer',
    icon: LibraryBooksIcon,
  },
  critic: {
    title: 'Critic',
    icon: ThumbDownIcon,
  },
  patron: {
    title: 'Patron',
    icon: ThumbUpIcon,
  },
  reviewer: {
    title: 'Reviewer',
    icon: RateReviewIcon,
  },
  analyst: {
    title: 'Analyst',
    icon: ThreeSixtyIcon,
  },
  commentor: {
    title: 'Commentor',
    icon: CommentIcon,
  },
  frequentFlyer: {
    title: 'Frequent Flyer',
    icon: FlightIcon,
  },
  niceAnswer: {
    title: 'Nice Answer',
    icon: Whatshot,
  },
  expert: {
    title: 'Expert',
    icon: HowToReg,
  },
  teacher: {
    title: 'Teacher',
    icon: School,
  },
  pundit: {
    title: 'Pundit',
    icon: Favorite,
  },
  powerVoter: {
    title: 'Power Voter',
    icon: HowToVote,
  },
  provoker: {
    title: 'Provoker',
    icon: Cached,
  },
}

export function BadgeItem({ type, classes }) {
  const badgeConfig = badgesConfig[type]

  return badgeConfig ? (
    <div className={classes.item}>
      <badgeConfig.icon style={{ fontSize: 64 }} />
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        {badgeConfig.title}
      </Typography>
    </div>
  ) : null
}

export function BadgesList({ badges, classes }) {
  const yourBadges = pickBy(badges, value => value === true)
  // const badgeKeys = Object.keys(yourBadges)
  const badgeKeys = Object.keys(badges)
  if (!badgeKeys.length) {
    return (
      <Typography variant="h6" align="center">
        No bages yet
      </Typography>
    )
  }
  return (
    <div className="badgesContainer">
      {badgeKeys.map(badge => (
        <BadgeItem key={badge} type={badge} classes={classes} />
      ))}
    </div>
  )
}

export class BadgesDisplay extends Component {
  render() {
    const { classes } = this.props
    const user = this.props.user

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Badges
          </Typography>

          <BadgesList badges={user.badges} classes={classes} />
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(BadgesDisplay)
