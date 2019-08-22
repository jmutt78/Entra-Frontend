import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import CreateTag, { CREATE_TAG_MUTATION } from '../CreateTag'

async function setup() {

    const props = {
        open: true,
        onClose: () => {}
    }

    const mocks = [
        {
            request: {
                query: CREATE_TAG_MUTATION,
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
            <CreateTag {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        textField: component.find(TextField),
        button: component.find(Button),
    }
}

describe('CreateTag component', () => {

    it('should render tag name input', async () => {

        const { textField } = await setup()

        expect(textField.at(0).prop('name')).toBe('name')
    })

    it('should render submit button', async () => {

        const { button } = await setup()

        expect(button.at(0).text()).toMatch(/^Save tag/)
    })

})