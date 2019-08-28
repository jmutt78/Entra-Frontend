import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Permissions from '../Permissions';
import { UserPermissions, ALL_USERS_QUERY } from "../Permissions";

async function setup(shouldWait, shouldError) {

    let mocks;

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: ALL_USERS_QUERY,
                    variables: {
                    }
                },
                result: {
                    data: {
                        users: [
                            {
                                id: 1,
                                name: 'user_name',
                                email: 'user_email@domain.com',
                                display: 'user_display',
                                createdAt: '2019-08-10',
                                updatedAt: '2019-08-10',
                                location: 'user_location',
                                about: 'user_about',
                                industry: 'user_industry',
                                image: '',
                                myBookMarks: [],
                                myQuestions: [],
                                myAnswers: [],
                                permissions: [],
                                badges: {
                                    autobiographer: true,
                                },
                            }
                        ],
                    },
                },
            },
        ];
    } 
    else {

        mocks = [
            {
                request: {
                    query: ALL_USERS_QUERY,
                    variables: {
                    },
                },
                error: new Error('Error while fetching data from server'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Permissions />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        userPermissions: component.find(UserPermissions),
    }
}

describe('Permissions component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })
    
    it('should render UserPermissions', async () => {

        const { userPermissions } = await setup(true, false)
        
        expect(userPermissions).toHaveLength(1)
    })

})