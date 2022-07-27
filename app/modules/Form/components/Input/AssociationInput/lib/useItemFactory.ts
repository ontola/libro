import rdf, { NamedNode, QuadPosition } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  dig,
  useDataFetching,
  useGlobalIds,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { SubmitDataProcessor } from '../../../../../Common/lib/errorHandling';
import ll from '../../../../../Kernel/ontology/ll';
import ontola from '../../../../../Kernel/ontology/ontola';
import { conditionalFormFieldsPath, formFieldsPath } from '../../../../lib/diggers';
import { JSONLDObject } from '../../../../lib/helpers';
import { formContext } from '../../../Form/FormContext';
import { ItemFactory } from '../../../FormField/FormFieldTypes';

export const useItemFactory = (): ItemFactory => {
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const { object } = React.useContext(formContext);

  const [path] = useGlobalIds(sh.path);
  // const association = lrs.originalLRS.getResourceProperty(object, path) as NamedNode;
  const [clonedId] = useIds(object, ll.clonedFrom);
  const association = lrs.getResourceProperty(clonedId, path) as NamedNode;
  useDataFetching(association);

  const formPaths = useIds(
    association,
    dig(ontola.createAction, schema.target, ll.actionBody, ...formFieldsPath, sh.path),
  );
  const conditionalFormPaths = useIds(
    association,
    dig(ontola.createAction, schema.target, ll.actionBody, ...conditionalFormFieldsPath, sh.path),
  );
  const [blankObject] = useIds(association, dig(ontola.createAction, schema.object));

  const newItem = React.useCallback(() => {
    const values: JSONLDObject = { '@id': rdf.blankNode(`_:${uuidv4()}`) };

    if (blankObject) {
      lrs.store.quadsFor(blankObject).forEach((quad) => {
        if (formPaths.indexOf(quad[QuadPosition.predicate]) !== -1 || conditionalFormPaths.indexOf(quad[QuadPosition.predicate]) !== -1) {
          values[btoa(quad[QuadPosition.predicate].value)] = [quad[QuadPosition.object]];
        }
      });
    }

    return values;
  }, [blankObject, formPaths, conditionalFormPaths]);

  return newItem;
};
