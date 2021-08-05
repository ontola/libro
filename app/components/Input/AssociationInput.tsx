import { isNamedNode, isNode } from '@ontologies/core';
import { Property, useResourceProperty } from 'link-redux';
import React from 'react';

import { isJSONLDObject } from '../../helpers/types';
import form from '../../ontology/form';
import { FormSection } from '../Form';
import { InputComponentProps } from '../FormField/InputComponentProps';

const AssociationInput: React.FC<InputComponentProps> = ({
  field,
  inputIndex,
  inputValue,
  name,
  path,
}) => {
  const nestedObject = isJSONLDObject(inputValue) ? inputValue['@id'] : undefined;
  const [nestedFormIRI] = useResourceProperty(field, form.form);

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
