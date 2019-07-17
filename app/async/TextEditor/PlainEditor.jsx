import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-autosize-textarea';

import {
  getEditorShowPreview,
  getMarkdownTextPlain,
} from '../../state/textEditor/selectors';
import {
  doShowPreview,
  hidePreview,
  updateMarkdown,
} from '../../state/textEditor/actions';
import Button from '../../components/Button';
import { CardDivider } from '../../topologies/Card';
import Markdown from '../../components/Markdown';

import ToggleButton from './ToggleButton';
import MarkdownInstructions from './MarkdownInstructions';

const propTypes = {
  autoFocus: PropTypes.bool,
  disableRich: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  mdText: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onHidePreview: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  onPlainChange: PropTypes.func.isRequired,
  onShowPreview: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showPreview: PropTypes.bool.isRequired,
};

const defaultProps = {
  autoFocus: false,
};

/* eslint react/prop-types: 0 */
const PreviewButton = ({ show, onClick }) => (
  <Button
    small
    icon={show ? 'caret-down' : 'caret-right'}
    theme="transparant"
    onClick={onClick}
  >
    Voorbeeldweergave
  </Button>
);

const PlainEditor = ({
  autoFocus,
  disableRich,
  id,
  maxLength,
  mdText,
  minLength,
  onChange,
  onBlur,
  onFocus,
  onHidePreview,
  onKeyUp,
  onPlainChange,
  onShowPreview,
  placeholder,
  showPreview,
}) => (
  <div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Textarea
        autoFocus={autoFocus}
        className="Field__input"
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        value={mdText}
        onBlur={onBlur}
        onChange={
          (...args) => {
            onPlainChange(...args);
            onChange(...args);
          }
        }
        onFocus={onFocus}
        onKeyUp={onKeyUp}
      />
      <div style={{ display: 'flex' }}>
        {!disableRich && <ToggleButton id={id} />}
        <PreviewButton
          show={showPreview}
          onClick={showPreview ? onHidePreview : onShowPreview}
        />
        <MarkdownInstructions />
      </div>
    </div>
    {showPreview && (
    <div>
      <CardDivider />
      <div className="MarkdownPreview">
        <Markdown text={mdText} />
      </div>
      <CardDivider />
    </div>
    )}
  </div>
);

PlainEditor.propTypes = propTypes;
PlainEditor.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
  mdText: getMarkdownTextPlain(state, props.id),
  showPreview: getEditorShowPreview(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onHidePreview: () => dispatch(hidePreview()),
  onPlainChange: event => dispatch(updateMarkdown(props.id, event.target.value)),
  onShowPreview: () => dispatch(doShowPreview()),
});

const ConnectedPlainEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlainEditor);

export default ConnectedPlainEditor;
