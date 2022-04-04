import { isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  ReturnType,
  useIds,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import { formContext } from '../../../../components/Form/FormContext';
import { useContainerToArr } from '../../../../hooks/useContainerToArr';
import useShapeValidation from '../../../../hooks/useShapeValidation';
import form from '../../../../ontology/form';
import ontola from '../../../../ontology/ontola';

export const useFlowFields = (): [SomeNode[], boolean] => {
  const { object } = React.useContext(formContext);
  const [pageCollection] = useIds(form.pages);
  const [pages] = useContainerToArr<SomeNode>(pageCollection);
  const [groupCollection] = useIds(pages?.[0], form.groups);
  const [groups] = useContainerToArr<SomeNode>(groupCollection);
  const [fieldsCollection] = useIds(groups?.[0], form.fields);
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

  const filteredFields = React.useMemo(() => {
    const normalizedFields = fields.map((field, index) => {
      const pass = fieldsProps[index].pass;

      return isNode(pass) ? pass : field;
    });

    return normalizedFields.filter((_, index) => {
      if (!fieldsProps[index].shape) {
        return true;
      }

      return results[index];
    });
  }, [fields.length]);

  if (loading) {
    return [fields, loading];
  }

  return [filteredFields, loading];
};
