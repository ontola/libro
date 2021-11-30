import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

const AUTO_FORWARDED_FIELDS = [
  form.RadioGroup.value,
  form.SelectInput.value,
  form.ToggleButtonGroup.value,
  form.FileInput,
  form.LocationInput,
];

const MOBILE_ONLY_AUTO_FORWARDED_FIELDS = [
  form.DateInput.value,
  form.DateTimeInput.value,
];

const MANUAlLY_FORWARDED_FIELDS = [
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

  return !testIfAutoForwardField(type, isMobile) && !MANUAlLY_FORWARDED_FIELDS.includes(type?.value);
};

export const useFieldForwardRules = (activeField: LaxIdentifier): FieldForwardRules => {
  const theme = useTheme<LibroTheme>();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [type] = useIds(activeField, rdf.type);

  const [isAutoForwardField, setIsAutoForwardField] = React.useState(false);
  const [isForwardedByEnter, setIsForwardedByEnter] = React.useState(false);

  React.useEffect(() => {
    setIsAutoForwardField(testIfAutoForwardField(type, smDown));
    setIsForwardedByEnter(testIfForwardedByEnter(type, smDown));
  }, [type, smDown]);

  return {
    isAutoForwardField,
    isForwardedByEnter,
  };
};
