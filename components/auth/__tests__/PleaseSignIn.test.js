import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import PleaseSignIn from '../PleaseSignIn';
import { CURRENT_USER_QUERY } from "../User";
import Signin from "../Signin";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

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
                        me: {
                            id: 1,
                            name: 'name',
                            email: 'email@domain.com',
                            display: '',
                            createdAt: '2019-08-10',
                            updatedAt: '2019-08-10',
                            location: '',
                            about: '',
                            industry: '',
                            image: '',
                            badges: [],
                            myBookMarks: [],
                            myQuestions: [],
                            myAnswers: [],
                            permissions: []
                        },
                    },
                },
            },
        ];
    } 
    else if(graphqlError) {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {
                    },
                },
                result: {
                    errors: [new GraphQLError('GraphQL Error!')]
                }
            },
        ];
    }
    else if(!graphqlError) {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {
                    },
                },
                error: new Error('Network Error!'),
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
        error: component.find(ErrorComp),
        signin: component.find(Signin),
    }
}

describe('PleaseSignIn component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    // it('should show error when graphql errors occured fetching data from server', async () => {

    //     const { component, error } = await setup(true, true, true)

    //     console.log('############### component', component.debug())
    //     console.log('############### error', error.debug())
      
    //     expect(error.at(0).text()).toMatch(/^Shoot!GraphQL Error!/)
    // })

    // it('should show error when network errors occured fetching data from server', async () => {

    //     const { error } = await setup(true, true, false)
      
    //     expect(error.at(0).text()).toMatch(/^Shoot!Network error/)
    // })
    
    // it('should render UserPermissions', async () => {

    //     const { signin } = await setup(true)
        
    //     expect(signin).toHaveLength(1)
    // })

})