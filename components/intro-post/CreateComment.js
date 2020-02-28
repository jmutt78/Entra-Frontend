import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {
  DraftailEditor,
  ENTITY_TYPE,
  BLOCK_TYPE,
  INLINE_STYLE
} from 'draftail';

import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import LinkSource from '../draft-entities/LinkSource';
import Link from '../draft-entities/Links';
import { toHTML } from '../draft-entities/toHTML';
import { Mixpanel } from '../../utils/Mixpanel';
import Error from './../ErrorMessage.js';
import { INTRO_QUERY } from './index';
import { CURRENT_USER_QUERY } from '../auth/User';

export const CREATE_COMMENT = gql`
  mutation createIntroComment(
    $introId: ID!
    $body: String!
    $approval: Boolean
  ) {
    createIntroComment(introId: $introId, body: $body, approval: $approval) {
      id
      body
    }
  }
`;

export const FormContainer = styled.div`
  padding: 10px 10px 1.5rem 10px;

  @media screen and (min-width: 768px) {
    margin-top: -2rem;
    padding-left: 10px;
    padding-top: 50px;
    max-width: 850px;
    margin-left: auto;
    margin-right: auto;
  }
  .Draftail-Toolbar {
    min-height: 48px;
  }
  .Draftail-block--header-one:first-child {
    padding-top: 1.45rem;
  }
`;

const Editor = ({ id, me, intro, introId }) => {
  const [body, setBody] = React.useState();
  const myComments = me && me.myComments;

  const onSave = content => {
    setBody(toHTML(content));
  };

  const submitForm = async (e, createIntroComment) => {
    e.preventDefault();

    const res = await createIntroComment({
      variables: {
        introId: id,
        body,
        approval: false
      }
    });
    Mixpanel.track('Comment Created');
  };

  const comentCheck = () => {
    const arr = [];
    for (var i = 0; i < myComments.length; i++) {
      const comments = [myComments[i].commentTo[0]];
      arr.push(comments);
    }
    const num = arr.some(element => element[0].id === id);

    return num;
  };

  return (
    <Mutation
      mutation={CREATE_COMMENT}
      variables={{
        body
      }}
      refetchQueries={[
        {
          query: INTRO_QUERY,
          variables: { id: introId }
        },
        { query: CURRENT_USER_QUERY }
      ]}
    >
      {(createIntroComment, { error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        if (!me) {
          return <div />;
        }
        return (
          <FormContainer>
            {comentCheck() === true ? null : (
              <div>
                <DraftailEditor
                  rawContentState={null}
                  onSave={onSave}
                  placeholder="Write here…"
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
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={e => submitForm(e, createIntroComment)}
                  variant="contained"
                  disabled={loading}
                >
                  Sav{loading ? 'ing' : 'e'} Changes
                </Button>
              </div>
            )}
          </FormContainer>
        );
      }}
    </Mutation>
  );
};

export default Editor;