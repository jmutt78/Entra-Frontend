import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import MyBookMark from "../index";
import QuestionList from "../../question-list";
import questionListQuery from "../../question-list/questionListQuery";

async function setup(shouldWait, shouldError) {

    let mocks;
    const filter = "My BookMarked";

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: questionListQuery,
                    variables: {
                        filter: filter,
                        skip: 0,
                        first: 10
                    }
                },
                result: {
                    data: {
                        questions: [],
                    },
                },
            },
        ];
    } 
    else {

        mocks = [
            {
                request: {
                    query: questionListQuery,
                    variables: {
                        filter: filter,
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
            <MyBookMark page={1} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        questionList: component.find(QuestionList),
    }
}

describe('MyBookMark component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should show error when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })
    
    it('should render QuestionList', async () => {

        const { questionList } = await setup(true, false)
        
        expect(questionList).toHaveLength(1)
    })

})