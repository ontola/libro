import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { useLRS } from 'link-redux';
import React from 'react';

import { namePredicates } from '../../../../Common/lib/predicates';
import { isResource } from '../../../../Kernel/lib/typeCheckers';
import { entityIsLoaded } from '../../../../Kernel/lib/data';
import ontola from '../../../../Kernel/ontology/ontola';
import libro from '../../../../Kernel/ontology/libro';

export const useItemToString = (): ((i: SomeTerm | undefined | null) => string) => {
  const lrs = useLRS();

  return React.useCallback((item: SomeTerm | undefined | null) => {
    if (typeof item === 'undefined' || item === null) {
      return '';
    }

    if (!isResource(item)) {
      return item.value ?? '';
    }

    if (item === libro.null) {
      return '';
    }

    if (!entityIsLoaded(lrs, item)) {
      return 'Loading';
    }

    const itemClass = lrs.getResourceProperty<SomeNode>(item, rdfx.type);
    const itemClassDisplayProp = lrs.getResourceProperty<SomeNode>(
      itemClass,
      ontola['forms/inputs/select/displayProp'],
    );
    const classDisplayProp = itemClassDisplayProp ?? schema.name;
    const label = lrs.getResourceProperty(item, [classDisplayProp, ...namePredicates]);

    return label?.value ?? item.value ?? '';
  }, [lrs]);
};
