import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "../nav/Nav";
import TopNav from "../nav/NavTop";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#F2F4EF"
  },
  bar: {
    backgroundColor: "grey",
    marginLeft: "2rem",
    marginTop: ".5rem"
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    fontSize: "2rem",
    marginLeft: "2rem",
    position: "relative",
    zIndex: 2,
    transform: "skew(-7deg)",
    textTransform: "uppercase",
    textDecoration: "none",
    color: "#E8A87C"
  },
  navLinks: {
    fontSize: "1.5rem",
    marginLeft: "2rem",
    position: "relative",
    zIndex: 2,
    textDecoration: "none",
    color: "black"
  }
};

const Header = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={16}>
      <AppBar position="static" className={classes.root}>
        <TopNav />
      </AppBar>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            <Link href="/">
              <a className={classes.logo}>ENTRA</a>
            </Link>
          </Typography>
          <Typography>
            <Link href="/qa">
              <a className={classes.navLinks}>Ask a Question</a>
            </Link>
          </Typography>
          <Typography>
            <Link href="/blogs">
              <a className={classes.navLinks}>Blog</a>
            </Link>
          </Typography>
          <Grid item xs={2}>
            <AppBar position="static" className={classes.bar}>
              <Nav />
            </AppBar>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
