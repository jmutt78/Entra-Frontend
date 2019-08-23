import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import DisplayAccount from '../DisplayAccount';
import BadgesDisplay from '../BadgesDisplay'
import MainInfoDisplay from '../MainInfoDisplay'
import QaDisplay from '../QaDisplay'
import { CURRENT_USER_QUERY } from '../../auth/User';

async function setup(shouldWait, shouldError) {

    let mocks;

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
            <DisplayAccount />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        maininfodisplay: component.find(MainInfoDisplay),
        qadisplay: component.find(QaDisplay),
        badgesdisplay: component.find(BadgesDisplay),
    }
}

describe('DisplayAccount component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })
    
    it('should render MainInfoDisplay', async () => {

        const { maininfodisplay } = await setup(true, false)
        
        expect(maininfodisplay).toHaveLength(1)
    })

    it('should render QaDisplay', async () => {

        const { qadisplay } = await setup(true, false)
        
        expect(qadisplay).toHaveLength(1)
    })

    it('should render BadgesDisplay', async () => {

        const { badgesdisplay } = await setup(true, false)
        
        expect(badgesdisplay).toHaveLength(1)
    })

})