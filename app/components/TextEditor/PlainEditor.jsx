import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

import {
  Button,
  CardDivider,
  Markdown,
} from '../../components';
import {
  getEditorShowPreview,
  getMarkdownTextPlain,
} from '../../state/textEditor/selectors';
import {
  hidePreview,
  doShowPreview,
  updateMarkdown,
} from '../../state/textEditor/actions';

import ToggleButton from './ToggleButton';

const propTypes = {
  id: PropTypes.string.isRequired,
  mdText: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onHidePreview: PropTypes.func.isRequired,
  onPlainChange: PropTypes.func.isRequired,
  onShowPreview: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showPreview: PropTypes.bool.isRequired,
};

const defaultProps = {
  id: 'defaultId',
  showRichEditor: true,
};

/* eslint react/prop-types: 0 */
const ShowPreview = ({ onClick }) => (
  <Button
    small
    icon="caret-right"
    theme="transparant"
    onClick={onClick}
  >
    Voorbeeldweergave
  </Button>
);

const HidePreview = ({ onClick }) => (
  <Button
    small
    icon="caret-down"
    theme="transparant"
    onClick={onClick}
  >
    Voorbeeldweergave
  </Button>
);

const PlainEditor = ({
  id,
  mdText,
  onChange,
  onBlur,
  onFocus,
  onHidePreview,
  onPlainChange,
  onShowPreview,
  placeholder,
  showPreview,
}) => (
  <div>
    <div>
      <Textarea
        className="Field__input"
        id={id}
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
      />
      <ToggleButton id={id} />
    </div>
    {showPreview &&
      <div>
        <HidePreview onClick={onHidePreview} />
        <CardDivider />
        <div className="MarkdownPreview">
          <Markdown text={mdText} />
        </div>
        <CardDivider />
      </div>
    }
    {!showPreview && (mdText !== '') &&
      <ShowPreview onClick={onShowPreview} />
    }
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
