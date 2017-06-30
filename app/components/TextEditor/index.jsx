import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  getEditorShowRich,
  getLatestMarkdown,
} from '../../state/textEditor/selectors';

import PlainEditor from './PlainEditor';
import RichEditor from './RichEditor';
import './TextEditor.scss';

const propTypes = {
  getMarkdownValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showRichEditor: PropTypes.bool.isRequired,
};

const TextEditor = ({
  id,
  getMarkdownValue,
  placeholder,
  showRichEditor,
  onBlur,
  onFocus,
  onChange,
}) => (
  <div className="Markdown TextEditor">
    {showRichEditor &&
      <RichEditor
        id={id}
        placeholder={placeholder}
        onBlur={(e) => {
          // Handle the blurring for redux-form
          onBlur(e);
          // Convert the DraftJS object to Markdown and store it in Redux-Form.
          // Since this operation is quite expensive, we don't do it on every change.
          onChange(getMarkdownValue());
        }}
        onFocus={onFocus}
      />
    }
    {!showRichEditor &&
      <PlainEditor
        id={id}
        placeholder={placeholder}
        onBlur={onBlur}
        // Update the redux form value when the input value changes
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
      />
    }
  </div>
);

TextEditor.propTypes = propTypes;
TextEditor.contextTypes = {};

const mapStateToProps = (state, ownProps) => ({
  getMarkdownValue: () => getLatestMarkdown(state, ownProps.id),
  showRichEditor: getEditorShowRich(state),
});

const ConnectedTextEditor = connect(mapStateToProps)(TextEditor);

export default ConnectedTextEditor;
