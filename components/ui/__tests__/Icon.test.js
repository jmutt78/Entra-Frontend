import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Icon from "../Icon";

async function setup() {

    const props = {
        src: 'icon-src',
        onClick: () => {},
    }

    const component = mount(
        <Icon {...props} />
    )

    return {
        component: component,
        image: component.find('img'),
    }
}

describe('Icon component', () => {

    it('should display img', async () => {

        const { image } = await setup(true)
        
        expect(image).toHaveLength(1)
        expect(image.prop('src')).toMatch(/^icon-src/)
    })

})