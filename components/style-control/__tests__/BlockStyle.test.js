import React from 'react'
import { shallow, mount, render } from 'enzyme'
import BlockStyleControls from "../BlockStyle";
import StyleButton from "../StyleButton";

async function setup() {

    const props = {
        editorState: null,
        onToggle: () => {},
    }

    const component = mount(
        <BlockStyleControls {...props} />
    )

    return {
        component: component,
        styleButton: component.find(StyleButton),
    }
}

describe('BlockStyleControls component', () => {

    it('should render StyleButton component', async () => {

        const { styleButton } = await setup(true)
        
        expect(styleButton).toHaveLength(10)
    })

})