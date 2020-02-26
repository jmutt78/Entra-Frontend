import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  DraftailEditor,
  ENTITY_TYPE,
  BLOCK_TYPE,
  INLINE_STYLE
} from 'draftail';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import LinkSource from '../draft-entities/LinkSource';
import Link from '../draft-entities/Links';
import { INTRO_QUERY } from './index';
import { CURRENT_USER_QUERY } from '../auth/User';
import { fromHTML } from '../draft-entities/fromHtml';
import { toHTML } from '../draft-entities/toHTML';
import Error from './../ErrorMessage';

export const UPDATE_INTRO_MUTATION = gql`
  mutation updateIntro(
    $id: ID!
    $introduction: String
    $about: String
    $challenges: String
    $approval: Boolean
  ) {
    updateIntro(
      id: $id
      introduction: $introduction
      about: $about
      challenges: $challenges
      approval: $approval
    ) {
      id
    }
  }
`;

export default function Content({
  introContent: { content, title, label },
  id,
  loading,
  ownsComment,
  hasPermissions,
  dateChecker,
  canUpdate
}) {
  const [body, setBody] = React.useState();
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(true);
  };

  const updateI = async (e, updateIntroComment) => {
    e.preventDefault();
    const res = await updateIntroComment({
      variables: {
        id: id,
        approval: false,
        [label]: body
      }
    });

    console.log('Updated!!');
    setEditing();
  };

  const onSave = content => {
    setBody(toHTML(content));
  };

  return (
    <Mutation
      mutation={UPDATE_INTRO_MUTATION}
      refetchQueries={[
        {
          query: INTRO_QUERY,
          variables: { id }
        },
        { query: CURRENT_USER_QUERY }
      ]}
    >
      {(updateIntro, { error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <div>
            <h3>{title} </h3>
            {!editing && (
              <div>
                <p dangerouslySetInnerHTML={{ __html: content }} />
                {canUpdate && (
                  <Button
                    color={'primary'}
                    disabled={loading}
                    size="small"
                    onClick={handleClick}
                    style={{
                      marginLeft: 0
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            )}
            {editing && (
              <div>
                <DraftailEditor
                  rawContentState={fromHTML(content)}
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
                  size="small"
                  disabled={loading}
                  onClick={e => updateI(e, updateIntro)}
                >
                  Sav{loading ? 'ing' : 'e'} Changes
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </Mutation>
  );
}
