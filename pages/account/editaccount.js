import UpdateUser from "../../components/account/Edits";
import { Query } from "react-apollo";
import PleaseSignIn from "../../components/auth/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../../components/auth/User";

const EditAccount = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      return <UpdateUser data={data} />;
    }}
  </Query>
);

export default EditAccount;
