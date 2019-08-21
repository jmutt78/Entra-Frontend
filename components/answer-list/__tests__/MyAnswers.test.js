import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import AnswerList from "../index";
import MyAnswers from '../MyAnswers';
import answersListQuery from "../answerListQuery";

async function setup(shouldWait, shouldError) {

    let mocks;

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: answersListQuery,
                    variables: {
                        filter: "my",
                        skip: 0,
                        first: 10
                    }
                },
                result: {
                    data: {
                        answers: [],
                    },
                },
            },
        ];
    } 
    else {

        mocks = [
            {
                request: {
                    query: answersListQuery,
                    variables: {
                        filter: "my",
                        skip: 0,
                        first: 10
                    },
                },
                error: new Error('Error while fetching data from server'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MyAnswers page={1} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        answerlist: component.find(AnswerList),
    }
}

describe('MyAnswers component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })
    
    it('should render AnswerList', async () => {

        const { answerlist } = await setup(true, false)
        
        expect(answerlist).toHaveLength(1)
    })

})