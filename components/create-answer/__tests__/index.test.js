import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { CURRENT_USER_QUERY } from '../../auth/User'
import CreateAnswer, { CREATE_ANSWER } from "../index";

async function setup(shouldWait, shouldError) {

    const props = {
        question: {
            id: '1',
            title: 'title',
            askedBy: [{ id: 1, name: 'Steve' }],
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
    }

    let mocks;

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {
                    }
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
                            badges: {
                                autobiographer: false,
                                critic: false,
                                patron: false,
                                reviewer: false,
                                analyst: false,
                                commentor: false,
                                frequentFlyer: false,
                                niceAnswer: false,
                                expert: false,
                                teacher: false,
                                pundit: false,
                                powerVoter: false,
                                provoker: false,
                            },
                        }
                    },
                },
            },
            {
                request: {
                    query: CREATE_ANSWER,
                    variables: {
                        body: 'answer',
                    }
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
                            badges: {
                            },
                        }
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
                    variables: {
                    },
                },
                error: new Error('Error while fetching data from server'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <CreateAnswer {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        textField: component.find(TextField),
        button: component.find(Button),
    }
}

describe('CreateAnswer component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error UI when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })

    it('should render answer input', async () => {

        const { component, textField } = await setup(true, false)

        expect(textField.at(0).prop('name')).toBe('body')
    })

    it('should render post button', async () => {

        const { button } = await setup(true, false)
      
        expect(button.at(0).text()).toMatch(/^Post Answer/)
    })
})