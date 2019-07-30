import User from "../auth/User.js";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "../nav/Nav";
import TopNav from "../nav/NavTop";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
    backgroundColor: "#85BDCB",
    marginLeft: "2rem",
    marginTop: ".5rem"
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    marginTop: "1rem",
    marginLeft: "2rem",
    maxHeight: "60px",
    maxWidth: "170px",
    width: "170px",
    height: "60px"
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
    <User>
      {({ data: { me } }) => (
        <Grid container className={classes.root} spacing={16}>
          <AppBar position="static" className={classes.root}>
            <TopNav />
          </AppBar>
          <AppBar position="static" className={classes.root}>
            <Toolbar>
              <Typography variant="h6" className={classes.grow}>
                <Link href="/">
                  <a>
                    {
                      <img
                        className={classes.logo}
                        src="static/Screen Shot 2019-05-07 at 10.37.21 AM.jpg"
                      />
                    }
                  </a>
                </Link>
              </Typography>
              {!me ? (
                <Typography>
                  <Link href="/signup">
                    <a className={classes.navLinks}>Ask a Question</a>
                  </Link>
                </Typography>
              ) : (
                <Typography>
                  <Link href="/qa">
                    <a className={classes.navLinks}>Ask a Question</a>
                  </Link>
                </Typography>
              )}

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
      )}
    </User>
  );
};

export default withStyles(styles)(Header);
