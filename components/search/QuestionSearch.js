import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';
import debounce from 'lodash.debounce';
import TextField from '@material-ui/core/TextField';

// TODO: quesy only approved q and a
export const SEARCH_QUESTIONS_QUERY = gql`
  query SEARCH_QUESTIONS_QUERY($searchTerm: String!) {
    title: questions(where: { title_contains: $searchTerm }) {
      id
      title
      description
    }
    description: questions(where: { description_contains: $searchTerm }) {
      id
      title
      description
    }
    answer: questions {
      id
      title
      description
      answers(where: { body_contains: $searchTerm }) {
        id
      }
    }
    user: questions {
      id
      title
      description
      askedBy(where: { display_contains: $searchTerm }) {
        id
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

function routeToQuestion(question) {
  console.log(question);
  Router.push({
    pathname: '/question',
    query: {
      id: question.id
    }
  });
}

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
      data: { description, title, answer, user }
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

    const filteredQuestions = title
      .concat(questions)
      .splice(2)
      .map(t => {
        return {
          ...t,
          title: `Question: ${t.title}`
        };
      })
      .splice(2);

    const filteredAnswers = answer
      .filter(a => a.answers.length > 0)
      .map(a => {
        return {
          ...a,
          title: `Answer: ${a.title}`
        };
      })
      .splice(2);

    const filteredUsers = user
      .filter(u => u.askedBy.length > 0)
      .map(u => {
        return {
          ...u,
          title: `User: ${u.title}`
        };
      })
      .splice(2);

    const searchResult = filteredQuestions
      .concat(filteredAnswers)
      .concat(filteredUsers);

    this.setState({
      searchResult,
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchContainer>
        <Downshift
          onChange={routeToQuestion}
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
                      className: this.state.loading ? 'loading' : '',
                      placeholder: 'Search for a question'
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.searchResult.map((question, index) => (
                    <DropDownItem
                      {...getItemProps({ item: question })}
                      key={`${question.id}:${question.title.split(' ')[0]}`}
                      highlighted={index === highlightedIndex}
                    >
                      {question.title}
                    </DropDownItem>
                  ))}
                  {!this.state.searchResult.length && !this.state.loading && (
                    <DropDownItem>
                      {' '}
                      No Question Found for {inputValue}
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
