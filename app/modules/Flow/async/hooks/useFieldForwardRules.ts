import useMediaQuery from '@mui/material/useMediaQuery';
import { Node } from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import { LaxIdentifier, useIds } from 'link-redux';
import React from 'react';

import form from '../../../../ontology/form';

interface FieldForwardRules {
  isAutoForwardField: boolean;
  isForwardedByEnter: boolean;
}

const AUTO_FORWARDED_FIELDS: string[] = [
  form.RadioGroup.value,
  form.SelectInput.value,
  form.ToggleButtonGroup.value,
  form.FileInput.value,
  form.LocationInput.value,
  form.SwipeInput.value,
];

const MOBILE_ONLY_AUTO_FORWARDED_FIELDS: string[] = [
  form.DateInput.value,
  form.DateTimeInput.value,
];

const MANUALLY_FORWARDED_FIELDS: string[] = [
  form.TextAreaInput.value,
  form.MarkdownInput.value,
];

const testIfAutoForwardField = (type: Node, isTouchscreen: boolean) => {
  const forwardFields = [
    ...AUTO_FORWARDED_FIELDS,
    ...(isTouchscreen ? MOBILE_ONLY_AUTO_FORWARDED_FIELDS : []),
  ];

  return forwardFields.includes(type?.value);
};

const testIfForwardedByEnter = (type: Node, isTouchscreen: boolean) => {
  if (isTouchscreen) {
    return false;
  }

  return !testIfAutoForwardField(type, isTouchscreen) && !MANUALLY_FORWARDED_FIELDS.includes(type?.value);
};

export const useFieldForwardRules = (activeField: LaxIdentifier): FieldForwardRules => {
  const isTouchscreen = useMediaQuery('(pointer: coarse)');
  const [type] = useIds(activeField, rdf.type);

  const [isAutoForwardField, setIsAutoForwardField] = React.useState(false);
  const [isForwardedByEnter, setIsForwardedByEnter] = React.useState(true);

  React.useEffect(() => {
    setIsAutoForwardField(testIfAutoForwardField(type, isTouchscreen));
    setIsForwardedByEnter(testIfForwardedByEnter(type, isTouchscreen));
  }, [type, isTouchscreen]);

  return {
    isAutoForwardField,
    isForwardedByEnter,
  };
};
