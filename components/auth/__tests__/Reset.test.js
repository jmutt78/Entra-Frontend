import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import Reset, { RESET_MUTATION } from '../Reset'

async function setup() {

    const mocks = [
        {
            request: {
                query: RESET_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Reset />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        h2: component.find('h2'),
        form: component.find('form'),
        button: component.find(Button),
        textfield: component.find(TextField),
    }
}

describe('Reset component', () => {

    it('should render form', async () => {

        const { form } = await setup()

        expect(form).toHaveLength(1)
    })

    it('should display title', async () => {

        const { h2 } = await setup()

        expect(h2.at(0).text()).toMatch(/^Reset Password/)
    })

    it('should render TextField for password', async () => {

        const { textfield } = await setup()

        expect(textfield.at(0).prop('name')).toBe('password')
    })

    it('should render TextField for confirmPassword', async () => {

        const { textfield } = await setup()

        expect(textfield.at(1).prop('name')).toBe('confirmPassword')
    })

    it('should render submit button', async () => {

        const { button } = await setup()

        expect(button.at(0).text()).toMatch(/^Reset Password/)
    })

})