import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import FacebookLogin from "react-facebook-login";
import { GoogleLoginButtonWithoutApollo } from '../GoogleLoginButton';

function setup() {

    const component = shallow(
        <GoogleLoginButtonWithoutApollo />
    )

    return {
        component: component,
    }
}

describe('GoogleLoginButton component', () => {

    it('should render without crash', () => {

        const { component } = setup()
    })

})