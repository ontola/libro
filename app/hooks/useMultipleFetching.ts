import rdfFactory, { isBlankNode } from '@ontologies/core';
import { normalizeType } from 'link-lib';
import { DataInvalidationProps, useLRS } from 'link-redux';
import React from 'react';

export const useMultipleFetching = (
  props: DataInvalidationProps,
  lastUpdate?: number,
  setError?: (e: Error) => void,
): void => {
  const lrs = useLRS();
  React.useEffect(() => {
    for (const s of normalizeType(props.dataSubjects)) {
      if (s && lrs.shouldLoadResource(s)) {
        if (isBlankNode(s)) {
          if (!setError) {
            throw new Error('No setError given');
          }

          return setError(new TypeError('TODO: blankNodeWarn'));
        }
        lrs.queueEntity(s);
      }
    }
  }, [rdfFactory.id(props.subject), lastUpdate]);
};
