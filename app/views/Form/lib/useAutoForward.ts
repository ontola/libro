import { isNamedNode } from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import * as sh from '@ontologies/shacl';
import { LaxNode, useResourceProperty } from 'link-redux';
import React from 'react';

import useFormField, { InputValue } from '../../../hooks/useFormField';
import form from '../../../ontology/form';

const AUTO_FORWARD_TIMEOUT_MS = 1000;

export const AUTO_FORWARDED_FIELDS = [
  form.RadioGroup.value,
  form.SelectInput.value,
  form.ToggleButtonGroup.value,
  form.DateInput.value,
  form.DateTimeInput.value,
  form.FileInput,
];

const useAutoForward = (activeField: LaxNode, activateNextField: () => void): void => {
  const [autoforward, setAutoforward] = React.useState(false);
  const [type] = useResourceProperty(activeField, rdf.type);
  const [path] = useResourceProperty(activeField, sh.path).filter(isNamedNode);
  const formFieldProps = useFormField({ path });
  React.useEffect(() => {
    if (!formFieldProps.whitelisted) {
      activateNextField();
    }
  }, [formFieldProps.whitelisted]);
  React.useEffect(() => {
    if (autoforward) {
      activateNextField();
    }
  }, [autoforward]);

  const [currentField, setCurrentField] = React.useState<LaxNode>(undefined);
  const [currentValue, setCurrentValue] = React.useState<InputValue[] | undefined>(undefined);

  React.useEffect(() => {
    if (activeField !== currentField) {
      setAutoforward(false);
      setCurrentField(activeField);
    } else if (AUTO_FORWARDED_FIELDS.includes(type?.value) && formFieldProps.values !== currentValue) {
      setTimeout(() => {
        setAutoforward(true);
      }, AUTO_FORWARD_TIMEOUT_MS);
    }

    setCurrentValue(formFieldProps.values);
  }, [formFieldProps.values]);
};

export default useAutoForward;