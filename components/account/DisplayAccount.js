import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80
  }
});

class DisplayAccount extends Component {
  handleImage(user, classes) {
    console.log(user.image);
    if (user.image == null || user.image == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{user.name[0]}</Avatar>
        </div>
      );
    }
    return (
      <div>
        <Avatar
          alt="Remy Sharp"
          src={user.image}
          className={classes.bigAvatar}
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.me;
          const dateToFormat = data.me.createdAt;
          return (
            <div>
              <div>
                {this.handleImage(user, classes)}
                <h2>{data.me.name}</h2>
                <Link href="/account/editaccount">
                  <a style={{ textDecoration: "none", color: "grey" }}>
                    EDIT ACCOUNT INFO
                  </a>
                </Link>
                <h3>{data.me.display}</h3>
                <span>
                  Member Since {format(parseISO(dateToFormat), "MMMM dd, yyyy")}
                </span>
              </div>
              <div>
                <p>{data.me.about}</p>
              </div>
              <div>
                <h3>Q&A Activity</h3>
              </div>
              <div>
                <h3>Badges</h3>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

DisplayAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayAccount);
