import { makeStyles } from '@mui/styles';
import { isNamedNode, isNode } from '@ontologies/core';
import { useIds } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../../Kernel/lib/themes';
import { isJSONLDObject } from '../../../lib/helpers';
import form from '../../../ontology/form';
import { FormSection } from '../../Form';
import { formFieldContext } from '../../FormField/FormFieldContext';
import { InputComponentProps } from '../../FormField/FormFieldTypes';

import AssociationFields from './AssociationFields';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  multiple: {
    background: 'white',
    border: `1px solid ${theme.palette.grey['300']}`,
    borderRadius: '.5em',
    marginBottom: '1em',
    padding: '1em',
  },
}));

const AssociationInput: React.FC<InputComponentProps> = ({
  inputIndex,
  inputValue,
}) => {
  const classes = useStyles();
  const {
    field,
    fieldShape,
    name,
    path,
  } = React.useContext(formFieldContext);
  const multiple = fieldShape.maxCount && fieldShape.maxCount > 1;
  const nestedObject = isJSONLDObject(inputValue) ? inputValue['@id'] : undefined;
  const [nestedFormIRI] = useIds(field, form.form);

  if (!nestedObject || !isNode(nestedFormIRI) || !isNamedNode(path) || !field) {
    return null;
  }

  if (!isJSONLDObject(inputValue)) {
    return null;
  }

  return (
    <FormSection
      className={multiple ? classes.multiple : undefined}
      formIRI={nestedFormIRI}
      name={name}
      object={nestedObject}
      path={path}
      propertyIndex={inputIndex}
    >
      <AssociationFields />
    </FormSection>
  );
};

export default AssociationInput;
