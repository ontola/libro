import rdf, { NamedNode } from '@ontologies/core';
import {
  MiddlewareActionHandler,
  MiddlewareWithBoundLRS,
  SomeNode,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { DialogSize } from '../../Common/lib/DialogSize';
import { ShowDialog } from '../../Common/middleware/actions';
import app from '../../Common/ontology/app';
import libro from '../../Kernel/ontology/libro';

import {
  StartSignIn,
  StartSignOut,
} from './actions';

export const authMiddleware = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  /**
   * App sign in
   */
  const signInLink = (redirectUrl?: NamedNode) => {
    const postFix = redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl.value.split('#')[0])}` : '';

    return app.ns('u/session/new' + postFix);
  };

  store.actions.set(
    StartSignIn,
    (redirectUrl?: NamedNode) => {
      const resourceIRI = signInLink(redirectUrl);

      return store.actions.get(ShowDialog)(resourceIRI, DialogSize.Sm);
    },
  );

  /**
   * App sign out
   */
  store.actions.set(
    StartSignOut,
    (redirect?: NamedNode) => {
      if (redirect) {
        store.exec(rdf.namedNode(`${libro.actions.logout.value}?location=${encodeURIComponent(redirect.value)}`));
      } else {
        store.exec(libro.actions.logout);
      }
    },
  );

  /**
   * Handler
   */
  return (next: MiddlewareActionHandler) => (iri: SomeNode, opts: any): Promise<any> => next(iri, opts);
};
