import React, { useEffect, useState } from 'react';
import { upperFirst } from 'lodash';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import ListItem from '../ListItem';
import PageHeader from '../PageHeader';
import Search from '../search/QuestionSearch';
import { QuestionListContainer } from '../../src/styledComponents';
import BlogFeatured from '../featured-story';
import NewMembers from '../new-members';

const Container = styled.div`
  padding-top: 15px;
  display: flex;
`;

const QuestionContainer = styled.div`
  max-width: 800px;
  flex: 2;
  @media (max-width: 769px) {
  }
`;

const FooterContainer = styled.div`
  max-width: 500px;
  margin-left: 50px;
  margin-right: 50px;
  flex: 1;
  @media (max-width: 1193px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  padding: 5px 0px 5px 0px;
`;

function QuestionList(props) {
  const { questions, onLoadMore, name, hasMoreQuestions } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [questions]);

  const handleScroll = (e, onLoadMore) => {
    e.preventDefault();
    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
      e.currentTarget.scrollHeight
    ) {
      setIsLoading(true);
      if (isLoading === false) {
        onLoadMore();
      }
    }
  };

  return (
    <QuestionListContainer>
      <PageHeader title={upperFirst(name)} />
      <SearchContainer>
        <Search />
      </SearchContainer>

      <ul
        onScroll={e => handleScroll(e, onLoadMore)}
        style={{ paddingLeft: 5 }}
      >
        <Container>
          <QuestionContainer>
            {questions &&
              questions.map(question => {
                return (
                  <ListItem
                    item={question}
                    user={question.askedBy[0]}
                    userId={question.askedBy[0].id}
                    linkTo={{
                      pathname: '/question',
                      query: { id: question.id }
                    }}
                    showDetails={true}
                    name={name}
                    key={question.id}
                    display={question.askedBy[0].display}
                  />
                );
              })}
          </QuestionContainer>

          <FooterContainer>
            <Typography
              variant="h6"
              style={{ paddingLeft: 30, fontWeight: 'bold' }}
            >
              Welcome New Members
            </Typography>
            <NewMembers />
            <Typography
              variant="h6"
              style={{ paddingLeft: 30, fontWeight: 'bold' }}
            >
              Story of the Month
            </Typography>
            <BlogFeatured />
          </FooterContainer>
        </Container>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading && hasMoreQuestions && (
          <CircularProgress
            style={{ marginBottom: 20, position: 'absolute', bottom: 0 }}
          />
        )}
      </div>
    </QuestionListContainer>
  );
}

export default QuestionList;
