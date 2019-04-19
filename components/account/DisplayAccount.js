import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";

import { CURRENT_USER_QUERY } from "../auth/User";

class DisplayAccount extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          console.log(data);
          const dateToFormat = data.me.createdAt;
          console.log(dateToFormat);
          console.log(format(parseISO(dateToFormat), "MMMM yyyy"));
          return (
            <div>
              <div>
                <h2>{data.me.name}</h2>
                <h3>{data.me.displayName}</h3>
                <span>
                  Member Since {format(parseISO(dateToFormat), "MMMM dd, yyyy")}
                </span>
              </div>
              <div>
                <p>{data.me.aboutMe}</p>
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

export default DisplayAccount;
