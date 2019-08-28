import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import Link from 'next/link'
import Signin, { SignupPrompt, SIGNIN_MUTATION } from '../Signin'

async function setup() {

    const mocks = [
        {
            request: {
                query: SIGNIN_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Signin />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        signupPrompt: component.find(SignupPrompt),
        typography: component.find(Typography),
        form: component.find('form'),
        button: component.find(Button),
        textfield: component.find(TextField),
        link: component.find(Link),
    }
}

describe('Signin component', () => {

    it('should render form', async () => {

        const { form } = await setup()

        expect(form).toHaveLength(1)
    })

    it('should display title', async () => {

        const { typography } = await setup()

        expect(typography.at(0).text()).toMatch(/^Sign In/)
    })

    it('should render SignupPrompt component', async () => {

        const { signupPrompt } = await setup()

        expect(signupPrompt).toHaveLength(1)
    })

    it('should render email input', async () => {

        const { textfield } = await setup()

        expect(textfield.at(0).prop('name')).toBe('email')
    })

    it('should render password input', async () => {

        const { textfield } = await setup()

        expect(textfield.at(1).prop('name')).toBe('password')
    })

    it('should render submit button', async () => {

        const { button } = await setup()

        // expect(button.at(1).text()).toMatch(/^Log In/)
    })

    it('should render forgot password button', async () => {

        const { link } = await setup()

        // expect(link.at(1).text()).toMatch(/^FORGOT PASSWORD/)
    })

})