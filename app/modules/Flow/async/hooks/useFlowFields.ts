import { isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  ReturnType,
  dig,
  useIds,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import { formFieldsPath } from '../../../Form/lib/diggers';
import ontola from '../../../../ontology/ontola';
import { formContext } from '../../../Form/components/Form/FormContext';
import useShapeValidation from '../../../Form/hooks/useShapeValidation';

export const useFlowFields = (): SomeNode[] => {
  const { object } = React.useContext(formContext);
  const fields = useIds(dig(...formFieldsPath));

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

  return filteredFields;
};
