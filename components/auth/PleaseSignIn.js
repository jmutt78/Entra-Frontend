import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";
import Error from "./../ErrorMessage.js";
import CircularProgress from '@material-ui/core/CircularProgress';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <CircularProgress style={{margin: 20}} />
      if (error) return <Error error={error} />;

      if (!data.me) {
        return (
          <div>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
