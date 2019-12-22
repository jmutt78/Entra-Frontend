import React, { useState } from 'react';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreateIcon from '@material-ui/icons/Create';

import NavMenu from './NavMenu';
import Search from '../search/QuestionSearch';
import {
  navLinks,
  questionLinks,
  ideaLinks,
  adminLinks,
  createLinks,
  blogLinks
} from './NavLinksData';

export default ({ menu, curretPage, me }) => {
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
    <div className="navbarFlex">
      <div
        className={`navigationContainer ${menu === true && 'menuShown'}`}
        component={'div'}
      >
        <NavMenu
          me={me}
          navLinks={feedLink()}
          curretPage={curretPage}
          name={`Q&A`}
          icon={<QuestionAnswerIcon fontSize="small" />}
        />
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
        <Search />
      </div>
    </div>
  );
};
