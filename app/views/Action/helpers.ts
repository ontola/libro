import { NamedNode, SomeTerm } from '@ontologies/core';
import { useLRS } from 'link-redux';
import React, { SyntheticEvent, useCallback } from 'react';
import { useHistory } from 'react-router';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import { redirectPage } from '../../middleware/reloading';
import { omniformOpenInline, omniformSetAction } from '../../state/omniform';

type DispatchToProps = { onClick: (e: SyntheticEvent<any>) => Promise<[any, any]>};

export const mapCardListDispatchToProps = (dispatch: (...args: any[]) => void, ownProps: Record<string, any>): DispatchToProps => ({
  onClick: (e: SyntheticEvent<any>) => {
    e.preventDefault();

    return Promise.all([
      dispatch(omniformOpenInline(ownProps.isPartOf)),
      dispatch(omniformSetAction({
        action: ownProps.subject,
        parentIRI: btoa(ownProps.isPartOf.value),
      })),
    ]);
  },
});

export const useDoneHandler = (onDone?: (iri: string) => void): (response: any) => void => {
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
  actionStatus?: SomeTerm;
  appendix?: React.FC;
  object?: SomeTerm;
  onDone?: (iri: string) => void;
  sessionStore?: Storage;
  onCancel?: () => void;
  target?: SomeTerm;
  topology?: NamedNode;
}
