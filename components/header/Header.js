import PropTypes from "prop-types";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Nav from "../nav/Nav.js";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  grow: {
    flexGrow: 1
  }
};

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" color="orange" className={classes.grow}>
            <Link href="/">
              <a style={{ textDecoration: "none" }}>ENTRA</a>
            </Link>
          </Typography>
          <Nav />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
