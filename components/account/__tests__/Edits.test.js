import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import UpdateUser, { UPDATE_USER_MUTATION } from '../Edits'

async function setup() {

    const props = {
        data: {
            me: {
                name: 'name',
                email: 'email@domain.com',
                display: '',

            }
        },
    }

    const mocks = [
        {
            request: {
                query: UPDATE_USER_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <UpdateUser {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        typography: component.find(Typography),
        form: component.find('form'),
        avatar: component.find(Avatar),
        button: component.find(Button),
        uploadicon: component.find(CloudUploadIcon),
        textfields: component.find(TextField),
    }
}

describe('UpdateUser component', () => {

    it('should display title', async () => {

        const { typography } = await setup()

        expect(typography.at(0).text()).toMatch(/^Edit your Profile/)
    })

    it('should render form', async () => {

        const { form } = await setup()

        expect(form).toHaveLength(1)
    })

    it('should render Avatar component', async () => {

        const { avatar } = await setup()

        expect(avatar).toHaveLength(1)
    })

    it('should render CloudUploadIcon component', async () => {

        const { uploadicon } = await setup()

        expect(uploadicon).toHaveLength(1)
    })

    it('should render change avatar button', async () => {

        const { button } = await setup()

        expect(button.at(0).text()).toMatch(/^Change Avatar/)
    })

    it('should render name input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(0).prop('label')).toBe('name')
    })

    it('should render email input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(1).prop('label')).toBe('email')
    })

    it('should render display name input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(2).prop('label')).toBe('display name')
    })

    it('should render location input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(3).prop('label')).toBe('location')
    })

    it('should render industry input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(4).prop('label')).toBe('industry')
    })

    it('should render about me input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(5).prop('label')).toBe('about me')
    })

    it('should render save button', async () => {

        const { button } = await setup()

        expect(button.at(1).prop('type')).toBe('submit')
    })

})