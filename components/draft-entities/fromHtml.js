import React from 'react';
import { ENTITY_TYPE, BLOCK_TYPE, INLINE_STYLE } from 'draftail';
import { convertToRaw } from 'draft-js';
import { convertFromHTML } from 'draft-convert';

const importerConfig = {
  htmlToEntity: (nodeName, node, createEntity) => {
    // a tags will become LINK entities, marked as mutable, with only the URL as data.
    if (nodeName === 'a') {
      return createEntity(ENTITY_TYPE.LINK, 'MUTABLE', { url: node.href });
    }

    if (nodeName === 'img') {
      return createEntity(ENTITY_TYPE.IMAGE, 'IMMUTABLE', {
        src: node.src
      });
    }

    if (nodeName === 'hr') {
      return createEntity(ENTITY_TYPE.HORIZONTAL_RULE, 'IMMUTABLE', {});
    }

    return null;
  },
  htmlToBlock: nodeName => {
    if (nodeName === 'hr' || nodeName === 'img') {
      // "atomic" blocks is how Draft.js structures block-level entities.
      return 'atomic';
    }

    return null;
  }
};

const fromHTML = html => convertToRaw(convertFromHTML(importerConfig)(html));

export { fromHTML };
