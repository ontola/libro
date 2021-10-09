import rdf, { NamedNode, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  FC,
  register,
  useDataFetching,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormContext } from '../../components/Form/Form';
import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import AssociationInput from '../../components/Input/AssociationInput';
import { conditionalFormFieldsPath, formFieldsPath } from '../../helpers/diggers';
import { SubmitDataProcessor } from '../../helpers/errorHandling';
import { JSONLDObject } from '../../helpers/forms';
import useFormField from '../../hooks/useFormField';
import { ClonedLRS } from '../../hooks/useFormLRS';
import form from '../../ontology/form';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';

const useItemFactory = () => {
  const lrs = useLRS<unknown, SubmitDataProcessor, ClonedLRS>();
  const [path] = useGlobalIds(sh.path);
  const { object } = React.useContext(FormContext);
  const association = lrs.originalLRS.getResourceProperty(object, path) as NamedNode;
  const [createAction] = useGlobalIds(association, ontola.createAction);
  const formPaths = lrs.dig(createAction, [schema.target, ll.actionBody, ...formFieldsPath, sh.path]);
  const conditionalFormPaths = lrs.dig(
    createAction,
    [schema.target, ll.actionBody, ...conditionalFormFieldsPath, sh.path],
  );
  const [blankObject] = useGlobalIds(createAction, schema.object);
  useDataFetching([association, createAction].filter(isNamedNode));

  return React.useCallback(() => {
    const values: JSONLDObject = { '@id': rdf.blankNode(uuidv4()) };

    if (blankObject) {
      lrs.store.quadsFor(blankObject).forEach((quad) => {
        if (formPaths.indexOf(quad.predicate) !== -1 || conditionalFormPaths.indexOf(quad.predicate) !== -1) {
          values[btoa(quad.predicate.value)] = [quad.object];
        }
      });
    }

    return values;
  }, [blankObject, formPaths, conditionalFormPaths]);
};

const AssociationFormField: FC = (props) => {
  const newItem = useItemFactory();

  const fieldProps = useFormField({
    alwaysVisible: false,
    newItem,
    ...props,
  });

  if (!fieldProps.whitelisted) {
    return null;
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

AssociationFormField.topology = formFieldTopologies;

export default register(AssociationFormField);
