import { Portal } from '@material-ui/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  dig,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formMessages } from '../../translations/messages';
import { useFormGroup } from '../../views/FormGroup/FormGroupProvider';
import Button, { ButtonVariant } from '../Button';

import { formFieldContext } from './FormFieldContext';

const FormFieldAddButton: React.FC = () => {
  const { buttonContainerRef } = useFormGroup();
  const {
    addFormValue,
    field,
    values,
  } = React.useContext(formFieldContext);
  const [label] = useStrings(field, schema.name);
  const [image] = useGlobalIds(field, dig(sh.targetClass, schema.image));

  if (buttonContainerRef?.current && values.length === 0) {
    return (
      <Portal container={buttonContainerRef.current}>
        <Button
          icon={image?.value ?? 'plus'}
          variant={ButtonVariant.Transparent}
          onClick={addFormValue}
        >
          {label}
        </Button>
      </Portal>
    );
  }

  return (
    <div>
      <Button
        icon={image?.value || 'plus'}
        variant={ButtonVariant.Transparent}
        onClick={addFormValue}
      >
        <FormattedMessage {...formMessages.newLabel} />
      </Button>
    </div>
  );
};

export default FormFieldAddButton;
