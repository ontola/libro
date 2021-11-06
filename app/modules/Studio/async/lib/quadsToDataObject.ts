import rdf, {
  NamedNode,
  Node,
  Quad,
  SomeTerm,
  isBlankNode,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { doc } from '@rdfdev/iri';

import http from '../../../../ontology/http';

import { getBumps, quoteForObjectKey } from './serialization';
import { serializeSeqObject } from './serializeSeqObject';
import { serializeDocumentIdValue, serializeValue } from './serializeValue';
import { shortenGlobalId } from './shortMap';

const withValue = <T, K extends T extends undefined ? never : T>(v: T, cb: (v: K) => void) => {
  if (v !== undefined) {
    cb(v as K);
  }
};

const nestedResources = (id: NamedNode, data: Quad[]): Set<Node> => {
  const resources = new Set(
    data
      .filter((it) => !rdf.equals(it.predicate, http.statusCode))
      .map((it) => it.subject)
      .filter((it) => isNamedNode(it) && doc(it) === doc(id)),
  );
  resources.delete(id);

  return resources;
};

const regularObject = (
  id: Node,
  data: Quad[],
  websiteIRI: string,
  indentation: number,
): string | undefined => {
  const [shortBump, longBump, nextIndentation] = getBumps(indentation);
  let stringified = '{\n';

  const properties = data
    .filter((q) => rdf.equals(q.subject, id) && !rdf.equals(q.predicate, http.statusCode))
    .reduce((acc: Record<string, SomeTerm[]>, cur) => ({
      ...acc,
      [cur.predicate.value]: [...(acc[cur.predicate.value] ?? []), cur.object],
    }), {});

  if (Object.keys(properties).length === 0) {
    return undefined;
  }

  if (isNamedNode(id)) {
    stringified += `${longBump}"@id": ${serializeDocumentIdValue(id, websiteIRI)},\n`;
  }

  for (const [k, v] of Object.entries(properties)) {
    const key = quoteForObjectKey(shortenGlobalId(k, websiteIRI));
    let value: string | undefined;

    if (v.length === 1) {
      value = serializeValue(v[0], data, websiteIRI, nextIndentation);
    } else {
      const [, deepBump] = getBumps(nextIndentation);
      const values = v.map((it) => deepBump + serializeValue(it, data, websiteIRI, nextIndentation));
      const serialized = values.join(',\n');
      value = `[\n${serialized},\n${longBump}]`;
    }

    if (value !== undefined) {
      stringified += `${longBump}${key}: ${value},\n`;
    }
  }

  stringified += `${shortBump}}`;

  return stringified;
};

export const toDataObject = (
  id: Node,
  data: Quad[],
  websiteIRI: string,
  indentation = 0,
): string | undefined => {
  if (isBlankNode(id)) {
    const isSeq = data
      .filter((q) => rdf.equals(q.subject, id) && rdf.equals(q.predicate, rdfx.type))
      .map((q) => q.object)
      .some((it) => rdf.equals(it, rdfx.Seq));

    if (isSeq) {
      return serializeSeqObject(id, data, indentation, websiteIRI);
    }
  }

  return regularObject(id, data, websiteIRI, indentation);
};

export const toDataDocument = (
  id: Node,
  data: Quad[],
  websiteIRI: string,
  indentation = 0,
): [(string | undefined), boolean] => {
  if (isBlankNode(id)) {
    return [toDataObject(id, data, websiteIRI, indentation), false];
  }

  const nestedIds = nestedResources(id, data);

  if (nestedIds.size === 0) {
    return [toDataObject(id, data, websiteIRI, indentation), false];
  }

  const [shortBump, _, __] = getBumps(indentation);
  const primaryStringified = toDataObject(id, data, websiteIRI, indentation);

  let stringified = '';

  if (primaryStringified) {
    stringified += primaryStringified;
    stringified += ',\n';
  }

  for (const it of nestedIds) {
    withValue(regularObject(it, data, websiteIRI, indentation), (v) => {
      stringified += `${shortBump}${v},\n`;
    });
  }

  return [stringified, true];
};

const isMultiple = (id: Node, data: Quad[]) => {
  if (isBlankNode(id)) {
    return false;
  }

  return nestedResources(id, data).size > 0;
};

export const toWrappedDataDocument = (id: Node, data: Quad[], websiteIRI: string, indentation = 0): string => {
  if (isMultiple(id, data)) {
    const [, , nestedIndent] = getBumps(indentation);
    const [stringified] = toDataDocument(id, data, websiteIRI, nestedIndent);

    return `[\n${stringified}]\n`;
  }

  const [stringified] = toDataDocument(id, data, websiteIRI, indentation);

  return `(${stringified})`;
};
