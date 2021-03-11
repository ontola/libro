import rdf from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import FormField from '../../components/FormField/FormField';
import AssociationInput from '../../components/Input/AssociationInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const newItem = () => ({ '@id': rdf.blankNode(uuidv4()) });

const AssociationFormField: FC = (props) => {
  const fieldProps = useFormField({
    alwaysVisible: false,
    newItem,
    ...props,
  });

  if (!fieldProps.whitelisted) {
    return <React.Fragment />;
  }

  return (
    <FormField
      {...fieldProps}
      className={`Field--association ${fieldProps.className}`}
      inputComponent={AssociationInput}
      renderHelper={undefined}
    />
  );
};

AssociationFormField.type = form.AssociationInput;

AssociationFormField.topology = allTopologies;

export default register(AssociationFormField);
