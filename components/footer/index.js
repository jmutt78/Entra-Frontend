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
    backgroundColor: "#85BDCB",
    marginTop: theme.spacing.unit * 7
  },
  grid: { marginTop: theme.spacing.unit * 5 },
  bottom: { marginTop: theme.spacing.unit * 5, backgroundColor: "black" },
  text: {
    color: "white",
    fontSize: 14
  },
  menu: {
    color: "grey"
  }
});

const Footer = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={3} className={classes.grid} />
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          <h3>LEGAL</h3>
        </Typography>

        <List component="nav">
          <ListItem button>
            <ListItemText
              className={classes.menu}
              primary="Terms and Conditions"
            />
          </ListItem>
          <ListItem button>
            <ListItemText primary="GDPR Privacy Policy" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          <h3>COMMUNITY</h3>
        </Typography>

        <List component="nav">
          <ListItem button>
            <ListItemText primary="Blog" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Our Team" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          <h3>CONNECT WITH US</h3>
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.bottom} />
    </Grid>
  );
};

export default withStyles(styles)(Footer);
