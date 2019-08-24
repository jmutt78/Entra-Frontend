import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import QuestionForm, { UPDATE_QUESTION_MUTATION } from "../QuestionForm";
import CreateTag from "../../create-question/CreateTag.js";
import { TAGS_QUERY } from "../../create-question/Tags";

async function setup(shouldWait, shouldError=false, graphqlError=true) {

    let mocks;
    const props = {
        question: {
            id: 1,
            tags: [],
        },
    }

    if(!shouldError) {

        mocks = [
            {
                request: {
                    query: TAGS_QUERY,
                    variables: {
                    }
                },
                result: {
                    data: {
                        tags: [
                            {
                                id: 1,
                                name: 'tag1',
                            },
                        ],
                    },
                },
            },
            {
                request: {
                    query: UPDATE_QUESTION_MUTATION,
                    variables: {
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
                    query: TAGS_QUERY,
                    variables: {
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
                    query: TAGS_QUERY,
                    variables: {
                    },
                },
                error: new Error('Network Error!'),
            },
        ];
    }

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <QuestionForm {...props} />
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
        form: component.find('form'),
        textField: component.find(TextField),
        select: component.find(Select),
        button: component.find(Button),
        createTag: component.find(CreateTag),
    }
}

describe('QuestionForm component', () => {

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

        const { typography } = await setup(true)

        expect(typography.at(0).text()).toMatch(/^Edit question/)
    })
    
    it('should render form', async () => {

        const { form } = await setup(true)
        
        expect(form).toHaveLength(1)
    })

    it('should render title input', async () => {

        const { textField } = await setup(true)
        
        expect(textField.at(0).prop('name')).toBe('title')
    })

    it('should render tags select', async () => {

        const { select } = await setup(true)
        
        expect(select.at(0).prop('name')).toBe('tags')
    })

    it('should render add tag button', async () => {

        const { button } = await setup(true)
        
        expect(button.at(0).text()).toBe('ADD NEW TAG')
    })

    it('should render description input', async () => {

        const { textField } = await setup(true)
        
        expect(textField.at(1).prop('name')).toBe('description')
    })

    it('should render CreateTag component', async () => {

        const { createTag } = await setup(true)
        
        expect(createTag).toHaveLength(1)
    })

    it('should render submit button', async () => {

        const { button } = await setup(true)
        
        expect(button.at(1).text()).toBe('Post Question')
    })

    describe('when given props.tags undefined', () => {

        it('should render without crash', async () => {

            const props = {
                question: {
                    id: 1,
                },
            }
            const mocks = [
                {
                    request: {
                        query: TAGS_QUERY,
                        variables: {
                        }
                    },
                    result: {
                        data: {
                            tags: [
                                {
                                    name: 'tag1',
                                },
                            ],
                        },
                    },
                },
                {
                    request: {
                        query: UPDATE_QUESTION_MUTATION,
                        variables: {
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
                    <QuestionForm {...props} />
                </MockedProvider>
            )
            await wait(0);
            component.update();
        })
    })

})