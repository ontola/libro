import React from 'react';

import Markdown from '../Markdown';

interface PropTypes {
  description?: string;
  helperText?: string;
  preferPlaceholder?: boolean;
}

const FormFieldDescription: React.FC<PropTypes> = ({
  description,
  helperText,
  preferPlaceholder,
}) => {
  let text;

  if (preferPlaceholder) {
    text = helperText;
  } else {
    text = description || helperText;
  }

  return (
    <div className="Field__description">{text && <Markdown noSpacing text={text} />}</div>
  );
};

export default FormFieldDescription;
