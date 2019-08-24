import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Navbar from "../Navbar";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    const props = {
        question: {
            id: 1,
            tags: [],
        },
    }

    const component = shallow(
        <Navbar {...props} />
    )

    return {
        component: component,
    }
}

describe('Navbar component', () => {

    it('should render without crash', async () => {

        const { component } = await setup(false)

    })

})