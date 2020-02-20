import rdf, { BlankNode, Quad, SomeTerm } from '@ontologies/core';
// @ts-ignore
import NdjsonStream from 'can-ndjson-stream';
import { ResponseAndFallbacks } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

export default {
  acceptValue: 1.0,
  mediaTypes: ['application/hex+x-ndjson'],

  transformer: (store: LinkReduxLRSType) => (res: ResponseAndFallbacks): Promise<Quad[]> => {
    if (res instanceof Response) {
      const bnMap: { [s: string]: BlankNode } = {};
      // Skip the (expensive) proxy object when parsing
      const quad = rdf.quad.bind(rdf);
      const literal = rdf.literal.bind(rdf);
      const namedNode = rdf.namedNode.bind(rdf);
      const blankNodeF = rdf.blankNode.bind(rdf);
      const defaultGraph = rdf.defaultGraph.bind(rdf);

      const blankNode = (v: string) => {
        if (!bnMap[v]) {
          bnMap[v] = blankNodeF();
        }
        return bnMap[v];
      };

      const object = (v: string, dt: string, l: string): SomeTerm => {
        if (l) {
          return literal(v, l);
        } else if (dt === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#namedNode') {
          return namedNode(v);
        } else if (dt === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#blankNode') {
          return blankNode(v);
        }

        return literal(v, namedNode(dt));
      };

      const lineToQuad = (h: string[]) => quad(
        h[0].startsWith('_:') ? blankNode(h[0]) : namedNode(h[0]),
        namedNode(h[1]),
        object(h[2], h[3], h[4]),
        h[5] ? namedNode(h[5]) : defaultGraph(),
      );

      const stream = new NdjsonStream(res.body);
      const reader = stream.getReader();
      const delta: Quad[] = [];

      let read: any;
      return reader
        .read()
        .then(read = (result: { done: boolean, value: string[] }) => {
          if (result.done) {
            return;
          }

          delta.push(lineToQuad(result.value));
          return reader.read().then(read);
        })
        .then(() => store.queueDelta(delta, res.hasOwnProperty('expedite') ? (res as any).expedite : false))
        .then(() => []);
    } else {
      return Promise.resolve([]);
    }
  },
};
