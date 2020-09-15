import PropTypes from 'prop-types';
import React from 'react';

import RichTextEditorMd from './components/RichTextEditorMd';
import { defaultPlugins } from './plugins';
import './RichTextEditor.scss';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

/**
 * Text editor component that outputs markdown. On compatible devices (currently
 * all non mobile devices), a rich text editor is shown. If the rich text editor is used,
 * the output value is not updated on every change, but after 300ms after editing the text
 * to improve performance.
 */
interface RichTextEditorProps {
  onChange: (markdown: string) => {};
  placeholder: string;
  value: string;
}

const RichTextEditor = ({
  placeholder,
  value,
  onChange,
}: RichTextEditorProps) => (
  <div className="RichTextEditor">
    <RichTextEditorMd
      placeholder={placeholder}
      plugins={defaultPlugins}
      style={{
        padding: '8px 11px',
      }}
      value={value}
      onAutoSave={(_, markdown) => onChange(markdown)}
    />
  </div>
);

RichTextEditor.propTypes = propTypes;

export default RichTextEditor;
