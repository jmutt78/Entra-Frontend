import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import BadgesDisplay from '../BadgesDisplay';
import { BadgesList, BadgeItem } from '../BadgesDisplay';

async function setup(badgeEmpty=true) {

    let props;

    if(badgeEmpty) {
        props = {
            user: {
                badges: []
            },
        }
    } else {
        props = {
            user: {
                badges: {
                    autobiographer: true,
                }
            },
        }
    }
    
    const component = mount(
        <BadgesDisplay {...props} />
    )

    return {
        component: component,
        typography: component.find(Typography),
        badgeslist: component.find(BadgesList),
        badgeitem: component.find(BadgeItem)
    }
}

describe('BadgesDisplay component', () => {

    it('should display title', async () => {

        const { typography } = await setup()

        expect(typography.at(0).text()).toMatch(/^Badges/)
    })

    it('should display placeholder when no badges', async () => {

        const { typography } = await setup()

        expect(typography.at(1).text()).toMatch(/^No bages yet/)
    })

    it('should render BadgesList component', async () => {

        const { badgeslist } = await setup()

        expect(badgeslist).toHaveLength(1)
    })

    describe('when given badges', () => {

        it('should not display placeholder', async () => {

            const { typography } = await setup(false)
    
            expect(typography.at(1).text()).not.toMatch(/^No bages yet/)
        })

        it('should render BadgeItem component', async () => {

            const { badgeitem } = await setup(false)
    
            expect(badgeitem).toHaveLength(1)
        })
    })

})