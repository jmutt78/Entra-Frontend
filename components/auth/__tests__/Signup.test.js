import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import Signup, { SIGNUP_MUTATION } from '../Signup'

async function setup() {

    const mocks = [
        {
            request: {
                query: SIGNUP_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Signup />
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

describe('Signup component', () => {

    it('should render form', async () => {

        const { form } = await setup()

        expect(form).toHaveLength(1)
    })

    it('should display title', async () => {

        const { typography } = await setup()

        // expect(typography.at(0).text()).toMatch(/^Sign up for an account/)
    })

    it('should render name input', async () => {

        const { textfield } = await setup()

        expect(textfield.at(0).prop('name')).toBe('name')
    })

    it('should render email input', async () => {

        const { textfield } = await setup()

        expect(textfield.at(1).prop('name')).toBe('email')
    })

    it('should render name input', async () => {

        const { textfield } = await setup()

        expect(textfield.at(0).prop('name')).toBe('name')
    })

    it('should render display input', async () => {

        const { textfield } = await setup()

        expect(textfield.at(2).prop('name')).toBe('display')
    })

    it('should render submit button', async () => {

        const { button } = await setup()

        expect(button.at(0).text()).toMatch(/^Sign Up/)
    })

})