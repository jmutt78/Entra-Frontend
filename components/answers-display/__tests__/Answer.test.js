import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Avatar from "@material-ui/core/Avatar";
import Answer, { CREATE_ANSWER_VOTE_MUTATION } from '../Answer';
import ApproveAnswer from "../../approval/AppoveAnswer";
import SelectAnswer from "../../approval/SelectAnswer";
import questionQuery from "../../question-display/questionQuery";

async function setup() {

    const props = {
        answer: {
            id: 1,
            title: '',
            body: 'answer_body',
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
            id: 1,
            askedBy: [
                {
                    id: 1,
                }
            ]
        }
    }

    const mocks = [
        {
            request: {
                query: CREATE_ANSWER_VOTE_MUTATION,
                variables: {
                    answerId: 1,
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
                query: questionQuery,
                variables: {
                    id: 1,
                }
            },
            result: {
                data: {
                },
            },
        },
    ];
    
    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Answer {...props} />
        </MockedProvider>
    )

    await wait(0);
    component.update();
    await wait(0);
    component.update();

    return {
        component: component,
        typography: component.find(Typography),
        selectAnswer: component.find(SelectAnswer),
        approveAnswer: component.find(ApproveAnswer),
        avatar: component.find(Avatar),
    }
}

describe('Answer component', () => {

    it('should render withour crash', async () => {

        const { component } = await setup()
    })

    // it('should display answer body', async () => {

    //     const { component,typography } = await setup()

    //     expect(typography.at(0).text()).toMatch(/^answer_body/)
    // })

    // it('should render SelectAnswer', async () => {

    //     const { selectAnswer } = await setup()

    //     expect(selectAnswer).toHaveLength(1)
    // })

    // it('should render ApproveAnswer', async () => {

    //     const { approveAnswer } = await setup()

    //     expect(approveAnswer).toHaveLength(1)
    // })

    // it('should render Avatar', async () => {

    //     const { avatar } = await setup()

    //     expect(avatar).toHaveLength(1)
    // })

    // it('should display answer date', async () => {

    //     const { component } = await setup()

    //     expect(component.text()).toMatch(/August 10, 2019/)
    // })

})