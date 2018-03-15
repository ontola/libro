import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getEditorShowRich,
  getLatestMarkdown,
} from '../../state/textEditor/selectors';
import isMobile from '../../helpers/isMobile';

import PlainEditor from './PlainEditor';
import RichEditor from './RichEditor';
import './TextEditor.scss';

const propTypes = {
  disableRich: PropTypes.bool,
  getMarkdownValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  // Handle the blurring for redux-form
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showRichEditor: PropTypes.bool.isRequired,
};

const defaultProps = {
  disableRich: false,
};

const UPDATE_DELAY = 300;

/**
 * Text editor component that outputs markdown. On compatible devices (currently
 * all non mobile devices), a rich text editor is shown. If the rich text editor is used,
 * the output value is not updated on every change, but after 300ms after editing the text
 * to improve performance.
 */
class TextEditor extends Component {
  startTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.props.onChange(this.props.getMarkdownValue()),
      UPDATE_DELAY
    );
  }

  render() {
    const {
      id,
      getMarkdownValue,
      placeholder,
      showRichEditor,
      onBlur,
      onFocus,
      onChange,
    } = this.props;

    let { disableRich } = this.props;

    // Disable the rich editor for all mobile devices. Draft still causes bugs.
    if (isMobile) {
      disableRich = true;
    }

    return (
      <div className="Markdown TextEditor">
        {(showRichEditor && !disableRich) &&
          <RichEditor
            id={id}
            placeholder={placeholder}
            onBlur={(e) => {
              onBlur(e);
              // Convert the DraftJS object to Markdown and store it in Redux-Form.
              onChange(getMarkdownValue());
            }}
            onChange={() => this.startTimer()}
            onFocus={onFocus}
          />
        }
        {(!showRichEditor || disableRich) &&
          <PlainEditor
            disableRich={disableRich}
            id={id}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
          />
        }
      </div>
    );
  }
}

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;
TextEditor.contextTypes = {};

const mapStateToProps = (state, ownProps) => ({
  getMarkdownValue: () => getLatestMarkdown(state, ownProps.id),
  showRichEditor: getEditorShowRich(state),
});

const ConnectedTextEditor = connect(mapStateToProps)(TextEditor);

export default ConnectedTextEditor;
