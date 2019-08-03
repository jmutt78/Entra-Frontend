import TableFooter from "@material-ui/core/TableFooter";
import User from "../auth/User.js";
import Link from "next/link";
import Router from "next/router";
import Nav from "../nav/Nav";
import TopNav from "../nav/NavTop";
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
    fontSize: 14
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
          <h3>LEGAL</h3>
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
          <h3>COMMUNITY</h3>
        </Typography>

        <List component="nav">
          <ListItem>
            <Typography className={classes.menu}>Blog</Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.menu}>Our Team</Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          <h3>CONNECT WITH US</h3>
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
      <Grid container xs={12} className={classes.bottom}>
        <Grid xs={5}></Grid>
        <Grid xs={6}>
          <Typography color="secondary" className={classes.text}>
            <h3>@ Copyright {new Date().getFullYear()} Entra </h3>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Footer);
