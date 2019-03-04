import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { NamedNode } from 'rdflib';

import { log } from '../helpers/logging';

const logging = () => (): MiddlewareWithBoundLRS => {
  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    log('Link action:', iri, opts);

    return next(iri, opts);
  };
};

export default logging;
