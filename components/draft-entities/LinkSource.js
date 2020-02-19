import PropTypes from 'prop-types';
import React from 'react';
import { RichUtils } from 'draft-js';

class LinkSource extends React.Component {
  componentDidMount() {
    const { editorState, entity, entityType, onComplete } = this.props;
    const url = window.prompt('Link URL', entity ? entity.getData().url : '');
    let nextState = editorState;

    if (url) {
      const selection = editorState.getSelection();
      const entityData = {
        url
      };

      const hasText = !selection.isCollapsed();

      if (hasText) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          entityType.type,
          'IMMUTABLE',
          entityData
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        nextState = RichUtils.toggleLink(editorState, selection, entityKey);
      }
    }

    onComplete(nextState);
  }

  render() {
    return null;
  }
}

LinkSource.propTypes = {
  editorState: PropTypes.object.isRequired,
  entityType: PropTypes.object.isRequired,
  entity: PropTypes.object,
  onComplete: PropTypes.func.isRequired
};

LinkSource.defaultProps = {
  entity: null
};

export default LinkSource;
