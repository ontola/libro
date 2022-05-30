import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  dig,
  useLRS,
  useValues,
} from 'link-redux';
import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import { redirectPage } from '../../middleware/reloading';

export type CardListOnClick = (e: SyntheticEvent<any>) => Promise<[any, any]>;

export type OnDoneHandler = (iri: string, method: string) => void;

export const useDoneHandler = (onDone?: OnDoneHandler): (response: any) => void => {
  const navigate = useNavigate();
  const lrs = useLRS();
  const [method] = useValues(dig(schema.target, schema.httpMethod));

  return useCallback((response) => {
    if (!response) {
      return;
    }

    if (onDone) {
      onDone(response.iri, method);
    } else if (response.iri && isDifferentWebsite(response.iri)) {
      redirectPage(lrs, response.iri.value);
    } else if (response.iri) {
      navigate(retrievePath(response.iri.value) ?? '#');
    } else {
      navigate(-1);
    }
  }, [navigate, lrs, onDone]);
};

export interface ActionProps {
  appendix?: React.FC;
  onDone?: (iri: string) => void;
  sessionStore?: Storage;
  onCancel?: () => void;
  responseCallback?: (response: Response) => void;
  topology?: NamedNode;
}
