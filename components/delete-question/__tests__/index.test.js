import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import DeleteQuestion, { DELETE_QUESTION_MUTATION } from '../index';
import questionListQuery from "../../question-list/questionListQuery";

async function setup() {

    const props = {
        id: 1,
    }

    const mocks = [
        {
            request: {
                query: DELETE_QUESTION_MUTATION,
                variables: {
                    id: 1
                }
            },
            result: {
                data: {
                },
            },
        },
        {
            request: {
                query: questionListQuery,
                variables: {
                    filter: ["my", "all"],
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
            <DeleteQuestion {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        button: component.find(Button),
    }
}

describe('DeleteQuestion component', () => {

    it('should render delete button', async () => {

        const { button } = await setup()

        expect(button.at(0).children().text()).toMatch(/^DELETE/)
    })

})