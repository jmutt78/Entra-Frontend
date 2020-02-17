import React from 'react';
import DisplayAccount from '../../components/account/DisplayAccount';
import PleaseSignIn from '../../components/auth/PleaseSignIn';
import Layout from '../../components/layout/index.js';

const Account = () => (
  <Layout>
    <DisplayAccount />
  </Layout>
);

export default Account;
