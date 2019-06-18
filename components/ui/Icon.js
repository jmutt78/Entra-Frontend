import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  icon: {
    cursor: "pointer"
  }
});

class Icon extends React.Component {
  render() {
    const { classes, src, onClick } = this.props;
    return <img onClick={onClick} src={src} className={classes.icon} />;
  }
}

export default withStyles(styles)(Icon);
