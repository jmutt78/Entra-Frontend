import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import Answers from '../index';
import Answer from "../Answer";
import { CURRENT_USER_QUERY } from '../../auth/User';

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;

    const props = {
        user: {
            id: 1,
            name: 'user_name',
            email: 'user_email@domain.com',
            display: 'user_display',
            createdAt: '2019-08-10',
            updatedAt: '2019-08-10',
            location: 'user_location',
            about: 'user_about',
            industry: 'user_industry',
            image: '',
            myBookMarks: [],
            myQuestions: [],
            myAnswers: [],
            permissions: [],
            badges: {
                autobiographer: true,
            },
        },
        question: {
            answers: [
                {
                    id: 1,
                    title: '',
                    body: '',
                    link: '',
                    createdAt: '2019-08-10',
                    tags: [],
                    answers: [],
                    views: 0,
                    upVotes: 0,
                    downVotes: 0,
                    answeredTo: [
                        {
                            id: 3,
                        }
                    ],
                    answeredBy: {
                        id: 2,
                        name: 'aaa',
                    }
                },
            ]
        }
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {}
                },
                result: {
                    data: {
                        me: { 
                            id: 1,
                            name: 'user_name',
                            email: 'user_email@domain.com',
                            display: 'user_display',
                            createdAt: '2019-08-10',
                            updatedAt: '2019-08-10',
                            location: 'user_location',
                            about: 'user_about',
                            industry: 'user_industry',
                            image: '',
                            myBookMarks: [],
                            myQuestions: [],
                            myAnswers: [],
                            permissions: [],
                            badges: [],
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
                    query: CURRENT_USER_QUERY,
                    variables: {},
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
                    query: CURRENT_USER_QUERY,
                    variables: {},
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Answers {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        typography: component.find(Typography),
        answer: component.find(Answer),
    }
}

describe('Answers component', () => {

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
    
    it('should display title', async () => {

        const { typography } = await setup(true, false)
        
        expect(typography.text()).toMatch(/^Answers/)
    })

    it('should render Answer', async () => {

        const { answer } = await setup(true, false)
        
        expect(answer).toHaveLength(1)
    })

})