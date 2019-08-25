import React from 'react'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Typography, TextField, Select, Fab, Button } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import { MockedProvider } from 'react-apollo/test-utils';
import 'jest-matcher-one-of';
import wait from 'waait';
import QuestionList, { QUESTION_PAGINATION_QUERY } from "../index";
import ListItem from "../../ListItem";
import Pagination from "../../pagination";

async function setup() {

    const props = {
        questions: [
            {
                id: '1',
                title: '',
                askedBy: [
                    { 
                        id: 1, 
                        name: 'question_name',
                        display: '',
                        image: ''
                    }
                ],
                createdAt: '2019-08-15',
                answers: [],
                description: '',
                approval: '',
                tags: [],
                views: 0,
                upVotes: 0,
                downVotes: 0,
                bookMark: [],
            }
        ],
        page: 1,
        filter: '',
    }

    const mocks = [
        {
            request: {
                query: QUESTION_PAGINATION_QUERY,
                variables: {
                    filter: '',
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
            <QuestionList {...props} />
        </MockedProvider>
    )

    return {
        component: component,
        listItem: component.find(ListItem),
        pagination: component.find(Pagination),
    }
}

describe('QuestionList component', () => {

    it('should render ListItem', async () => {

        const { component, listItem } = await setup()
        
        expect(listItem).toHaveLength(1)
    })

    it('should render Pagination', async () => {

        const { pagination } = await setup()
        
        expect(pagination).toHaveLength(1)
    })

})