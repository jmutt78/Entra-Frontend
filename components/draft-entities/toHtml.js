import React from 'react';
import { ENTITY_TYPE, BLOCK_TYPE, INLINE_STYLE } from 'draftail';
import { convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

const exporterConfig = {
  blockToHTML: block => {
    if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
      return <blockquote />;
    }

    // Discard atomic blocks, as they get converted based on their entity.
    if (block.type === BLOCK_TYPE.ATOMIC) {
      return {
        start: '',
        end: ''
      };
    }

    return null;
  },

  entityToHTML: (entity, originalText) => {
    if (entity.type === ENTITY_TYPE.LINK) {
      return <a href={entity.data.url}>{originalText}</a>;
    }

    if (entity.type === ENTITY_TYPE.IMAGE) {
      return <img src={entity.data.src} alt={entity.data.alt} />;
    }

    if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
      return <hr />;
    }

    return originalText;
  }
};

const toHTML = raw =>
  raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : '';

export { toHTML };
