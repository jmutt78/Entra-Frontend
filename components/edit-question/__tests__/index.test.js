import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import UpdateQuestion from "../index";
import QuestionForm from "../QuestionForm";
import questionQuery from "../../question-display/questionQuery";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    const props = {
        id: 1,
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: questionQuery,
                    variables: {
                        id: 1,
                    }
                },
                result: {
                    data: {
                        question: {
                            id: '1',
                            title: 'title',
                            askedBy: [],
                            createdAt: '2019-08-15',
                            answers: [],
                            description: '',
                            approval: '',
                            tags: [],
                            views: 0,
                            upVotes: 0,
                            downVotes: 0,
                            bookMark: []
                        }
                    },
                },
            },
        ];
    } 
    else if(graphqlError) {

        mocks = [
            {
                request: {
                    query: questionQuery,
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
                    query: questionQuery,
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
            <UpdateQuestion {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        questionForm: component.find(QuestionForm),
    }
}

describe('UpdateQuestion component', () => {

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

    it('should render QuestionForm component', async () => {

        const { questionForm } = await setup(true)
        
        expect(questionForm).toHaveLength(1)
    })

})