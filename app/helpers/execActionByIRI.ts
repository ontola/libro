import rdfFactory, {
  NamedNode,
  TermType,
  isBlankNode,
  isNamedNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { BAD_REQUEST } from 'http-status-codes';
import {
  DataObject,
  LinkedRenderStore,
  ProcessorError,
  SerializableDataTypes,
  SomeNode,
  toGraph,
} from 'link-lib';

import { isJSONLDObject, retrieveIdFromValue } from '../modules/Form/lib/helpers';
import { sliceToEmpJson } from '../modules/Kernel/lib/empjsonSerializer';
import ll from '../modules/Kernel/ontology/ll';

import { renameRecords } from './renameRecords';

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const execActionByIRI = (store: LinkedRenderStore<any>) => async (subject: SomeNode, data?: DataObject) => {
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

    const [original, updated] = Object.values(data).reduce(([from, to]) => {
      const processValues = (values: SerializableDataTypes) => {
        (Array.isArray(values) ? values : [values]).forEach((value) => {
          if (isJSONLDObject(value)) {
            Object.values(value).forEach((val) => processValues(val));
            const id = retrieveIdFromValue(value);

            if (isBlankNode(id)) {
              const clonedFrom = store.getResourceProperty(id, ll.clonedFrom);

              if (isNamedNode(clonedFrom)) {
                from.push(id);
                to.push(clonedFrom);
              }
            }
          }
        });
      };

      Object.values(data).forEach((values) => {
        processValues(values);
      });

      return [from, to];
    }, [[iri], [rdfFactory.namedNode('.')]]);

    const renamed = renameRecords(index.store.data, original, updated);
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
