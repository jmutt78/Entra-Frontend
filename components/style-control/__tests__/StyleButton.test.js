import React from 'react'
import { shallow, mount, render } from 'enzyme'
import StyleButton from "../StyleButton";

async function setup() {

    const props = {
        active: false,
        label: 'label'
    }

    const component = mount(
        <StyleButton {...props} />
    )

    return {
        component: component,
    }
}

describe('StyleButton component', () => {

    it('should display label', async () => {

        const { component } = await setup(true)
        
        expect(component.text()).toMatch(/label/)
    })

})