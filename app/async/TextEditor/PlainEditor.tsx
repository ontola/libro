import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import Button from '../../components/Button';
import CardDivider from '../../components/Card/CardDivider';
import Markdown from '../../components/Markdown';

import MarkdownInstructions from './MarkdownInstructions';
import ToggleButton from './ToggleButton';

const propTypes = {
  autoFocus: PropTypes.bool,
  disableRich: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
};

const defaultProps = {
  autoFocus: false,
};

/* eslint react/prop-types: 0 */
const PreviewButton = ({ show, onClick }: { show: any, onClick: (e: any) => any }) => (
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
}: any) => {
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
