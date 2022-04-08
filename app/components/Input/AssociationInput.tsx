import { isNamedNode, isNode } from '@ontologies/core';
import { Property, useFields } from 'link-redux';
import React from 'react';

import { isJSONLDObject } from '../../helpers/types';
import form from '../../ontology/form';
import { FormSection } from '../Form';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/FormFieldTypes';

const AssociationInput: React.FC<InputComponentProps> = ({
  inputIndex,
  inputValue,
}) => {
  const {
    field,
    name,
    path,
  } = React.useContext(formFieldContext);
  const nestedObject = isJSONLDObject(inputValue) ? inputValue['@id'] : undefined;
  const [nestedFormIRI] = useFields(field, form.form);

  if (!nestedObject || !isNode(nestedFormIRI) || !isNamedNode(path)) {
    return null;
  }

  return (
    <FormSection
      formIRI={nestedFormIRI}
      name={name}
      object={nestedObject}
      path={path}
      propertyIndex={inputIndex}
    >
      <Property label={form.form}>
        <Property label={form.pages} />
      </Property>
    </FormSection>
  );
};

export default AssociationInput;
