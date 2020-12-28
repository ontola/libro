import React from 'react';

import Markdown from '../Markdown';

interface PropTypes {
  description: string;
  helperText: string;
  preferPlaceholder: boolean;
}

const FormFieldDescription = ({
  description,
  helperText,
  preferPlaceholder,
}: PropTypes) => {
  let text;
  if (preferPlaceholder) {
    text = helperText;
  } else {
    text = description || helperText;
  }

  return (
    <div className="Field__description"><Markdown text={text} /></div>
  );
};

export default FormFieldDescription;
