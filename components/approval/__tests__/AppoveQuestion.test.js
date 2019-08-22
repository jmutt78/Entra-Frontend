import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import ApproveQuestion from '../AppoveQuestion';
import { APPROVE_QUESTION_MUTATION } from '../AppoveQuestion';

async function setup(approval, isApproved) {

    const props = {
        id: 1,
        isApproved: isApproved,
        approval: approval,
        hasPermissions: true,
    }

    const mocks = [
        {
            request: {
                query: APPROVE_QUESTION_MUTATION,
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
            <ApproveQuestion {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        button: component.find(Button),
    }
}

describe('ApproveQuestion component', () => {

    describe('when given approval is null', () => {
    
        it('should display Approve button', async () => {

            const { button } = await setup(null, true)

            expect(button.at(0).text()).toMatch(/^Approve/)
        })
    
        it('should display Reject button', async () => {

            const { button } = await setup(null, true)

            expect(button.at(1).text()).toMatch(/^Reject/)
        })
    })

    describe('when given approval is not null and isApproved is false', () => {
    
        it('should display Approve button', async () => {

            const { button } = await setup(true, false)

            expect(button.at(0).text()).toMatch(/^Approve/)
        })
    
        it('should not display Reject button', async () => {

            const { component } = await setup(true, false)

            expect(component.text()).not.toMatch(/Reject/)
        })
    })

    describe('when given approval is not null and isApproved is true', () => {
    
        it('should not display Approve button', async () => {

            const { component } = await setup(true, true)

            expect(component.text()).not.toMatch(/Approve/)
        })
    
        it('should display Reject button', async () => {

            const { button } = await setup(true, true)

            expect(button.at(0).text()).toMatch(/^Reject/)
        })
    })

})