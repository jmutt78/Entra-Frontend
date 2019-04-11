import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import User from "../auth/User.js";
import Signout from "../auth/Signout";

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    margin: 10
  }
};

const Nav = props => {
  const { classes } = props;

  return (
    <User>
      {({ data: { me } }) => (
        <div>
          {me && (
            <>
              <Signout />
            </>
          )}
          {!me && (
            <>
              <Link href="/signup">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Signup
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                >
                  Login
                </Button>
              </Link>
            </>
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
