import { Node, isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  ReturnType,
  useProperty,
  useResourceLinks,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import { FormContext } from '../../../components/Form/Form';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import useShapeValidation from '../../../hooks/useShapeValidation';
import form from '../../../ontology/form';
import ontola from '../../../ontology/ontola';

const useFlowFields = (): [SomeNode[], boolean] => {
  const { object } = React.useContext(FormContext);
  const [pageCollection] = useProperty(form.pages) as Node[];
  const [pages] = useContainerToArr<SomeNode>(pageCollection);
  const [groupCollection] = useResourceProperty(pages?.[0], form.groups) as Node[];
  const [groups] = useContainerToArr<SomeNode>(groupCollection);
  const [fieldsCollection] = useResourceProperty(groups?.[0], form.fields) as Node[];
  const [fields, loading] = useContainerToArr<SomeNode>(fieldsCollection);

  const fieldsProps = useResourceLinks(
    fields,
    {
      pass: ontola.pass,
      shape: sh.node,
    },
    { returnType: ReturnType.Term },
  );
  const shapes = fieldsProps.map((fieldProps) => isNode(fieldProps.shape) ? fieldProps.shape : undefined);
  const results = useShapeValidation(shapes, object);

  if (loading) {
    return [fields, loading];
  }

  const normalizedFields = fields.map((field, index) => {
    const pass = fieldsProps[index].pass;

    return isNode(pass) ? pass : field;
  });
  const filteredFields = normalizedFields.filter((_, index) => {
    if (!fieldsProps[index].shape) {
      return true;
    }

    return results[index];
  });

  return [filteredFields, loading];
};

export default useFlowFields;
