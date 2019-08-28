import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import User, { CURRENT_USER_QUERY } from '../User'

async function setup() {

    const mocks = [
        {
            request: {
                query: CURRENT_USER_QUERY,
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <User children={() => (<div></div>)} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
    }
}

describe('User component', () => {

    it('should render without crash', async () => {

        const { component } = await setup()
    })

})