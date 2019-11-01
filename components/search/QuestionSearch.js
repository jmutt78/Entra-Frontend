import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';
import { debounce, uniqBy } from 'lodash';
import TextField from '@material-ui/core/TextField';

export const SEARCH_QUESTIONS_QUERY = gql`
  query SEARCH_QUESTIONS_QUERY($searchTerm: String!) {
    title: searchQuestions(
      where: { AND: [{ title_contains: $searchTerm }, { approval: true }] }
    ) {
      id
      title
      tags {
        id
        name
      }
      description
      createdAt
      askedBy {
        id
        display
        name
      }
      approval
      answers {
        body
        id
      }
      views
      upVotes
      downVotes
      bookMark {
        id
      }
    }
    description: searchQuestions(
      where: {
        AND: [{ description_contains: $searchTerm }, { approval: true }]
      }
    ) {
      id
      title
      tags {
        id
        name
      }
      description
      createdAt
      askedBy {
        id
        display
        name
      }
      approval
      answers {
        body
        id
      }
      views
      upVotes
      downVotes
      bookMark {
        id
      }
    }
    answer: searchQuestions(where: { approval: true }) {
      id
      title
      tags {
        id
        name
      }
      description
      createdAt
      askedBy {
        id
        display
        name
      }
      approval
      views
      upVotes
      downVotes
      bookMark {
        id
      }
      answers(
        where: { AND: [{ body_contains: $searchTerm }, { approval: true }] }
      ) {
        id
        body
      }
    }
    tag: searchQuestions(where: { approval: true }) {
      id
      title
      tags(where: { name_contains: $searchTerm }) {
        id
        name
      }
      description
      createdAt
      askedBy {
        id
        display
        name
      }
      approval
      views
      upVotes
      downVotes
      bookMark {
        id
      }
      answers {
        id
        body
      }
    }
    userAsk: searchQuestions(where: { approval: true }) {
      id
      title
      tags {
        id
        name
      }
      description
      createdAt
      approval
      answers {
        body
        id
      }
      views
      upVotes
      downVotes
      bookMark {
        id
      }
      askedBy(where: { display_contains: $searchTerm }) {
        id
        display
        name
      }
    }
    userAnswer: searchQuestions(where: { approval: true }) {
      id
      title
      tags {
        id
        name
      }
      description
      createdAt
      approval
      answers(
        where: {
          AND: [
            { answeredBy: { display_contains: $searchTerm } }
            { approval: true }
          ]
        }
      ) {
        body
        answeredBy {
          display
        }
      }
      views
      upVotes
      downVotes
      bookMark {
        id
      }
      askedBy {
        id
        display
        name
      }
    }
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  padding-bottom: 30px;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 1.5rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid #ebebeb;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid #ebebeb;
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? '#EBEBEB' : 'white')};
  img {
    margin-right: 10px;
  }
`;

class QuestionSearch extends React.Component {
  state = {
    searchResult: [],
    loading: false
  };

  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    if (e.target.value.trim() === '') {
      this.setState({
        searchResult: [],
        loading: false
      });
      return;
    }

    const {
      data: { description, title, answer, userAsk, userAnswer, tag }
    } = await client.query({
      query: SEARCH_QUESTIONS_QUERY,
      variables: {
        searchTerm: e.target.value
      }
    });
    let questions = [];
    description.forEach(d => {
      let includes = false;
      title.forEach(t => {
        if (d.id === t.id) {
          includes = true;
        }
      });
      if (!includes) {
        questions.push(d);
      }
    });

    // Mark these results as coming from description and title queries
    const filteredQuestions = title.concat(questions).map(t => {
      return { ...t, querySource: 'q' };
    });

    // Mark these results as coming from answer query
    const filteredAnswers = answer
      .filter(a => a.answers.length > 0)
      .map(a => {
        return { ...a, querySource: 'a' };
      });

    // Mark these results as coming from user query that asked the question
    const filteredUsersAsk = userAsk
      .filter(u => u.askedBy.length > 0)
      .map(u => {
        return { ...u, querySource: 'uAsk', display: u.askedBy[0].display };
      });

    // Mark these results as coming from user query that answered the question
    const filteredUsersAnswer = userAnswer
      .filter(u => u.answers.length > 0)
      .map(u => {
        return {
          ...u,
          querySource: 'uAnswer',
          display: u.answers[0].answeredBy.display
        };
      });

    // Mark these results as coming from tags
    const filteredTags = tag
      .filter(a => a.tags.length > 0)
      .map(a => {
        return { ...a, querySource: 't' };
      });

    const searchResult = filteredQuestions
      .concat(filteredAnswers)
      .concat(filteredUsersAsk)
      .concat(filteredUsersAnswer)
      .concat(filteredTags);

    this.setState({
      searchResult,
      loading: false
    });
  }, 350);

  routeToQuestion = question => {
    if (question.id === 0) {
      // Remove duplicate questions
      let noDuplicates = uniqBy(this.state.searchResult, 'id');
      this.props.onNewSearch(noDuplicates);
    } else {
      Router.push({
        pathname: '/question',
        query: {
          id: question.id
        }
      });
    }
  };
  render() {
    const itemsInDropdown = 5;
    const { searchResult, loading } = this.state;
    resetIdCounter();
    return (
      <SearchContainer>
        <Downshift
          onChange={this.routeToQuestion}
          itemToString={question => (question === null ? '' : question.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <TextField
                    {...getInputProps({
                      type: 'search',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                      id: 'search',
                      className: loading ? 'loading' : '',
                      placeholder: 'Search for a question'
                    })}
                  ></TextField>
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {searchResult
                    .filter((question, index) => index < itemsInDropdown)
                    .map((question, index) => (
                      <DropDownItem
                        {...getItemProps({ item: question })}
                        key={`${question.id}:${question.title.split(' ')[0]}`}
                        highlighted={index === highlightedIndex}
                      >
                        {question.querySource === 'q'
                          ? `Question: ${question.title}`
                          : question.querySource === 'a'
                          ? `Answer: ${question.title}`
                          : question.querySource === 'uAsk'
                          ? `${question.display} asked: ${question.title}`
                          : question.querySource === 'uAnswer'
                          ? `${question.display} answered to: ${question.title}`
                          : `Tag: ${question.title}`}
                      </DropDownItem>
                    ))}
                  {searchResult.length >= itemsInDropdown &&
                    !this.state.loading && (
                      <DropDownItem
                        {...getItemProps({
                          item: { id: 0, title: inputValue }
                        })}
                        key={'more-item'}
                        highlighted={itemsInDropdown === highlightedIndex}
                      >
                        More results for {inputValue}
                      </DropDownItem>
                    )}
                  {!searchResult.length &&
                    !this.state.loading &&
                    inputValue.trim() !== '' && (
                      <DropDownItem>
                        No questions found for {inputValue}
                      </DropDownItem>
                    )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchContainer>
    );
  }
}

export default QuestionSearch;
