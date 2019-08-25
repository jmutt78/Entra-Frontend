import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import CreatBookMark, { CREATE_BOOKMARK_MUTATION } from '../CreateBookMark'

async function setup() {

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
            myBookMarks: [
                {
                    questions: []
                }
            ],
            myQuestions: [],
            myAnswers: [],
            permissions: [],
            badges: {
                autobiographer: true,
            },
        },
        question: {
            id: 1,
            bookMark: []
        }
    }

    const mocks = [
        {
            request: {
                query: CREATE_BOOKMARK_MUTATION,
                variables: {
                    questionId: 1
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
            <CreatBookMark {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
    }
}

describe('CreatBookMark component', () => {

    it('should render without crash', async () => {

        const { component } = await setup()
    })

})