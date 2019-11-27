import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Search, { SEARCH_QUESTIONS_QUERY } from '../QuestionSearch';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeQuestion, fakeAskedby } from '../../../utils/testing';

describe('<Search />', () => {
  it('renders', () => {
    shallow(<Search />);
  });

  it('matches the snapshot', () => {
    const wrapper = shallow(<Search />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders with dropdown', async () => {
    const mocks = [
      {
        request: {
          query: SEARCH_QUESTIONS_QUERY,
          variables: {
            searchTerm: 'test'
          }
        },
        result: {
          data: {
            searchQuestions: [
              {
                ...fakeQuestion
              }
            ]
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    await wait(400);
    wrapper.update();
    expect(toJSON(wrapper.find('QuestionSearch__DropDown'))).toMatchSnapshot();
  });

  it('renders with proper title in dropdown item', async () => {
    const mocks = [
      {
        request: {
          query: SEARCH_QUESTIONS_QUERY,
          variables: {
            searchTerm: 'test'
          }
        },
        result: {
          data: {
            searchQuestions: [
              {
                ...fakeQuestion,
                title: `${fakeAskedby.display} asked`,
                askedBy: [{ ...fakeAskedby }]
              }
            ]
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    await wait(400);
    wrapper.update();
    expect(wrapper.find('QuestionSearch__DropDown').text()).toContain(
      `${fakeAskedby.display} asked`
    );
  });

  it('renders with More results dropdown item', async () => {
    const mocks = [
      {
        request: {
          query: SEARCH_QUESTIONS_QUERY,
          variables: {
            searchTerm: 'test'
          }
        },
        result: {
          data: {
            searchQuestions: [
              {
                ...fakeQuestion,
                id: '1'
              },
              {
                ...fakeQuestion,
                id: '2'
              },
              {
                ...fakeQuestion,
                id: '3'
              },
              {
                ...fakeQuestion,
                id: '4'
              },
              {
                ...fakeQuestion,
                id: '5'
              },
              {
                ...fakeQuestion,
                id: '6'
              }
            ]
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );
    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    await wait(400);
    wrapper.update();
    expect(wrapper.find('QuestionSearch__DropDown').text()).toContain(
      'More results for test'
    );
  });
});
