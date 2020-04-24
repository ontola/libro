import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';

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
  minLength: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
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
  minLength,
  onChange,
  onBlur,
  onFocus,
  onKeyUp,
  placeholder,
  rows,
  value,
}) => {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Textarea
          autoFocus={autoFocus}
          className="Field__input"
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
        />
        <div style={{ display: 'flex' }}>
          {!disableRich && <ToggleButton id={id} />}
          <PreviewButton
            show={showPreview}
            onClick={() => setShowPreview(!showPreview)}
          />
          <MarkdownInstructions />
        </div>
      </div>
      {showPreview && (
        <div>
          <CardDivider />
          <div className="MarkdownPreview">
            <Markdown text={value} />
          </div>
          <CardDivider />
        </div>
      )}
    </div>
  );
};

PlainEditor.propTypes = propTypes;
PlainEditor.defaultProps = defaultProps;

export default PlainEditor;
