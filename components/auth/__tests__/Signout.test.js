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
import Signout, { SIGN_OUT_MUTATION } from '../Signout'

async function setup() {

    const mocks = [
        {
            request: {
                query: SIGN_OUT_MUTATION,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Signout />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        typography: component.find(Typography),
    }
}

describe('Signout component', () => {

    it('should render Sign Out button', async () => {

        const { typography } = await setup()

        expect(typography.at(0).text()).toMatch(/^Sign Out/)
    })

})