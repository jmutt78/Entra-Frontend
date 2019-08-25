import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import NoQuestion from "../NoQuestion";

async function setup() {

    const component = mount(
        <NoQuestion />
    )

    return {
        component: component,
    }
}

describe('NoQuestion component', () => {

    it('should display description', async () => {

        const { component } = await setup()
        
        expect(component.text()).toMatch(/We are currently reviewing this question. Please check back later/)
    })

})