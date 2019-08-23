import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import TextField from "@material-ui/core/TextField";
import AnswerForm, { UPDATE_ANSWER_MUTATION } from '../AnswerForm'

async function setup() {

    const props = {
        answer: {
            body: 'answer',
        }
    }

    const mocks = [
        {
            request: {
                query: UPDATE_ANSWER_MUTATION,
                variables: {
                    body: "description"
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
            <AnswerForm {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        typography: component.find(Typography),
        form: component.find('form'),
        textField: component.find(TextField),
        button: component.find(Button),
    }
}

describe('AnswerForm component', () => {

    it('should display title', async () => {

        const { typography } = await setup()

        expect(typography.at(0).text()).toMatch(/^Edit Answer/)
    })

    it('should render form', async () => {

        const { form } = await setup()

        expect(form).toHaveLength(1)
    })

    it('should render answer input', async () => {

        const { textField } = await setup()

        expect(textField.at(0).prop('name')).toBe('body')
    })

    it('should render post button', async () => {

        const { button } = await setup()

        expect(button.at(0).children().text()).toBe('Post Answer')
    })

})