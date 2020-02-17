import React from 'react';
import TagsList from '../components/tags-list';
import { ScrollablePageContainer } from '../src/styledComponents';

const MyQA = props => (
  <ScrollablePageContainer>
    <TagsList page={parseFloat(props.query.page) || 1} id={props.query.id} />
  </ScrollablePageContainer>
);

export default MyQA;
