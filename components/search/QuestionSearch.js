import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';
import { debounce } from 'lodash';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

export const SEARCH_QUESTIONS_QUERY = gql`
  query SEARCH_QUESTIONS_QUERY(
    $searchTerm: String!
    $offset: Int
    $noDuplicates: Boolean
  ) {
    searchQuestions(
      limit: 15
      offset: $offset
      noDuplicates: $noDuplicates
      where: {
        AND: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
          {
            answers_some: {
              AND: [{ body_contains: $searchTerm }, { approval: true }]
            }
          }
          { tags_some: { name_contains: $searchTerm } }
          { askedBy_some: { display_contains: $searchTerm } }
          {
            answers_some: {
              AND: [
                { answeredBy: { display_contains: $searchTerm } }
                { approval: true }
              ]
            }
          }
          { approval: true }
        ]
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
      approval
      answers(where: { approval: true }) {
        body
        id
        approval
        answeredBy {
          id
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
      searchTermFoundIn
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
  display: flex;
  cursor: pointer;
  margin-left: 5px;
  input {
    width: 500px;

    margin-left: 25px;
    border: 0;
    font-size: 1rem;

    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
  @media (max-width: 767px) {
    input {
      width: 320px;
    }
`;

//mobile style
const DropDown = styled.div`
  position: absolute;
  width: 50%;
  z-index: 2;
  border: 1px solid #ebebeb;
  @media (max-width: 767px) {
    width: 90%;
  }
`;

const Search = styled.div`
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
    margin-right: 0px;
  }
`;

class QuestionSearch extends React.Component {
  state = {
    searchResult: [],
    loading: false,
    searchTerm: ''
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

    let {
      data: { searchQuestions }
    } = await client.query({
      query: SEARCH_QUESTIONS_QUERY,
      variables: {
        searchTerm: e.target.value
      }
    });
    this.setState({
      searchResult: searchQuestions,
      loading: false,
      searchTerm: e.target.value
    });
  }, 350);

  routeToQuestion = question => {
    if (question.id === 0) {
      Router.push({
        pathname: '/searchResults',
        query: {
          searchTerm: this.state.searchTerm
        }
      });
    } else {
      Router.push({
        pathname: '/question',
        query: {
          id: question.id
        }
      });
    }
  };

  getQuestionLabel = question => {
    return `${question.searchTermFoundIn}: ${question.title}`;
  };

  render() {
    const itemsInDropdown = 5;
    const { searchResult, loading } = this.state;
    resetIdCounter();
    return (
      <SearchContainer>
        <Search>
          <SearchIcon />
        </Search>
        <Downshift
          onChange={this.routeToQuestion}
          inputProps={{ 'aria-label': 'search' }}
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
                      placeholder: 'Search Questions'
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
                        {this.getQuestionLabel(question)}
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
