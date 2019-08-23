import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from "next/link";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import MainInfoDisplay from '../MainInfoDisplay'
import { CURRENT_USER_QUERY } from '../../auth/User';

async function setup(shouldWait, shouldError) {

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
    else {

        mocks = [
            {
                request: {
                    query: CURRENT_USER_QUERY,
                    variables: {},
                },
                error: new Error('Error while fetching data from server'),
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
        link: component.find(Link),
    }
}

describe('MainInfoDisplay component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
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