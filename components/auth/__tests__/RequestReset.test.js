import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import ResetPassword, { REQUEST_RESET_MUTATION } from '../RequestReset'

async function setup() {

    const mocks = [
        {
            request: {
                query: REQUEST_RESET_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ResetPassword />
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

describe('ResetPassword component', () => {

    it('should render form', async () => {

        const { form } = await setup()

        expect(form).toHaveLength(1)
    })

    it('should render TextField for email', async () => {

        const { textfield } = await setup()

        expect(textfield.at(0).prop('name')).toBe('email')
    })

    it('should render submit button', async () => {

        const { button } = await setup()

        expect(button.at(0).text()).toMatch(/^Send Reset Password Link/)
    })

})