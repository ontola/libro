import { Portal } from '@mui/material';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  dig,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import Button, { ButtonVariant } from '../../../Common/components/Button';
import { isMarkedForRemove } from '../../lib/helpers';
import { useFormGroup } from '../../views/FormGroup/FormGroupProvider';

import { formFieldContext } from './FormFieldContext';

const FormFieldAddButton: React.FC = () => {
  const { buttonContainerRef } = useFormGroup();
  const {
    addFormValue,
    field,
    fieldShape,
    values,
  } = React.useContext(formFieldContext);
  const { maxCount } = fieldShape;
  const showAddButton = !maxCount || values.filter((val) => !isMarkedForRemove(val)).length < (maxCount || 0);

  const [label] = useStrings(field, schema.name);
  const [image] = useGlobalIds(field, dig(sh.targetClass, schema.image));

  if (!showAddButton) {
    return null;
  }

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
        {label}
      </Button>
    </div>
  );
};

export default FormFieldAddButton;
