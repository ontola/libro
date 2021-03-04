import { MegadraftEditor } from 'megadraft';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { createDraftFromMarkdown } from '../../helpers/markdownHelper';
import { updateDraft } from '../../state/textEditor/actions';
import {
  getDraftState,
  getEditorShowPreview,
  getEditorShowRich,
} from '../../state/textEditor/selectors';

import './Megadraft.scss';
import ToggleButton from './ToggleButton';

const propTypes = {
  editorState: PropTypes.shape({
    getCurrentContent: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  onSaveEditorState: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
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

// Removes the sidebar. All necessary functionality is available through selecting text.
const mySideBar = () => null;

const style = { display: 'flex' };

class RichEditor extends PureComponent {
  public componentDidMount() {
    (this.props as any).onSaveEditorState(
      createDraftFromMarkdown((this.props as any).value as string),
    );
  }

  public render() {
    const {
      editorState,
      id,
      onBlur,
      onChange,
      onFocus,
      onKeyUp,
      onSaveEditorState,
      placeholder,
      value,
    } = this.props as any;

    return (
      <React.Fragment>
        <div className="Field__input Markdown">
          <MegadraftEditor
            customStyleMap={styleMap}
            editorState={editorState}
            id={id}
            placeholder={placeholder}
            sidebarRendererFn={mySideBar}
            softNewLines={false}
            value={value}
            onBlur={onBlur}
            onChange={(e: any) => {
              onSaveEditorState(e);
              onChange(e);
            }}
            onEscape={onKeyUp}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
          />
        </div>
        <div style={style}>
          <ToggleButton id={id} />
        </div>
      </React.Fragment>
    );
  }
}

(RichEditor as any).propTypes = propTypes;

const mapStateToProps = (state: any, props: any) => ({
  editorState: getDraftState(state, props.id),
  showPreview: getEditorShowPreview(state),
  showRichEditor: getEditorShowRich(state),
});

const mapDispatchToProps = (dispatch: any, props: any) => ({
  onSaveEditorState: (editorState: any) => dispatch(updateDraft(props.id, editorState)),
});

const ConnectedRichEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RichEditor);

export default ConnectedRichEditor;
