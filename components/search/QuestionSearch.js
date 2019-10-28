import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import deburr from 'lodash/deburr';
import debounce from 'lodash.debounce';
import TextField from '@material-ui/core/TextField';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

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
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
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
    questions: [],
    answers: [],
    users: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    if (e.target.value.trim() === '') {
      this.setState({
        questions: [],
        loading: false
      });
      return;
    }

    // Manually query apollo client
    const {
      data: { description, title }
    } = await client.query({
      query: SEARCH_QUESTIONS_QUERY,
      variables: { searchTerm: e.target.value }
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
    console.log(questions);
    this.setState({
      questions: title.concat(questions),
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <div>
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
                  {this.state.questions.map((question, index) => (
                    <DropDownItem
                      {...getItemProps({ item: question })}
                      key={question.id}
                      highlighted={index === highlightedIndex}
                    >
                      {question.title}
                    </DropDownItem>
                  ))}
                  {!this.state.questions.length && !this.state.loading && (
                    <DropDownItem> Nothing Found {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default QuestionSearch;
