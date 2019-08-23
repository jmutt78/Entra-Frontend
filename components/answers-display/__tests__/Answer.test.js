import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Avatar from "@material-ui/core/Avatar";
import { AnswerComp } from '../Answer';
import ApproveAnswer from "../../approval/AppoveAnswer";
import SelectAnswer from "../../approval/SelectAnswer";

async function setup(badgeEmpty=true) {

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
            askedBy: [
                {
                    id: 1,
                }
            ]
        }
    }
    
    const component = mount(
        <AnswerComp {...props} />
    )

    return {
        component: component,
        typography: component.find(Typography),
        selectAnswer: component.find(SelectAnswer),
        approveAnswer: component.find(ApproveAnswer),
        avatar: component.find(Avatar),
    }
}

describe('Answer component', () => {

    it('should display answer body', async () => {

        const { typography } = await setup()

        expect(typography.at(0).text()).toMatch(/^answer_body/)
    })

    // it('should render SelectAnswer', async () => {

    //     const { selectAnswer } = await setup()

    //     expect(selectAnswer).toHaveLength(1)
    // })

    // it('should render ApproveAnswer', async () => {

    //     const { approveAnswer } = await setup()

    //     expect(approveAnswer).toHaveLength(1)
    // })

    it('should render Avatar', async () => {

        const { avatar } = await setup()

        expect(avatar).toHaveLength(1)
    })

    it('should display answer date', async () => {

        const { component } = await setup()

        expect(component.text()).toMatch(/August 10, 2019/)
    })

})