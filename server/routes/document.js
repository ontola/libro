// @ts-check
import { URL } from 'url';

import rdf, {
  isBlankNode,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';

import parseToGraph from '../../app/modules/Studio/lib/parseToGraph';
import http from '../../app/ontology/http';
import ld from '../../app/ontology/ld';
import ll from '../../app/ontology/ll';
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

export const renderDoc = async (ctx) => {
  try {
    const source = await ctx.documentSource();

    if (!source) {
      throw new Error('No or invalid document source');
    }

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

    await ctx.getManifest();
    ctx.response.body = await renderFullPage(ctx, body);
  } catch (e) {
    logging.error(e);
    ctx.response.status = INTERNAL_SERVER_ERROR;
  }
};

export const docMiddleware = async (ctx, next) => {
  try {
    const docKey = await ctx.documentRoute();

    if (!docKey) {
      return next();
    }

    if (new URL(ctx.request.href).pathname.split('/').pop() === 'manifest.json') {
      try {
        const manifest = await ctx.documentManifest();

        ctx.res.setHeader('Content-Type', 'application/json');
        ctx.status = OK;
        ctx.body = JSON.stringify(manifest);
      } catch (e) {
        logging.error(e);
        ctx.status = INTERNAL_SERVER_ERROR;
      }

      return;
    }

    if (new URL(ctx.request.href).pathname.split('/').pop() === 'sitemap.txt') {
      try {
        const sitemap = await ctx.documentSitemap();

        ctx.res.setHeader('Content-Type', 'text/plain');
        ctx.status = OK;
        ctx.body = sitemap;
      } catch (e) {
        logging.error(e);
        ctx.status = INTERNAL_SERVER_ERROR;
      }

      return;
    }

    return renderDoc(ctx);
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
  let sitemap;

  try {
    source = ctx.request.body.source;
    manifestOverride = ctx.request.body.manifestOverride;
    sitemap = ctx.request.body.sitemap;
  } catch (err) {
    ctx.status = 400;
  }

  try {
    await client.hset(key, 'source', source);
    await client.hset(key, 'manifestOverride', manifestOverride);
    await client.hset(key, 'sitemap', sitemap);
    ctx.status = 200;
  } catch (err) {
    logging.error(err);
    ctx.status = 500;
  }
}

export const offlineDocument = async (ctx, next) => {
  const source = await ctx.documentSource();

  if (source) {
    return await renderDoc(ctx);
  }

  return next();
}
