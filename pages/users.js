import React from 'react';
import UserList from '../components/user-list';
import Layout from '../components/layout/index.js';
import { ScrollablePageContainer } from '../src/styledComponents';

const MyQA = props => (
  <Layout>
    <ScrollablePageContainer>
      <UserList page={parseFloat(props.query.page) || 1} id={props.query.id} />
    </ScrollablePageContainer>
  </Layout>
);

export default MyQA;
