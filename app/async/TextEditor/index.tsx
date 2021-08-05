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

interface PropTypes {
  autoFocus: boolean;
  disableRich: boolean;
  getMarkdownValue: () => any;
  maxLength: number;
  minLength: number;
  name: string;
  onBlur: (args: any) => any;
  onChange: (args: any) => void;
  onFocus: (args: any) => any;
  placeholder: string;
  rows: number;
  showRichEditor: boolean;
  value: string;
}

const defaultProps = {
  disableRich: true,
};

const UPDATE_DELAY = 300;

/**
 * Text editor component that outputs markdown. On compatible devices (currently
 * all non mobile devices), a rich text editor is shown. If the rich text editor is used,
 * the output value is not updated on every change, but after 300ms after editing the text
 * to improve performance.
 */
class TextEditor extends Component<PropTypes> {
  public static defaultProps = defaultProps;

  constructor(props: PropTypes) {
    super(props);

    this.debounce = this.debounce.bind(this);
  }

  public timer = undefined as any;

  public debounce() {
    clearTimeout(this.timer);

    if (!this) {
      throw new Error('No object defined');
    }

    this.timer = setTimeout(
      () => this.props.onChange({ target: { value: this.props.getMarkdownValue() } }),
      UPDATE_DELAY,
    );
  }

  public render() {
    const {
      autoFocus,
      getMarkdownValue,
      maxLength,
      minLength,
      name,
      placeholder,
      rows,
      showRichEditor,
      value,
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
      <div className="TextEditor">
        {(showRichEditor && !disableRich) && (
          <RichEditor
            autoFocus={autoFocus}
            id={name}
            placeholder={placeholder}
            value={value}
            onBlur={(e: any) => {
              onBlur(e);
              // Convert the DraftJS object to Markdown and pass it through.
              onChange({ target: { value: getMarkdownValue() } });
            }}
            onChange={this.debounce}
            onFocus={onFocus}
          />
        )}
        {(!showRichEditor || disableRich) && (
          <PlainEditor
            autoFocus={autoFocus}
            disableRich={disableRich}
            id={name}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  getMarkdownValue: () => getLatestMarkdown(state, ownProps.id),
  showRichEditor: getEditorShowRich(state),
});

const ConnectedTextEditor = connect(mapStateToProps)(TextEditor);

export default withReducer('textEditor', reducer)(ConnectedTextEditor);
