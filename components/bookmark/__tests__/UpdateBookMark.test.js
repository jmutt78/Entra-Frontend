import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, Avatar, Select, Fab, Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import Bookmark from "@material-ui/icons/Bookmark";
import DeleteBookMark, { DELETE_BOOKMARK_MUTATION } from '../UpdateBookMark'

async function setup() {

    const props = {
        id: [1],
    }

    const mocks = [
        {
            request: {
                query: DELETE_BOOKMARK_MUTATION,
                variables: {
                    id: 1
                }
            },
            result: {
                data: {
                },
            },
        },
    ];

    const component = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
            <DeleteBookMark {...props} />
        </MockedProvider>
    )

    await wait(0);

    component.update();

    return {
        component: component,
        bookmark: component.find(Bookmark),
    }
}

describe('DeleteBookMark component', () => {

    it('should render Bookmark component', async () => {

        const { bookmark } = await setup()

        expect(bookmark).toHaveLength(1)
    })

})