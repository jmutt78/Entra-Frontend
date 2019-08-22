import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import DeleteAnswer, { DELETE_ANSWER_MUTATION } from '../index'

async function setup() {

    const props = {
        id: 1,
        questionId: 2,
    }

    const mocks = [
        {
            request: {
                query: DELETE_ANSWER_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <DeleteAnswer {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        typography: component.find(Typography),
        form: component.find('form'),
        button: component.find(Button),
        textfield: component.find(TextField),
    }
}

describe('DeleteAnswer component', () => {

    it('should render DELETE button', async () => {

        const { button } = await setup()

        expect(button.at(0).text()).toMatch(/^DELETE/)
    })

})