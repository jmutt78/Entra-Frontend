import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import SelectAnswer from '../SelectAnswer';
import { SELECT_ANSWER_MUTATION } from '../SelectAnswer';

async function setup(selected, canSelect) {

    const props = {
        questionId: 1,
        selected: selected,
        canSelect: canSelect,
    }

    const mocks = [
        {
            request: {
                query: SELECT_ANSWER_MUTATION,
                variables: {id: 1}
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <SelectAnswer {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        button: component.find(Button),
    }
}

describe('SelectAnswer component', () => {

    describe('when given selected is true', () => {
    
        it('should display Selected Answer button', async () => {

            const { button } = await setup(true, true)

            expect(button.at(0).text()).toMatch(/^Selected Answer/)
        })
    })

    describe('when given selected is false and canSelect is false', () => {
    
        it('should not display Selected Answer button', async () => {

            const { component } = await setup(false, false)

            expect(component.text()).not.toMatch(/Selected Answer/)
        })
    
        it('should not display Select button', async () => {

            const { component } = await setup(false, false)

            expect(component.text()).not.toMatch(/Select/)
        })
    })

    describe('when given selected is false and canSelect is true', () => {
    
        it('should not display Selected Answer button', async () => {

            const { component } = await setup(false, true)

            expect(component.text()).not.toMatch(/Selected Answer/)
        })
    
        it('should display Select button', async () => {

            const { button } = await setup(false, true)

            expect(button.at(0).text()).toMatch(/^Select/)
        })
    })

})