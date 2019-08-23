import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import ListItem, { CustomTableCell } from "../index";
import Link from "next/link";

async function setup() {

    const props = {
        item: {
            id: 1,
            title: 'item title',
            body: 'item body',
            link: '',
            createdAt: '2019-08-10',
            tags: [],
            answers: [],
            views: 1,
            upVotes: 2,
            downVotes: 3,
            askedBy: [],
        },
        router: '',
        linkTo: '',
        userName: 'username',
        userId: 1,
        showDetails: true,
    }

    const component = mount(
        <ListItem {...props} />
    )

    return {
        component: component,
        typography: component.find(Typography),
        link: component.find(Link),
        customTableCell: component.find(CustomTableCell),
    }
}

describe('ListItem component', () => {

    it('should display title', async () => {

        const { typography } = await setup()
        
        expect(typography.at(0).text()).toBe('item title')
    })

    it('should display body', async () => {

        const { typography } = await setup()
        
        expect(typography.at(1).text()).toBe('item body')
    })

    it('should display views', async () => {

        const { customTableCell } = await setup()
        
        expect(customTableCell.at(0).text()).toBe('1')
    })

    it('should display upVotes', async () => {

        const { customTableCell } = await setup()
        
        expect(customTableCell.at(1).text()).toBe('2')
    })

    it('should display downVotes', async () => {

        const { customTableCell } = await setup()
        
        expect(customTableCell.at(2).text()).toBe('3')
    })

})