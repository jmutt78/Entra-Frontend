import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import QuestionSearch, { SEARCH_QUESTIONS_QUERY } from "../QuestionSearch";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    
    mocks = [
        {
            request: {
                query: SEARCH_QUESTIONS_QUERY,
                variables: {
                    searchTerm: ''
                }
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <QuestionSearch />
        </MockedProvider>
    )

    if(shouldWait) {
        
        await wait(0);

        component.update();
    }

    return {
        component: component,
        error: component.find(ErrorComp),
        textField: component.find(TextField),
    }
}

describe('QuestionSearch component', () => {

    it('should render TextField', async () => {

        const { textField } = await setup(true)
        
        expect(textField).toHaveLength(1)
    })

})