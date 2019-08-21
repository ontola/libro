import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import withReducer from '../../containers/withReducer';
import isMobile from '../../helpers/isMobile';
import reducer from '../../state/textEditor/reducer';
import {
  getEditorShowRich,
  getLatestMarkdown,
} from '../../state/textEditor/selectors';

import PlainEditor from './PlainEditor';
import RichEditor from './RichEditor';
import './TextEditor.scss';

const propTypes = {
  autoFocus: PropTypes.bool,
  disableRich: PropTypes.bool,
  getMarkdownValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
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
  constructor(props) {
    super(props);

    this.debounce = this.debounce.bind(this);
  }

  debounce() {
    clearTimeout(this.timer);
    if (!this) {
      throw new Error('No object defined');
    }
    this.timer = setTimeout(
      () => this.props.onChange({ target: { value: this.props.getMarkdownValue() } }),
      UPDATE_DELAY
    );
  }

  render() {
    const {
      autoFocus,
      id,
      getMarkdownValue,
      maxLength,
      minLength,
      placeholder,
      rows,
      showRichEditor,
      onBlur,
      onFocus,
      onChange,
      onKeyUp,
    } = this.props;

    let { disableRich } = this.props;

    // Disable the rich editor for all mobile devices. Draft still causes bugs.
    if (isMobile) {
      disableRich = true;
    }

    return (
      <div className="TextEditor">
        {(showRichEditor && !disableRich) && (
        <RichEditor
          autoFocus={autoFocus}
          id={id}
          placeholder={placeholder}
          onBlur={(e) => {
            onBlur(e);
            // Convert the DraftJS object to Markdown and pass it through.
            onChange({ target: { value: getMarkdownValue() } });
          }}
          onChange={this.debounce}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
        />
        )}
        {(!showRichEditor || disableRich) && (
        <PlainEditor
          autoFocus={autoFocus}
          disableRich={disableRich}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          rows={rows}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
        />
        )}
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

export default withReducer('textEditor', reducer)(ConnectedTextEditor);
