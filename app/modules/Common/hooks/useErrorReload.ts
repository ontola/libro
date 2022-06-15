import rdf from '@ontologies/core';
import {
  INTERNAL_SERVER_ERROR,
  PROXY_AUTHENTICATION_REQUIRED,
  TOO_MANY_REQUESTS,
} from 'http-status-codes';
import { RequestStatus, SomeNode } from 'link-lib';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import { isDifferentWebsite } from '../lib/iris';

const RETRYABLE_ERRORS = [
  PROXY_AUTHENTICATION_REQUIRED,
  TOO_MANY_REQUESTS,
];

export type ReloadLinkedObject = () => Promise<void>;

export interface ErrorReload {
  loading: boolean;
  reload: () => void;
}

type StatusMap = { [id: string]: RequestStatus };

const useErrorReload = (subject: SomeNode | undefined, reloadLinkedObject: ReloadLinkedObject): ErrorReload => {
  const lrs = useLRS();
  const [loading, setLoading] = React.useState(false);
  const timestamp = useDataInvalidation(subject);
  React.useEffect(() => {
    setLoading(false);
  }, [setLoading, timestamp]);
  const reload = React.useCallback(() => {
    setLoading(true);

    if (!reloadLinkedObject) {
      setLoading(false);
    }

    reloadLinkedObject()
      .catch((e) => {
        handle(e);

        return setLoading(false);
      });

    return Object
      .entries(((lrs.api as any).statusMap as StatusMap))
      .forEach(([id, s]) => {
        const iri = rdf.namedNode(id);
        const shouldReload = !isDifferentWebsite(iri) && s?.status && (
          s.status >= (INTERNAL_SERVER_ERROR - 1) || RETRYABLE_ERRORS.includes(s.status)
        );

        if (shouldReload) {
          lrs.queueEntity(iri, { reload: true });
        }
      });
  }, [lrs, reloadLinkedObject, setLoading]);

  return {
    loading,
    reload,
  };
};

export default useErrorReload;
