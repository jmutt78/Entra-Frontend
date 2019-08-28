import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import { GraphQLError } from 'graphql';
import ErrorComp from "../../ErrorMessage.js";
import Footer, { CreditBar, FooterBar } from "../index";

async function setup() {

    const component = mount(
        <Footer />
    )

    return {
        component: component,
        footerBar: component.find(FooterBar),
        creditBar: component.find(CreditBar),
    }
}

describe('Footer component', () => {

    it('should render FooterBar component', async () => {

        const { footerBar } = await setup(true)
        
        expect(footerBar).toHaveLength(1)
    })

    it('should render CreditBar component', async () => {

        const { creditBar } = await setup(true)
        
        expect(creditBar).toHaveLength(1)
    })

})