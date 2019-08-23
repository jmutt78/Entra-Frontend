import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Answers from '../index';
import Answer from "../Answer";
import { CURRENT_USER_QUERY } from '../../auth/User';

async function setup(shouldWait, shouldError) {

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
    else {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {},
                },
                error: new Error('Error while fetching data from server'),
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
        typography: component.find(Typography),
        answer: component.find(Answer),
    }
}

describe('Answers component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
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