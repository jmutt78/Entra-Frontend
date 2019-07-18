import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import User from "../auth/User.js";

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    margin: 22,
    backgroundColor: "#E27D60"
  },
  nav: {
    color: "white",
    fontSize: "1.5rem",
    marginLeft: "2rem",
    marginRight: "2rem",
    position: "relative",
    zIndex: 2,
    textDecoration: "none",
    fontSize: 20,
    fontWieght: "strong"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#85BDCB"
  }
};

const Nav = props => {
  const { classes } = props;

  return (
    <User>
      {({ data: { me } }) => (
        <div>
          {me && <></>}
          {!me && (
            <div>
              <Link href="/signin">
                <a variant="outlined" color="secondary" className={classes.nav}>
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </User>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nav);
