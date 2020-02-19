import { Modifier, EditorState } from 'draft-js';
import PropTypes from 'prop-types';

const createEntity = props => {
  console.log(props.editorState);
  // const contentState = editorState.getCurrentContent();
  // const selection = editorState.getSelection();
  // const contentStateWithEntity = contentState.createEntity(
  //   entityType,
  //   entityMutability,
  //   entityData
  // );
  // const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  //
  // let nextContentState;
  //
  // if (selection.isCollapsed()) {
  //   nextContentState = Modifier.insertText(
  //     contentState,
  //     selection,
  //     entityText,
  //     null,
  //     entityKey
  //   );
  // } else {
  //   nextContentState = Modifier.replaceText(
  //     contentState,
  //     selection,
  //     entityText,
  //     null,
  //     entityKey
  //   );
  // }
  //
  // const nextState = EditorState.push(
  //   editorState,
  //   nextContentState,
  //   'insert-fragment'
  // );

  return 'ps';
};

createEntity.propTypes = {
  editorState: PropTypes.object.isRequired,
  entityType: PropTypes.object.isRequired,
  entity: PropTypes.object,
  onComplete: PropTypes.func.isRequired
};

export default createEntity;

// editorState,
// entityType,
// entityData,
// entityText,
// entityMutability
