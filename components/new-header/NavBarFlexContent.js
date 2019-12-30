import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreateIcon from '@material-ui/icons/Create';

import NavMenu from './NavMenu';
import Search from '../search/QuestionSearch';
import {
  questionLinks,
  ideaLinks,
  adminLinks,
  createLinks,
  blogLinks
} from './NavLinksData';

const useStyles = makeStyles({
  root: ({ mobile }) => ({
    alignItems: mobile ? 'flex-start' : 'center',
    flexDirection: mobile ? 'column' : 'row',
    display: 'flex',
    flex: 1,
    height: mobile ? '100% ' : '80px',
    padding: mobile ? '0 0 35px 20px' : '0 10px'
  })
});

export default ({ curretPage, me, mobile }) => {
  const { root } = useStyles({ mobile });
  const tagExist = me ? me.tags.some(tags => ![' '].includes(tags)) : '';

  const feedLink = () => {
    if (!me) {
      return questionLinks.filter(link => link.name === 'Latest Questions');
    } else if (!tagExist) {
      return questionLinks.filter(link => link.name !== 'My Feed');
    }
    return questionLinks;
  };

  const ideaLinkCondition = () => {
    if (!me) {
      return ideaLinks.filter(link => link.name !== 'My Ideas');
    }
    return ideaLinks;
  };

  return (
    <div className={root}>
      <div style={{ marginBottom: '-3px' }}>
        <NavMenu
          me={me}
          navLinks={feedLink()}
          curretPage={curretPage}
          name={`Q&A`}
          icon={
            <div style={{ marginTop: 3 }}>
              <QuestionAnswerIcon fontSize="small" />
            </div>
          }
        />
      </div>
      <NavMenu
        me={me}
        navLinks={ideaLinkCondition()}
        curretPage={curretPage}
        name={`Ideas`}
        icon={<EmojiObjectsIcon fontSize="small" />}
      />

      <NavMenu
        me={me}
        navLinks={blogLinks}
        curretPage={curretPage}
        name={`Learn`}
        icon={<MenuBookIcon fontSize="small" />}
      />
      <NavMenu
        me={me}
        navLinks={createLinks()}
        curretPage={curretPage}
        name={`Create`}
        icon={<CreateIcon fontSize="small" />}
      />
      {me &&
        me.permissions.some(permission =>
          ['ADMIN', 'MODERATOR'].includes(permission)
        ) && (
          <NavMenu
            me={me}
            navLinks={adminLinks}
            curretPage={curretPage}
            name={`Admin`}
          />
        )}
      <div style={{ marginTop: '-6px' }}>
        <Search />
      </div>
    </div>
  );
};