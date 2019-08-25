import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import DisplayQuestion, { CREATE_QUESTION_VOTE_MUTATION, CREATE_QUESTION_VIEW_MUTATION } from "../index";
import { CURRENT_USER_QUERY } from "../../auth/User";
import questionQuery from "../questionQuery";
import CreatBookMark from "../../bookmark/CreateBookMark.js";
import CreateAnswer from "../../create-answer";
import QuestionDetail from "../QuestionDetail";
import Answers from "../../answers-display";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;

    const props = {
        id: 1,
        question: {
            id: '1',
            title: '',
            askedBy: [
                { 
                    id: 1, 
                    name: 'question_name',
                    display: '',
                    image: ''
                }
            ],
            createdAt: '2019-08-15',
            answers: [],
            description: '',
            approval: '',
            tags: [],
            views: 0,
            upVotes: 0,
            downVotes: 0,
            bookMark: [],
        },
    }

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
                            name: 'name',
                            email: 'email@domain.com',
                            display: '',
                            createdAt: '2019-08-10',
                            updatedAt: '2019-08-10',
                            location: '',
                            about: '',
                            industry: '',
                            image: '',
                            badges: [],
                            myBookMarks: [],
                            myQuestions: [],
                            myAnswers: [],
                            permissions: []
                        },
                    },
                },
            },
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
                            title: 'puJ02AnAqMXyKikWYRLd',
                            askedBy: [
                                { 
                                    id: 1, 
                                    name: '',
                                    display: '',
                                    image: '',
                                }
                            ],
                            createdAt: '2019-08-15',
                            answers: [],
                            description: '',
                            approval: '',
                            tags: [],
                            views: 0,
                            upVotes: 8570673122,
                            downVotes: 4687969255,
                            bookMark: [],
                        }
                    },
                },
            },
            {
                request: {
                    query: CREATE_QUESTION_VOTE_MUTATION,
                    variables: {
                        questionId: 1,
                        vote: "up"
                    }
                },
                result: {
                    data: {
                    },
                },
            },
            {
                request: {
                    query: CREATE_QUESTION_VIEW_MUTATION,
                    variables: {
                        questionId: 1,
                    }
                },
                result: {
                    data: {
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
            <DisplayQuestion {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();

        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        typography: component.find(Typography),
        creatBookMark: component.find(CreatBookMark),
        questionDetail: component.find(QuestionDetail),
        answers: component.find(Answers),
        createAnswer: component.find(CreateAnswer),
    }
}

describe('DisplayQuestion component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    // it('should show error when graphql errors occured fetching data from server', async () => {

    //     const { error } = await setup(true, true, true)
      
    //     expect(error.at(0).text()).toMatch(/^Shoot!GraphQL Error!/)
    // })

    // it('should show error when network errors occured fetching data from server', async () => {

    //     const { error } = await setup(true, true, false)
      
    //     expect(error.at(0).text()).toMatch(/^Shoot!Network error/)
    // })

    // it('should display question title', async () => {

    //     const { component } = await setup(true)

    //     expect(component.text()).toMatch(/puJ02AnAqMXyKikWYRLd/)
    // })

    // it('should display question upVotes', async () => {

    //     const { component } = await setup(true)

    //     expect(component.text()).toMatch(/8570673122/)
    // })

    // it('should display question downVotes', async () => {

    //     const { component } = await setup(true)

    //     expect(component.text()).toMatch(/4687969255/)
    // })

    // it('should render CreatBookMark', async () => {

    //     const { creatBookMark } = await setup(true)

    //     expect(creatBookMark).toHaveLength(1)
    // })

    // it('should render QuestionDetail', async () => {

    //     const { questionDetail } = await setup(true)

    //     expect(questionDetail).toHaveLength(1)
    // })

    // it('should render Answers', async () => {

    //     const { answers } = await setup(true)

    //     expect(answers).toHaveLength(1)
    // })

    // it('should render CreateAnswer', async () => {

    //     const { createAnswer } = await setup(true)

    //     expect(createAnswer).toHaveLength(1)
    // })
    
})