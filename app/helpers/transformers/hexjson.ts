import rdf, {
  BlankNode,
  Quad,
  Quadruple,
  SomeTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
// @ts-ignore
import NdjsonStream from 'can-ndjson-stream';
import {
  ExtensionResponse,
  RDFLibFetcherResponse,
  ResponseAndFallbacks,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

enum HexPosition {
  Subject = 0,
  Predicate,
  Value,
  Datatype,
  Language,
  Graph,
}

let hasReadableStreamConstructor = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  new ReadableStream({ start() {} });
  hasReadableStreamConstructor = true;
} catch (e) {
  // ignore
}

export class HexJsonParser {
  private quad = rdf.quad.bind(rdf);
  private literal = rdf.literal.bind(rdf);
  private namedNode = rdf.namedNode.bind(rdf);
  private blankNodeF = rdf.blankNode.bind(rdf);
  private defaultGraph = rdf.defaultGraph.bind(rdf);
  private bnMap: { [s: string]: BlankNode } = {};

  public parseString(text: string): Quad[] {
    this.clearMap();

    const quads = [];

    for (const line of text.split('\n')) {
      if (line.length > 0) {
        quads.push(this.hexArrayToQuad(JSON.parse(line)));
      }
    }

    return quads;
  }

  public async parseStream(stream: ReadableStream<Uint8Array>): Promise<Quad[]> {
    const ndjStream = new NdjsonStream(stream);
    const reader = ndjStream.getReader();

    const quads = [];
    let result;

    while (((result = await reader.read()) && !result.done)) {
      quads.push(this.hexArrayToQuad(result.value));
    }

    return quads;
  }

  public hexArrayToQuad(h: string[]): Quad {
    return this.quad(
      h[HexPosition.Subject].startsWith('_:') ? this.blankNode(h[HexPosition.Subject]) : this.namedNode(h[HexPosition.Subject]),
      this.namedNode(h[HexPosition.Predicate]),
      this.object(h[HexPosition.Value], h[HexPosition.Datatype], h[HexPosition.Language]),
      h[HexPosition.Graph] ? this.namedNode(h[HexPosition.Graph]) : this.defaultGraph(),
    );
  }

  private blankNode(v: string) {
    if (!this.bnMap[v]) {
      this.bnMap[v] = this.blankNodeF();
    }

    return this.bnMap[v];
  }

  private clearMap() {
    this.bnMap = {};
  }

  private object(v: string, dt: string, l: string): SomeTerm {
    if (l) {
      return this.literal(v, l);
    } else if (dt === rdfx.ns('namedNode').value) {
      return this.namedNode(v);
    } else if (dt === rdfx.ns('blankNode').value) {
      return this.blankNode(v);
    }

    return this.literal(v, this.namedNode(dt));
  }
}

const parseResponse = async (parser: HexJsonParser, res: ResponseAndFallbacks): Promise<Quad[]> => {
  if (res instanceof Response && hasReadableStreamConstructor) {
    if (res.body === null) {
      return [];
    }

    return await parser.parseStream(res.body);
  }

  let body;

  if (res instanceof Response) {
    body = res.text();
  } else if (typeof XMLHttpRequest !== 'undefined'
    && res instanceof XMLHttpRequest
    || typeof (res as any).responseText === 'string') {
    body = Promise.resolve((res as XMLHttpRequest | RDFLibFetcherResponse).responseText);
  } else {
    body = Promise.resolve((res as ExtensionResponse).body);
  }

  const text = await body;

  return parser.parseString(text);
};

export default {
  acceptValue: 1.0,
  mediaTypes: ['application/hex+x-ndjson'],

  transformer: (store: LinkReduxLRSType): (_: ResponseAndFallbacks) => Promise<Quadruple[]> => {
    const parser = new HexJsonParser();

    return async (res: ResponseAndFallbacks): Promise<Quadruple[]> => {
      const delta: Quad[] = await parseResponse(parser, res);
      // eslint-disable-next-line no-prototype-builtins
      const isExpedited = res.hasOwnProperty('expedite')
        ? (res as any).expedite
        : false;

      await store.queueDelta(delta, isExpedited);

      return [];
    };
  },
};
