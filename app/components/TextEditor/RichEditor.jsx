import { MegadraftEditor } from 'megadraft';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  getEditorShowRich,
  getEditorShowPreview,
  getDraftState,
} from '../../state/textEditor/selectors';
import { updateDraft } from '../../state/textEditor/actions';

import ToggleButton from './ToggleButton';
import './Megadraft.scss';

const propTypes = {
  editorState: PropTypes.shape({
    getCurrentContent: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSaveEditorState: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

// Same as Markdown.scss -> code
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    border: 'solid 1px #e6e6e6',
    fontFamily: 'monospace',
    padding: '.2em .3em',
  },
};

// Removes the sidebar. All neccesary functionality is available through selecting text.
const mySideBar = () => null;

const RichEditor = ({
  editorState,
  id,
  onBlur,
  onChange,
  onFocus,
  onSaveEditorState,
  placeholder,
}) => (
  <div>
    <div className="Field__input">
      <MegadraftEditor
        customStyleMap={styleMap}
        editorState={editorState}
        id={id}
        placeholder={placeholder}
        sidebarRendererFn={mySideBar}
        onBlur={onBlur}
        onChange={(e) => {
          onSaveEditorState(e);
          onChange(e);
        }}
        onFocus={onFocus}
      />
    </div>
    <div style={{ display: 'flex' }}>
      <ToggleButton id={id} />
    </div>
  </div>
);

RichEditor.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  editorState: getDraftState(state, props.id),
  showPreview: getEditorShowPreview(state),
  showRichEditor: getEditorShowRich(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onSaveEditorState: editorState => dispatch(updateDraft(props.id, editorState)),
});

const ConnectedRichEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(RichEditor);

export default ConnectedRichEditor;
