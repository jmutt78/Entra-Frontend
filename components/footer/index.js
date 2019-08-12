import TableFooter from "@material-ui/core/TableFooter";
import User from "../auth/User.js";
import Link from "next/link";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#F2F4EF",
    marginTop: theme.spacing.unit * 7
  },
  grid: { marginTop: theme.spacing.unit * 5 },
  bottom: { marginTop: theme.spacing.unit * 5, backgroundColor: "black" },
  text: {
    color: "#85BDCB",
    display: "block",
    fontSize: 17,
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold"
  },
  bottomText: {
    color: "#85BDCB",
    fontSize: 18,
    margin: theme.spacing.unit * 3
  },
  menu: {
    color: "#grey",
    fontSize: 16,
    cursor: "pointer"
  },
  img: {
    marginRight: 15,
    width: 30,
    color: "grey"
  }
});

const Footer = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={2} className={classes.grid} />
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          LEGAL
        </Typography>

        <List component="nav">
          <ListItem>
            <Typography className={classes.menu}>
              Terms and Conditions
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.menu}>
              GDPR Privacy Policy
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          COMMUNITY
        </Typography>

        <List component="nav">
          <ListItem>
            <Typography className={classes.menu}>
              <Link href="/blogs">
                <a>Blog</a>
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.menu}>Our Team</Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography variant="h3" className={classes.text}>
          CONNECT WITH US
        </Typography>
        <List component="nav">
          <ListItem>
            <a href="https://www.facebook.com/Entra-463274424415901">
              <img
                className={classes.img}
                src="static/icons8-facebook-circled-48.png"
              />
            </a>
            <a href="https://www.instagram.com/entra.io/">
              <img
                className={classes.img}
                src="static/icons8-instagram-old-50.png"
              />
            </a>
            <a href="https://www.linkedin.com/company/entraio/about">
              <img
                className={classes.img}
                src="static/icons8-linkedin-48.png"
              />
            </a>
            <a href="https://www.linkedin.com/company/entraio/about">
              <img
                className={classes.img}
                src="static/icons8-twitter-squared-48.png"
              />
            </a>
          </ListItem>
        </List>
      </Grid>

      <Grid container className={classes.bottom} spacing={16}>
        <Grid item xs={5} />
        <Grid item xs={6}>
          <Typography variant="h3" className={classes.bottomText}>
            @ Copyright {new Date().getFullYear()} Entra
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Footer);
