import React from 'react'
import { shallow, mount, render } from 'enzyme'
import InlineStyleControls from "../InlineStyle";
import StyleButton from "../StyleButton";

async function setup() {

    const props = {
        editorState: null,
        onToggle: () => {},
    }

    const component = mount(
        <InlineStyleControls {...props} />
    )

    return {
        component: component,
        styleButton: component.find(StyleButton),
    }
}

describe('InlineStyleControls component', () => {

    it('should render StyleButton component', async () => {

        const { styleButton } = await setup(true)
        
        expect(styleButton).toHaveLength(4)
    })

})