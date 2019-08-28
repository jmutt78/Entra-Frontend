import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import SelectedUserAnswers from "../SelectedUserAnswers";
import AnswerList from "../../answer-list";
import userAnswerQuery from "../answerListQuery.js";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    const filter = "selected";
    const props = {
        id: 1,
        page: 1,
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: userAnswerQuery,
                    variables: {
                        id: 1,
                        filter,
                        skip: 0,
                        first: 10
                    }
                },
                result: {
                    data: {
                        answers: []
                    },
                },
            },
        ];
    } 
    else if(graphqlError) {

        mocks = [
            {
                request: {
                    query: userAnswerQuery,
                    variables: {
                        id: 1,
                        filter,
                        skip: 0,
                        first: 10
                    },
                },
                result: {
                    errors: [new GraphQLError('GraphQL Error!')]
                }
            },
        ];
    }
    else if(!graphqlError) {

        mocks = [
            {
                request: {
                    query: userAnswerQuery,
                    variables: {
                        id: 1,
                        filter,
                        skip: 0,
                        first: 10
                    },
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <SelectedUserAnswers {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        answerList: component.find(AnswerList),
    }
}

describe('SelectedUserAnswers component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when graphql errors occured fetching data from server', async () => {

        const { error } = await setup(true, true, true)
      
        expect(error.at(0).text()).toMatch(/^Shoot!GraphQL Error!/)
    })

    it('should show error when network errors occured fetching data from server', async () => {

        const { error } = await setup(true, true, false)
      
        expect(error.at(0).text()).toMatch(/^Shoot!Network error/)
    })

    it('should render AnswerList', async () => {

        const { answerList } = await setup(true)
        
        expect(answerList).toHaveLength(1)
    })

})