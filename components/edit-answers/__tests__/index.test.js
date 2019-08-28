import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import UpdateAnswer, { SINGLE_ANSWER_QUERY } from "../index";
import AnswerForm from "../AnswerForm";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    const props = {
        id: 1,
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: SINGLE_ANSWER_QUERY,
                    variables: {
                        id: 1,
                    }
                },
                result: {
                    data: {
                        answer: {
                            id: 1,
                            body: 'answer',
                            answeredTo: [
                                {
                                    id:2,
                                },
                            ],
                            approval: '',
                            answeredBy: [],
                        },
                    },
                },
            },
        ];
    } 
    else if(graphqlError) {

        mocks = [
            {
                request: {
                    query: SINGLE_ANSWER_QUERY,
                    variables: {
                        id: 1,
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
                    query: SINGLE_ANSWER_QUERY,
                    variables: {
                        id: 1,
                    },
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <UpdateAnswer {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        answerForm: component.find(AnswerForm),
    }
}

describe('UpdateAnswer component', () => {

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
    
    it('should render AnswerForm', async () => {

        const { answerForm } = await setup(true)
        
        expect(answerForm).toHaveLength(1)
    })

})