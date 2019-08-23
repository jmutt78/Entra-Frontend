import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import CreateQuestion from '../../create-question'
import CreateTag from '../CreateTag'
import { TAGS_QUERY } from '../Tags'
import { CREATE_QUESTION_MUTATION } from '../../create-question'

async function setup() {

    const mocks = [
        {
            request: {
                query: TAGS_QUERY,
            },
            result: {
                data: {
                    tags: [{ id: '1', name: 'Buck' }],
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <CreateQuestion />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        typography: component.find(Typography),
        textfields: component.find(TextField),
        select: component.find(Select),
        fab: component.find(Fab),
        button: component.find(Button)
    }
}

describe('CreateQuestion component', () => {

    it('should display title', async () => {

        const { component } = await setup()

        expect(component.text()).toMatch(/^Ask a question/)
    })

    it('should render title input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(0).prop('label')).toBe('Title')
    })

    it('should render tag select', async () => {

        const { select } = await setup()

        expect(select.at(0).prop('name')).toBe('tags')
    })

    it('should not disable add tag button', async () => {

        const { fab } = await setup()

        expect(fab.at(0).prop('disabled')).toBeOneOf([undefined, ''])
    })

    it('should render description input', async () => {

        const { textfields } = await setup()

        expect(textfields.at(1).prop('label')).toBe('Description')
    })

    it('should disable post button when title empty', async () => {

        const { component, button } = await setup()

        component.setState({
            title: '',
        })

        expect(button.at(0).prop('disabled')).toBe('disabled')
    })

    it('should disable post button when description empty', async () => {

        const { component, button } = await setup()

        component.setState({
            description: '',
        })

        expect(button.at(0).prop('disabled')).toBe('disabled')
    })

    describe('when given title and description', () => {

        it('should not disable post button', async () => {

            const { component, button } = await setup()

            component.setState({
                title: 'title',
                description: 'description'
            })

            expect(button.at(0).prop('disabled')).toBeOneOf([undefined, ''])
        })

        it('should create question and give visual feedback', async () => {

            const mocks = [
                {
                    request: {
                        query: TAGS_QUERY,
                    },
                    result: {
                        data: {
                            tags: [{ id: '1', name: 'Buck' }],
                        },
                    },
                },
                {
                    request: {
                        query: CREATE_QUESTION_MUTATION,
                        variables: {title: "title", description: "description", tags: ["tag1", "tag2"]}
                    },
                    result: {
                        data: {
                            id: 1,
                            title: "title",
                            tags: [
                                {id: 1, name: "tag1"},
                                {id: 2, name: "tag2"},
                            ]
                        },
                    },
                },
            ];
        
            const component = mount(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <CreateQuestion />
                </MockedProvider>
            )
        
            await wait(0);
        
            component.update();

            const button = component.find(Button);

            button.simulate('click');
        })
    })

})