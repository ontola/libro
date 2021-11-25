import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formMessages } from '../../translations/messages';
import Button, { ButtonTheme } from '../Button';
import { FormContext, FormTheme } from '../Form/Form';

import { FormFieldContext } from './FormField';

const FormFieldAddButton: React.FC = () => {
  const { theme } = React.useContext(FormContext);
  const {
    addFormValue,
    label,
  } = React.useContext(FormFieldContext);

  return (
    <div>
      <Button
        icon="plus"
        theme={ButtonTheme.Transparent}
        onClick={addFormValue}
      >
        {theme === FormTheme.Preview ? label : <FormattedMessage {...formMessages.newLabel} />}
      </Button>
    </div>
  );
};

export default FormFieldAddButton;
