import PropTypes from 'prop-types';
import React from 'react';

import Markdown from '../Markdown';

const FormFieldDescription = ({
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
    <div className="Field__description"><Markdown text={text} /></div>
  );
};

FormFieldDescription.propTypes = {
  description: PropTypes.string,
  helperText: PropTypes.string,
  preferPlaceholder: PropTypes.bool,
};

export default FormFieldDescription;
