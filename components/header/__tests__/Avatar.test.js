import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import MyProfile from "../Avatar";
import Link from "next/link";
import Signout from "../../auth/Signout";
import Menu from "@material-ui/core/Menu";

async function setup() {

    const props = {
        me: {
            image: 'http://mydomain.com/avatar.png',
            name: 'name',
        },
    }

    const component = mount(
        <MyProfile {...props} />
    )

    return {
        component: component,
        menu: component.find(Menu),
        link: component.find(Link),
        signout: component.find(Signout),
    }
}

describe('MyProfile component', () => {

    it('should render Menu component', async () => {

        const { menu } = await setup()
        
        expect(menu).toHaveLength(1)
    })

})