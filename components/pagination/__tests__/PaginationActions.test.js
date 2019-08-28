import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { RouterContext } from 'next-server/dist/lib/router-context';
import PaginationActions from "../PaginationActions";

async function setup() {

    const props = {
        page: 1,
        pages: 5,
    }

    const router = {
        pathname: '/users/$user',
        route: '/users/$user',
        query: { user: 'nikita' },
        asPath: '/users/nikita',
    }

    const component = mount(
        <RouterContext.Provider value={router}>
            <PaginationActions {...props} />
        </RouterContext.Provider>
    )

    return {
        component: component,
        button: component.find(Button),
    }
}

describe('PaginationActions component', () => {

    it('should render Previous Page button', async () => {

        const { button } = await setup(true)

        expect(button.at(0).text()).toMatch(/^Previous Page/)
    })
    
    it('should render Next Page button', async () => {

        const { button } = await setup(true)

        expect(button.at(1).text()).toMatch(/Next Page/)
    })

})