// @ts-check
import { URL } from 'url';

import rdf, {
  isBlankNode,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { OK } from 'http-status-codes';

import http from '../../app/ontology/http';
import ld from '../../app/ontology/ld';
import ll from '../../app/ontology/ll';
import parseToGraph from '../../app/routes/PageBuilder/parseToGraph';
import { redisSettingsNS } from '../config';
import { client } from '../middleware/sessionMiddleware';
import logging from '../utils/logging';
import { renderFullPage } from '../utils/render';

const hexJSONSubject = (subject) => (isBlankNode(subject) ? `_:${subject.value}` : subject.value);

const hexJSONValue = (object) => (isLiteral(object) ? object.value : hexJSONSubject(object));

const hexJSONDataType = (object) => {
  if (isLiteral(object)) {
    return object.datatype.value;
  }

  return isNamedNode(object)
    ? rdfx.ns('namedNode').value
    : rdfx.ns('blankNode').value;
};

const stemIri = (iri) => {
  const url = new URL(iri);

  return `${url.origin}${url.pathname}`;
};

const findStartRoute = async (iri) => {
  const startRoute = `${redisSettingsNS}.routes.start.`;

  const startKeys = await client.keys(`${startRoute}*`);
  const strippedKeys = startKeys.map((key) => key.replace(startRoute, ''));
  const result = strippedKeys.find((key) => stemIri(iri) === key || iri.startsWith(`${key}/`));

  if (!result) {
    return undefined;
  }

  return client.get(`${startRoute}${result}`);
};

const renderDoc = async (ctx, key) => {
  try {
    const doc = await client.hgetall(key);
    const { manifestOverride, source } = doc;
    const quads = parseToGraph(source, ctx.request.origin).flatMap(([subject, store]) => {
      store.addQuadruples([
        [subject, http.statusCode, rdf.literal(OK), ll.meta],
        [rdf.namedNode(ctx.request.href), http.statusCode, rdf.literal(OK), ll.meta],
      ]);

      return store.quads;
    });

    const body = quads.map((q) => JSON.stringify([
      hexJSONSubject(q.subject),
      q.predicate.value,
      hexJSONValue(q.object),
      hexJSONDataType(q.object),
      q.object.language ?? '',
      q.graph.value === 'rdf:defaultGraph' ? ld.add.value : q.graph.value,
    ])).join('\n');

    await ctx.getManifest(null, JSON.parse(manifestOverride));
    ctx.response.body = await renderFullPage(ctx, body);
  } catch (e) {
    logging.error(e);
  }
};

export const docMiddleware = async (ctx, next) => {
  try {
    const docKey = await findStartRoute(ctx.request.href);

    if (!docKey) {
      return next();
    }

    return renderDoc(ctx, docKey);
  } catch (e) {
    logging.error(e);

    return next();
  }
};

export const documents = async (ctx) => {
  try {
    const keys = await client.keys(`${redisSettingsNS}.docs.*`);

    ctx.res.setHeader('Content-Type', 'application/json');
    ctx.status = 200;
    ctx.body = keys.map((k) => `${ctx.request.origin}/_libro/docs/${k.split('.').pop()}`);
  } catch (e) {
    logging.error(e);
    ctx.status = 404;
  }
};

export const document = async (ctx) => {
  try {
    const key = `${redisSettingsNS}.docs.${ctx.params.id}`;
    if (await client.exists(key)) {
      ctx.res.setHeader('Content-Type', 'application/json');
      ctx.body = await client.hgetall(key);
    } else {
      ctx.status = 404;
    }
  } catch (e) {
    logging.error(e);
    ctx.status = 404;
  }
};

export const saveDocument = async (ctx) => {
  const key = `${redisSettingsNS}.docs.${ctx.params.id}`;
  let source;
  let manifestOverride;
  try {
    source = ctx.request.body.source;
    manifestOverride = ctx.request.body.manifestOverride;
  } catch (err) {
    ctx.status = 400;
  }
  try {
    await client.hset(key, 'source', source);
    await client.hset(key, 'manifestOverride', manifestOverride);
    ctx.status = 200;
  } catch (err) {
    logging.error(err);
    ctx.status = 500;
  }
}
