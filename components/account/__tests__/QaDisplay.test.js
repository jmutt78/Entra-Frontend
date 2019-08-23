import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from "next/link";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import { Typography } from '@material-ui/core';
import QaDisplay from '../QaDisplay'
import { PAGINATION_QUERY } from "../../pagination/paginationQuery.js";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;

    const props = {
        user: {
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
        },
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: PAGINATION_QUERY,
                    variables: {
                        filter: "my"
                    }
                },
                result: {
                    data: {
                    },
                },
            },
        ];
    } 
    else if(graphqlError) {

        mocks = [
            {
                request: {
                    query: PAGINATION_QUERY,
                    variables: {
                        filter: "my"
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
                    query: PAGINATION_QUERY,
                    variables: {
                        filter: "my"
                    },
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <QaDisplay {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        link: component.find(Link),
        typography: component.find(Typography),
    }
}

describe('QaDisplay component', () => {

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
    
    it('should display title', async () => {

        const { typography } = await setup(true, false)
        
        expect(typography.at(0).text()).toMatch(/^Activity/)
    })

    it('should display user myQuestions length', async () => {

        const { typography } = await setup(true, false)
        
        expect(typography.at(1).text()).toBe("0")
    })

})