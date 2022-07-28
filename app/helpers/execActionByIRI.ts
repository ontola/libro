import rdfFactory, { NamedNode, TermType } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { BAD_REQUEST } from 'http-status-codes';
import {
  DataObject,
  LinkedRenderStore,
  ProcessorError,
  SomeNode,
  toGraph,
} from 'link-lib';

import { sliceToEmpJson } from '../modules/Kernel/lib/empjsonSerializer';

import { renameRecords } from './renameRecords';

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const execActionByIRI = (store: LinkedRenderStore<any>) => async (subject: SomeNode, data?: DataObject) => {
  // const [graph, blobs = []] = dataTuple;

  if (store.store.getInternalStore().store.getRecord(subject.value) === undefined) {
    await store.getEntity(subject as NamedNode);
  }

  const target = store.getResourceProperty(subject, schema.target);

  const urls = store.getResourceProperty(target as SomeNode, schema.url);
  const url = Array.isArray(urls) ? urls[0] : urls;

  if (!url) {
    throw new Error('MSG_URL_UNDEFINED');
  }

  if (url.termType !== TermType.NamedNode) {
    throw new Error('MSG_URL_UNRESOLVABLE');
  }

  const targetMethod = store.getResourceProperty(target as SomeNode, schema.httpMethod);
  const method = typeof targetMethod !== 'undefined' ? targetMethod.value : 'GET';
  const opts = (store.api as any).requestInitGenerator.generate(method, 'application/hex+x-ndjson');

  if (opts.headers instanceof Headers) {
    opts.headers.set('Request-Referrer', subject.value);
  } else if (opts.headers && !Array.isArray(opts.headers)) {
    opts.headers['Request-Referrer'] = subject.value;
  }

  if (!SAFE_METHODS.includes(method) && data) {
    opts.headers['Content-Type'] = 'application/empathy+json';

    const [iri, index] = toGraph(data ?? {});
    const renamed = renameRecords(index.store.data, [iri], [rdfFactory.namedNode('.')]);
    const prepared = sliceToEmpJson(renamed);

    opts.body = JSON.stringify(prepared);
  }

  const resp = await (store.api as any).fetch(url.value, opts).then((store.api as any).processExecAction);

  if (resp.status > BAD_REQUEST) {
    // TODO: process responses with a correct content-type.
    throw new ProcessorError('Request failed with bad status code', resp);
  }

  const statements = await (store.api as any).feedResponse(resp, true);

  const location = resp.headers.get('Location');
  const fqLocation = location && new URL(location || '', window.location.origin).toString();
  const iri = fqLocation && rdfFactory.namedNode(fqLocation) || null;

  return {
    data: statements,
    iri,
  };
};
