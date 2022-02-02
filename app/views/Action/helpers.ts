import { NamedNode } from '@ontologies/core';
import { useLRS } from 'link-redux';
import React, { SyntheticEvent, useCallback } from 'react';
import { useHistory } from 'react-router';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import { redirectPage } from '../../middleware/reloading';

export type CardListOnClick = (e: SyntheticEvent<any>) => Promise<[any, any]>;

export type OnDoneHandler = (iri: string) => void;

export const useDoneHandler = (onDone?: OnDoneHandler): (response: any) => void => {
  const history = useHistory();
  const lrs = useLRS();

  return useCallback((response) => {
    if (onDone) {
      onDone(response.iri);
    } else if (response.iri && isDifferentWebsite(response.iri)) {
      redirectPage(lrs, response.iri.value);
    } else if (response.iri) {
      history.push(retrievePath(response.iri.value) ?? '#');
    } else {
      history.goBack();
    }
  }, [history, lrs, onDone]);
};

export interface ActionProps {
  appendix?: React.FC;
  onDone?: (iri: string) => void;
  sessionStore?: Storage;
  onCancel?: () => void;
  responseCallback?: (response: Response) => void;
  topology?: NamedNode;
}
