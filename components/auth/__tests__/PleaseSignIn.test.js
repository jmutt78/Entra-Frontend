import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import PleaseSignIn from '../PleaseSignIn';
import { CURRENT_USER_QUERY } from "../User";
import Signin from "../Signin";

async function setup(shouldWait, shouldError) {

    let mocks;

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {
                    }
                },
                result: {
                    data: {
                        me: {},
                    },
                },
            },
        ];
    } 
    else {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {
                    },
                },
                error: new Error('Error while fetching data from server'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <PleaseSignIn />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        signin: component.find(Signin),
    }
}

describe('PleaseSignIn component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })
    
    it('should render UserPermissions', async () => {

        const { signin } = await setup(true, false)
        
        expect(signin).toHaveLength(1)
    })

})