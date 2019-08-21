import UpdateUser from "../../components/account/Edits";
import { Query } from "react-apollo";
import PleaseSignIn from "../../components/auth/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../../components/auth/User";
import Layout from "../../components/layout/index.js";

const EditAccount = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      return (
        <Layout>
          {" "}
          <UpdateUser data={data} />
        </Layout>
      );
    }}
  </Query>
);

export default EditAccount;
