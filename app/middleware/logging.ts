import { NamedNode } from '@ontologies/core';
import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { log } from '../helpers/logging';

const logging = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  (store as any).actions = {};

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    log('Link action:', iri, opts);

    return next(iri, opts);
  };
};

export default logging;
