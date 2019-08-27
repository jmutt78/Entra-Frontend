import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import DisplayUser, { USER_QUERY } from "../index";
import QaDisplay from "../../account/QaDisplay";
import MainInfoDisplay from "../../account/MainInfoDisplay";
import BadgesDisplay from "../../account/BadgesDisplay";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    const filter = "user";
    const props = {
        id: 1,
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: USER_QUERY,
                    variables: {
                        id: 1,
                    }
                },
                result: {
                    data: {
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
                                autobiographer: false,
                                critic: false,
                                patron: false,
                                reviewer: false,
                                analyst: false,
                                commentor: false,
                                frequentFlyer: false,
                                niceAnswer: false,
                                expert: false,
                                teacher: false,
                                pundit: false,
                                powerVoter: false,
                                provoker: false,
                            },
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
                    query: USER_QUERY,
                    variables: {
                        id: 1,
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
                    query: USER_QUERY,
                    variables: {
                        id: 1,
                    },
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <DisplayUser {...props} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        mainInfoDisplay: component.find(MainInfoDisplay),
        qaDisplay: component.find(QaDisplay),
        badgesDisplay: component.find(BadgesDisplay),
    }
}

describe('DisplayUser component', () => {

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

    it('should render MainInfoDisplay', async () => {

        const { mainInfoDisplay } = await setup(true)
        
        expect(mainInfoDisplay).toHaveLength(1)
    })

    it('should render QaDisplay', async () => {

        const { qaDisplay } = await setup(true)
        
        expect(qaDisplay).toHaveLength(1)
    })

    it('should render BadgesDisplay', async () => {

        const { badgesDisplay } = await setup(true)
        
        expect(badgesDisplay).toHaveLength(1)
    })

})