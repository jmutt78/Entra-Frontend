import DisplayAccount from "../../components/account/DisplayAccount";
import PleaseSignIn from "../../components/auth/PleaseSignIn";

const Account = props => (
  <div>
    <PleaseSignIn>
      <DisplayAccount />
    </PleaseSignIn>
  </div>
);

export default Account;
