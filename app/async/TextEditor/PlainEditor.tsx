import React, {
  EventHandler,
  FC,
  MouseEventHandler, 
} from 'react';
import Textarea from 'react-autosize-textarea';

import Button, { ButtonTheme } from '../../components/Button';
import CardDivider from '../../components/Card/CardDivider';
import { FormContext } from '../../components/Form/Form';
import Markdown from '../../components/Markdown';

import MarkdownInstructions from './MarkdownInstructions';
import ToggleButton from './ToggleButton';

const defaultProps = {
  autoFocus: false,
};

interface PreviewButtonProps {
  show: any;
  onClick: MouseEventHandler;
}

/* eslint react/prop-types: 0 */
const PreviewButton: React.FC<PreviewButtonProps> = ({ show, onClick }) => (
  <Button
    small
    icon={show ? 'caret-down' : 'caret-right'}
    theme={ButtonTheme.Transparant}
    onClick={onClick}
  >
    Voorbeeldweergave
  </Button>
);

export interface PlainEditorProps {
  autoFocus?: boolean;
  disableRich: boolean;
  id: string;
  maxLength?: number;
  minLength?: number;
  onBlur: EventHandler<any>;
  onChange?: EventHandler<any>;
  onFocus: EventHandler<any>;
  placeholder?: string;
  rows?: number;
  value: string;
}

const PlainEditor: FC<PlainEditorProps> = ({
  autoFocus,
  disableRich,
  id,
  maxLength,
  minLength,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  rows,
  value,
}) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const { onKeyUp } = React.useContext(FormContext);

  return (
    <div>
      <div
        style={{
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

PlainEditor.defaultProps = defaultProps;

export default PlainEditor;
