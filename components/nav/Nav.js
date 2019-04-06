import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

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
    <div>
      <Link href="/login">
        <Button variant="outlined" color="secondary" className={classes.button}>
          Login
        </Button>
      </Link>
      <Link href="/signup">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Signup
        </Button>
      </Link>
    </div>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nav);
