import { Quadruple } from '@ontologies/core';
// @ts-ignore
import {
  ExtensionResponse,
  RDFLibFetcherResponse,
  ResponseAndFallbacks,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { Slice, seedToSlice } from '../seed';

export class NdEmpJsonParser {
  public parseString(text: string, websiteIRI: string): Slice[] {
    const slices = [];

    for (const line of text.split('\n')) {
      if (line.length > 0) {
        const slice = seedToSlice(line, websiteIRI);
        slices.push(slice);
      }
    }

    return slices;
  }
}

const parseResponse = async (parser: NdEmpJsonParser, res: ResponseAndFallbacks, websiteIRI: string): Promise<Slice[]> => {
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

  return parser.parseString(text, websiteIRI);
};

export default {
  acceptValue: 1.0,
  mediaTypes: ['application/empathy+x-ndjson'],

  transformer: (store: LinkReduxLRSType, websiteIRI: string): (_: ResponseAndFallbacks) => Promise<Quadruple[]> => {
    const parser = new NdEmpJsonParser();

    return async (res: ResponseAndFallbacks): Promise<Quadruple[]> => {
      const delta: Slice[] = await parseResponse(parser, res, websiteIRI);

      delta.forEach((slice) => {
        Object.values(slice).forEach((record) => {
          store.store.getInternalStore().store.setRecord(record._id.value, record);
        });
      });

      return [];
    };
  },
};
