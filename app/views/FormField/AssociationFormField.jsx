import rdf from '@ontologies/core';
import { register } from 'link-redux';
import React from 'react';
import uuidv4 from 'uuid/v4';

import FormField from '../../components/FormField/FormField';
import AssociationInput from '../../components/Input/AssociationInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const newItem = () => ({ '@id': rdf.blankNode(uuidv4()) });

const AssociationFormField = (props) => {
  const fieldProps = useFormField({
    alwaysVisible: false,
    newItem,
    ...props,
  });

  return (
    <FormField
      {...fieldProps}
      className={`Field--association ${fieldProps.className}`}
      inputComponent={AssociationInput}
      renderHelper={null}
    />
  );
};

AssociationFormField.type = form.AssociationInput;

AssociationFormField.topology = allTopologies;

export default register(AssociationFormField);
