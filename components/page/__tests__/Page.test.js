import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Router, { withRouter } from 'next/router';
import Header from '../../header'
import Meta from '../../meta/Meta.js'
import Footer from '../../footer'
import Page from "../Page";
import { TAGS_QUERY } from "../../create-question/Tags";
import { createRouter } from 'next/router';
jest.mock("next/router");

const action = () => {
    console.log('triggered');
    return new Promise((resolve, reject) => reject());
};

const mockedRouter = {
    push: action,
    replace: action,
    prefetch: () => { },
    route: '/mockme',
};

withRouter.mockImplementation(() => Component => props => <Component {...props} router={mockedRouter} />);

async function setup() {
    
    const mocks = [
        {
            request: {
                query: TAGS_QUERY,
                variables: {
                }
            },
            result: {
                data: {
                },
            },
        },
    ];

    const TestPage = withRouter(Page)

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <TestPage />
        </MockedProvider>
    )

    return {
        component: component,
        meta: component.find(Meta),
        header: component.find(Header),
        footer: component.find(Footer),
    }
}

describe('Page component', () => {

    it('should render Meta', async () => {

        const { component, meta } = await setup()
    })
    
    it('should render Header', async () => {

        const { header } = await setup()
    })

    it('should render Footer', async () => {

        const { footer } = await setup()
    })

})