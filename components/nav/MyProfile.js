import React from "react";
import Button from "@material-ui/core/Button";
import Menu, { MenuItem } from "@material-ui/core/Menu";

const timeoutLength = 300;

class MyProfile extends React.Component {
  state = {
    anchorEl: null,

    // Keep track of whether the mouse is over the button or menu
    mouseOverButton: false,
    mouseOverMenu: false
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ mouseOverButton: false, mouseOverMenu: false });
  };

  enterButton = () => {
    this.setState({ mouseOverButton: true });
  };

  leaveButton = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      this.setState({ mouseOverButton: false });
    }, timeoutLength);
  };

  enterMenu = () => {
    this.setState({ mouseOverMenu: true });
  };

  leaveMenu = () => {
    setTimeout(() => {
      this.setState({ mouseOverMenu: false });
    }, timeoutLength);
  };

  render() {
    // Calculate open state based on mouse location
    const open = this.state.mouseOverButton || this.state.mouseOverMenu;

    return (
      <div>
        <Button
          aria-owns={this.state.open ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          onMouseEnter={this.enterButton}
          onMouseLeave={this.leaveButton}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            onMouseEnter: this.enterMenu,
            onMouseLeave: this.leaveMenu
          }}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MyProfile;
