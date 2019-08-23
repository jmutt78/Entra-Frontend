import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import FacebookLogin from "react-facebook-login";
import { FacebookLoginButtonWithoutApollo } from '../FacebookLoginButton';

function setup() {

    const component = shallow(
        <FacebookLoginButtonWithoutApollo />
    )

    return {
        component: component,
    }
}

describe('FacebookLoginButton component', () => {

    it('should render without crash', () => {

        const { component } = setup()
    })

})