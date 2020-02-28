import React, { useState } from 'react';
import { capitalize } from 'lodash';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import {
  DraftailEditor,
  ENTITY_TYPE,
  BLOCK_TYPE,
  INLINE_STYLE
} from 'draftail';

import Button from '@material-ui/core/Button';

import { toHTML } from '../draft-entities/toHTML';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import LinkSource from '../draft-entities/LinkSource';
import Link from '../draft-entities/Links';

import Error from '../ErrorMessage.js';

export const steps = ['introduction', 'challenges', 'help'];
const initialState = steps.reduce(
  (a, b) => ({
    ...a,
    [b]: ''
  }),
  {}
);

export const CREATE_INTRO_MUTATION = gql`
  mutation createIntro(
    $introduction: String!
    $about: String!
    $challenges: String!
  ) {
    createIntro(
      introduction: $introduction
      about: $about
      challenges: $challenges
    ) {
      id
      introduction
      about
      challenges
    }
  }
`;

export const Root = styled.div`
  flex-grow: 1;
  max-width: 850px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  h2 {
    text-align: center;
  }
`;

export const NoteContainer = styled.div`
  margin-bottom: 2rem;
  background: rgb(242, 244, 239);
  padding: 1rem 0.5rem;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  p {
    font-size: 16px;
    padding: 0 1rem;
  }
`;

export const FormContainer = styled.div`
  padding: 10px 10px 1.5rem 10px;

  @media screen and (min-width: 768px) {
    margin-top: -2rem;
    padding-left: 10px;
    padding-top: 30px;
    max-width: 850px;
    margin-left: auto;
    margin-right: auto;
  }
  .Draftail-Toolbar {
    background: #f2f4ef;
    min-height: 48px;
  }

  .Draftail-block--header-one:first-child {
    padding-top: 1.45rem;
  }
`;

export default () => {
  const [inputs, setInputs] = useState(initialState);

  const introFeilds = [
    {
      title: 'Introduce yourself. What are you working on?',
      input: 'introduction',
      placeholder: 'Introduce yourself...'
    },
    {
      title: 'Tell us your challenges?',
      input: 'challenges',
      placeholder: 'Write about your challenges...'
    },
    {
      title: 'How can the community help?',
      input: 'help',
      placeholder: 'Tell us how we can help...'
    }
  ];

  const submitForm = async (e, createIntro) => {
    e.preventDefault();

    const {
      data: {
        createIntro: { id }
      }
    } = await createIntro();
    Router.push({
      pathname: '/posts',
      query: { id }
    });
  };

  return (
    <Mutation
      mutation={CREATE_INTRO_MUTATION}
      variables={{
        introduction: inputs.introduction,
        about: inputs.challenges,
        challenges: inputs.help,
        approval: false
      }}
    >
      {(createIntro, { error, loading }) => {
        return (
          <Root>
            <h2>Community Introduction</h2>
            <Error error={error} />
            <NoteContainer>
              <p>
                Welcome to the community. Entra is a place to connect, help, and
                learn from other entrepreneurs. Now is your chance to introduce
                yourself to the community and make connections right away.
              </p>
            </NoteContainer>
            <div
              style={{
                padding: '10px, 20px, 10px, 20px',
                marginLeft: 15,
                marginRight: 15
              }}
            >
              {introFeilds.map(({ input, title, placeholder }) => (
                <FormContainer key={title}>
                  <h3>{title}</h3>
                  <DraftailEditor
                    rawContentState={null}
                    onSave={content => {
                      setInputs(inputs => ({
                        ...inputs,
                        [input]: toHTML(content)
                      }));
                    }}
                    placeholder={placeholder}
                    enableHorizontalRule={true}
                    enableLineBreak={false}
                    stripPastedStyles={false}
                    entityTypes={[
                      {
                        type: ENTITY_TYPE.LINK,
                        description: 'Link',
                        icon: [
                          'M440.236 635.766c-13.31 0-26.616-5.076-36.77-15.23-95.134-95.136-95.134-249.934 0-345.070l192-192c46.088-46.086 107.36-71.466 172.534-71.466s126.448 25.38 172.536 71.464c95.132 95.136 95.132 249.934 0 345.070l-87.766 87.766c-20.308 20.308-53.23 20.308-73.54 0-20.306-20.306-20.306-53.232 0-73.54l87.766-87.766c54.584-54.586 54.584-143.404 0-197.99-26.442-26.442-61.6-41.004-98.996-41.004s-72.552 14.562-98.996 41.006l-192 191.998c-54.586 54.586-54.586 143.406 0 197.992 20.308 20.306 20.306 53.232 0 73.54-10.15 10.152-23.462 15.23-36.768 15.23z',
                          'M256 1012c-65.176 0-126.45-25.38-172.534-71.464-95.134-95.136-95.134-249.934 0-345.070l87.764-87.764c20.308-20.306 53.234-20.306 73.54 0 20.308 20.306 20.308 53.232 0 73.54l-87.764 87.764c-54.586 54.586-54.586 143.406 0 197.992 26.44 26.44 61.598 41.002 98.994 41.002s72.552-14.562 98.998-41.006l192-191.998c54.584-54.586 54.584-143.406 0-197.992-20.308-20.308-20.306-53.232 0-73.54 20.306-20.306 53.232-20.306 73.54 0.002 95.132 95.134 95.132 249.932 0.002 345.068l-192.002 192c-46.090 46.088-107.364 71.466-172.538 71.466z'
                        ],
                        source: LinkSource,
                        decorator: Link,
                        whitelist: {
                          href: '^(?![#/])'
                        }
                      }
                    ]}
                    blockTypes={[
                      {
                        type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
                        icon:
                          'M0 0h256v256h-256zM384 64h640v128h-640zM0 384h256v256h-256zM384 448h640v128h-640zM0 768h256v256h-256zM384 832h640v128h-640z'
                      }
                    ]}
                    inlineStyles={[
                      {
                        type: INLINE_STYLE.BOLD
                      },
                      {
                        type: INLINE_STYLE.ITALIC
                      }
                    ]}
                  />
                </FormContainer>
              ))}
              <Button
                style={{ marginLeft: '10px' }}
                onClick={e => submitForm(e, createIntro)}
                variant="contained"
                disabled={loading}
              >
                Sav{loading ? 'ing' : 'e'}
              </Button>
            </div>
          </Root>
        );
      }}
    </Mutation>
  );
};
