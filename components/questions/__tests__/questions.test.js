import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from '../../ErrorMessage.js';
import Questions from '../index';
import QuestionList from '../../question-list';
import questionListQuery from '../../question-list/questionListQuery';
import { fakeQuestion, fakeAskedby } from '../../../utils/testing';

// TODO: fix this + test fetch more
// remove pagination testing
async function setup(shouldWait, shouldError = false, graphqlError = true) {
  let mocks;
  const filter = 'all';
  const props = {
    page: 1
  };

  if (!shouldError) {
    mocks = [
      {
        request: {
          query: questionListQuery,
          variables: {
            filter,
            offset: 0,
            limit: 10
          }
        },
        result: {
          data: {
            questions: [
              {
                ...fakeQuestion,
                askedBy: [{ ...fakeAskedby }]
              }
            ]
          }
        }
      }
    ];
  } else if (graphqlError) {
    mocks = [
      {
        request: {
          query: questionListQuery,
          variables: {
            filter,
            offset: 0,
            limit: 10
          }
        },
        result: {
          errors: [new GraphQLError('GraphQL Error!')]
        }
      }
    ];
  } else if (!graphqlError) {
    mocks = [
      {
        request: {
          query: questionListQuery,
          variables: {
            filter,
            offset: 0,
            limit: 10
          }
        },
        error: new Error('Network Error!')
      }
    ];
  }

  const component = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Questions {...props} />
    </MockedProvider>
  );

  if (shouldWait) {
    await wait(0);

    component.update();
  }

  return {
    component: component,
    error: component.find(ErrorComp),
    questionList: component.find(QuestionList)
  };
}

describe('Questions component', () => {
  it('should render loading state initially', async () => {
    const mocks = [
      {
        request: {
          query: questionListQuery,
          variables: {
            filter: 'all',
            offset: 0,
            limit: 10
          }
        },
        result: {
          data: {
            questions: [
              {
                ...fakeQuestion,
                askedBy: [{ ...fakeAskedby }]
              }
            ]
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Questions />
      </MockedProvider>
    );
    expect(
      toJSON(wrapper.find('div[MuiCircularProgress-svg]'))
    ).toMatchSnapshot();
  });

  it('should show error when graphql errors occured fetching data from server', async () => {
    const mocks = [
      {
        request: {
          query: questionListQuery,
          variables: {
            filter: 'all',
            offset: 0,
            limit: 10
          }
        },
        result: {
          errors: [new GraphQLError('GraphQL Error!')]
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Questions />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const error = wrapper.find('[data-test="graphql-error"]');
    console.log(error.text());
    expect(error.text()).toContain('Shoot!GraphQL Error!');
    expect(toJSON(error)).toMatchSnapshot();
  });

  it('should show error when network errors occured fetching data from server', async () => {
    const { error } = await setup(true, true, false);
    expect(error.at(0).text()).toMatch(/^Shoot!Network error/);
  });

  it('should render QuestionList', async () => {
    const { questionList } = await setup(true);
    expect(questionList).toHaveLength(1);
  });
});
