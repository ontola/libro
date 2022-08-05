import {
  MiddlewareActionHandler,
  MiddlewareWithBoundLRS,
  SomeNode,
} from 'link-lib';

import { log } from '../../../helpers/logging';

const logging = (): MiddlewareWithBoundLRS => (next: MiddlewareActionHandler) => (iri: SomeNode, opts: any): Promise<any> => {
  log('Link action:', iri, opts);

  return next(iri, opts);
};

export default logging;
