import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import { LaxIdentifier, useIds } from 'link-redux';
import React from 'react';

import form from '../../../../ontology/form';
import { LibroTheme } from '../../../../themes/themes';

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

const testIfAutoForwardField = (type: Node, isMobile: boolean) => {
  const forwardFields = [
    ...AUTO_FORWARDED_FIELDS,
    ...(isMobile ? MOBILE_ONLY_AUTO_FORWARDED_FIELDS : []),
  ];

  return forwardFields.includes(type?.value);
};

const testIfForwardedByEnter = (type: Node, isMobile: boolean) => {
  if (isMobile) {
    return false;
  }

  return !testIfAutoForwardField(type, isMobile) && !MANUALLY_FORWARDED_FIELDS.includes(type?.value);
};

export const useFieldForwardRulesImpl = (activeField: LaxIdentifier, isMobile: boolean): FieldForwardRules => {

  const [type] = useIds(activeField, rdf.type);

  const [isAutoForwardField, setIsAutoForwardField] = React.useState(false);
  const [isForwardedByEnter, setIsForwardedByEnter] = React.useState(true);

  React.useEffect(() => {
    setIsAutoForwardField(testIfAutoForwardField(type, isMobile));
    setIsForwardedByEnter(testIfForwardedByEnter(type, isMobile));
  }, [type, isMobile]);

  return {
    isAutoForwardField,
    isForwardedByEnter,
  };
};

export const useFieldForwardRules = (activeField: LaxIdentifier): FieldForwardRules => {
  const theme = useTheme<LibroTheme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return useFieldForwardRulesImpl(activeField, isMobile);
};
