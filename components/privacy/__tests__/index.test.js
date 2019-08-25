import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import Privacy, { PRIVACY_QUERY } from "../index";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    const props = {
        id: 1,
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: PRIVACY_QUERY,
                    context: { clientName: "second" },
                    variables: {
                        id: "cGFnZToyMDg3",
                    }
                },
                result: {
                    data: {
                        page: {
                            id: 1,
                            title: 'page_title',
                            content: 'page_content',
                        }
                    },
                },
            },
        ];
    } 
    else if(graphqlError) {

        mocks = [
            {
                request: {
                    query: PRIVACY_QUERY,
                    variables: {
                        id: "cGFnZToyMDg3",
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
                    query: PRIVACY_QUERY,
                    variables: {
                        id: "cGFnZToyMDg3",
                    },
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Privacy {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        typography: component.find(Typography),
    }
}

describe('Privacy component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when graphql errors occured fetching data from server', async () => {

        const { error } = await setup(true, true, true)
      
        expect(error.at(0).text()).toMatch(/^Shoot!GraphQL Error!/)
    })

    it('should show error when network errors occured fetching data from server', async () => {

        const { error } = await setup(true, true, false)
      
        expect(error.at(0).text()).toMatch(/^Shoot!Network error/)
    })

    it('should display page title', async () => {

        const { typography } = await setup(true)

        expect(typography.at(0).text()).toMatch(/^page_title/)
    })

    it('should display page content', async () => {

        const { typography } = await setup(true)

        expect(typography.at(1).text()).toMatch(/^page_content/)
    })
    
})