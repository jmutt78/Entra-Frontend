import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import QuestionDetail, { EditButton } from "../QuestionDetail";
import ApproveQuestion from "../../approval/AppoveQuestion.js";

async function setup() {

    const props = {
        item: {
            id: 1,
            description: 'item_description',
            body: 'item body',
            link: '',
            createdAt: '2019-08-10',
            tags: [
                {
                    id: 1,
                    name: 'tag1',
                },
                {
                    id: 2,
                    name: 'tag2',
                },
            ],
            answers: [],
            views: 1,
            upVotes: 2,
            downVotes: 3,
            askedBy: [],
        },
        userName: 'user_name',
        question: {
            id: '1',
            title: 'title',
            askedBy: [
                { 
                    id: 1, 
                    name: 'Steve',
                    display: 'brVY8iDxFrnBc5whcDSO',
                    image: '2iBiEQsD6bW8O3GGveWN'
                }
            ],
            createdAt: '2019-08-15',
            answers: [],
            description: '',
            approval: '',
            tags: [],
            views: 5495952867,
            upVotes: 0,
            downVotes: 0,
            bookMark: []
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
        }
    }

    const component = mount(
        <QuestionDetail {...props} />
    )

    return {
        component: component,
        typography: component.find(Typography),
        editButton: component.find(EditButton),
        avatar: component.find(Avatar),
        approveQuestion: component.find(ApproveQuestion),
        link: component.find(Link),
    }
}

describe('QuestionDetail component', () => {

    it('should display description', async () => {

        const { component } = await setup()
        
        expect(component.text()).toMatch(/description/)
    })

    it('should display tags', async () => {

        const { component } = await setup()
        
        expect(component.text()).toMatch(/tag1/)
        expect(component.text()).toMatch(/tag2/)
    })

    it('should render ApproveQuestion', async () => {

        const { approveQuestion } = await setup()
        
        expect(approveQuestion).toHaveLength(1)
    })

    it('should render ApproveQuestion', async () => {

        const { editButton } = await setup()
        
        expect(editButton).toHaveLength(1)
    })

    it('should render Avatar', async () => {

        const { avatar } = await setup()
        
        expect(avatar.at(0).prop('src')).toBe("2iBiEQsD6bW8O3GGveWN")
    })

    it(`should display 'Asked by display' link`, async () => {

        const { component } = await setup()
        
        expect(component.text()).toMatch(/brVY8iDxFrnBc5whcDSO/)
    })

    it(`should display question views`, async () => {

        const { component } = await setup()
        
        expect(component.text()).toMatch(/5495952867/)
    })

})