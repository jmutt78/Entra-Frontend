import React from 'react'
import Link from 'next/link'
import Signout from '../auth/Signout'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const styles = {
  bigAvatar: {
    margin: 15,
    width: 50,
    height: 50,
    cursor: 'pointer',
  },
}

class MyProfile extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleImage(me, classes) {
    if (me.image == null || me.image == '') {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{me.name[0]}</Avatar>
        </div>
      )
    }
    return (
      <div>
        <Avatar alt="Remy Sharp" src={me.image} className={classes.bigAvatar} />
      </div>
    )
  }

  render() {
    const { anchorEl } = this.state
    const { classes } = this.props
    const me = this.props.me

    return (
      <div>
        <Typography variant="h5" className={classes.grow} onClick={this.handleClick}>
          {this.handleImage(me, classes)}
        </Typography>

        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <Link href="/account/myaccount">
            <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
          </Link>
          <Link href="/account/editaccount">
            <MenuItem onClick={this.handleClose}>Edit Account</MenuItem>
          </Link>

          <MenuItem>
            <Signout />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(MyProfile)
