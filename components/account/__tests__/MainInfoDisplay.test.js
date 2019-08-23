import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from "next/link";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import MainInfoDisplay from '../MainInfoDisplay'
import { CURRENT_USER_QUERY } from '../../auth/User';

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
                    query: CURRENT_USER_QUERY,
                    variables: {}
                },
                result: {
                    data: {
                        me: { 
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
                            badges: [],
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
                    variables: {},
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
                    variables: {},
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MainInfoDisplay {...props} />
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
    }
}

describe('MainInfoDisplay component', () => {

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
    
    it('should display user name', async () => {

        const { component } = await setup(true, false)
        
        expect(component.text()).toMatch(/user_name/)
    })

    it('should display user display', async () => {

        const { component } = await setup(true, false)
        
        expect(component.text()).toMatch(/user_display/)
    })

    it('should display user location', async () => {

        const { component } = await setup(true, false)
        
        expect(component.text()).toMatch(/user_location/)
    })

    it('should display user industry', async () => {

        const { component } = await setup(true, false)
        
        expect(component.text()).toMatch(/user_industry/)
    })

    it('should display user createAt', async () => {

        const { component } = await setup(true, false)
        
        expect(component.text()).toMatch(/August 10, 2019/)
    })

    it('should display user about', async () => {

        const { component } = await setup(true, false)
        
        expect(component.text()).toMatch(/user_about/)
    })

    it('should render edit button', async () => {

        const { component, link } = await setup(true, false)
        
        expect(link.text()).toMatch(/EDIT ACCOUNT INFO/)
    })

})