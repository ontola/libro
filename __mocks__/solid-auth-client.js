/**
 * The `rdflib` fetcher module doesn't use spec compliant implementations provided by the
 * ecosystem.. so we need to do some overrides again..
 * @module SolidAuthClient
 */

import fetch from 'isomorphic-fetch';

export default { fetch };

export { fetch };
