import rdf, { Node, Quad } from '@ontologies/core';

import { getBumps } from './serialization';
import { serializeValue } from './serializeValue';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

function numAsc(a: Quad, b: Quad) {
  const aP = Number.parseInt(a.predicate.value.slice(base.length), 10);
  const bP = Number.parseInt(b.predicate.value.slice(base.length), 10);

  return aP - bP;
}

export const serializeSeqObject = (id: Node, data: Quad[], indentation: number, websiteIRI: string): string => {
  const [shortBump, longBump, nextIndentation] = getBumps(indentation);

  let stringified = 'seq([\n';

  data
    .filter((q) => rdf.equals(q.subject, id) && q.predicate.value.startsWith(base))
    .sort(numAsc)
    .forEach((it) => {
      stringified += `${longBump}${serializeValue(it.object, data, websiteIRI, nextIndentation)},\n`;
    });

  stringified += `${shortBump}])`;

  return stringified;
};
