import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import questionListQuery from "../../question-list/questionListQuery";
import { PAGINATION_QUERY } from "../../pagination"
import MyQuestions from "../../my-questions";
import QuestionList from "../../question-list";

async function setup(shouldWait, shouldError) {

    let mocks;

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: questionListQuery,
                    variables: {
                        filter: 'my',
                        skip: 0,
                        first: 10
                    }
                },
                result: {
                    data: {
                        questions: [{ 
                            id: '1',
                            title: 'title',
                            askedBy: [{id: 1, name: 'Steve'}],
                            createdAt: '2019-08-15',
                            answers: [],
                            description: '',
                            approval: '',
                            tags: [],
                            views: 0,
                            upVotes: 0,
                            downVotes: 0,
                            bookMark: []
                        }],
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
                        filter: "my",
                        skip: 0,
                        first: 10,
                    },
                },
                error: new Error('Error while fetching data from server'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MyQuestions page={1} />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        questionlist: component.find(QuestionList)
    }
}

describe('MyQuestions component', () => {

    it('should render loading state initially', async () => {

        const { component } = await setup(false, false)

        expect(component.text()).toMatch(/^Loading.../)
    })

    it('should render QuestionList', async () => {

        const { questionlist } = await setup(true, false)
        
        expect(questionlist).toHaveLength(1)
    })

    it('should show error UI when failed fetching data from server', async () => {

        const { component } = await setup(true, true)
      
        expect(component.text()).toMatch(/^Error/)
    })
})