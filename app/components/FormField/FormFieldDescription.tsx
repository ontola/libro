import React from 'react';

import Markdown from '../Markdown';

import { FormFieldContext } from './FormField';

const FormFieldDescription: React.FC = () => {
  const { description } = React.useContext(FormFieldContext);

  if (!description) {
    return null;
  }

  return (
    <div className="Field__description">
      <Markdown
        noSpacing
        text={description}
      />
    </div>
  );
};

export default FormFieldDescription;
