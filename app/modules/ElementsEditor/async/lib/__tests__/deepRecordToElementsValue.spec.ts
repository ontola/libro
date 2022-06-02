import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate';
import { DeepRecord, SomeNode } from 'link-lib';

import elements from '../../../../../ontology/elements';
import ontola from '../../../../../ontology/ontola';
import { deepRecordToDeepSeed } from '../../../../Studio/async/lib/deepRecordToDeepSeed';
import { ELEMENT_GRID } from '../../components/plugins/grid';
import { deepSeedRecordToElementsValue } from '../deepSeedRecordToElementsValue';

const text = (contents: string) => ({
  _id: rdf.blankNode(),
  [s(rdfx.type)]: elements.P,
  [s(elements.children)]: seq([
    {
      _id: rdf.blankNode(),
      [s(rdfx.type)]: elements.InnerText,
      [s(schema.text)]: rdf.literal(contents),
    },
  ]),
});

const seq = (arr: any[], id?: SomeNode) => {
  const base = {
    _id: id ?? rdf.blankNode(),
    [rdfx.type.value]: rdfx.Seq,
  };

  return arr.reduce((acc, next, n) => Object.assign(acc, { [rdfx.ns(`_${n}`).value]: next }), base);
};

const s = (v: NamedNode): string => v.value;

type Opts = {
  type?: string,
  mark?: string | undefined,
  attributes?: Record<string, string>,
};

const createElement = (
  contents: string,
  { type = ELEMENT_PARAGRAPH, mark = undefined, attributes = {} }: Opts = {},
) => {
  const leaf: any = { text: contents };

  if (mark) {
    leaf[mark] = true;
  }

  return {
    ...attributes,
    children: [leaf],
    type,
  };
};

const createDocument = (children: DeepRecord[] = []): DeepRecord => ({
  _id: rdf.blankNode(),
  [s(rdfx.type)]: elements.Document,
  [s(elements.children)]: seq(children),
});

describe('deepRecordToElementsValue', () => {
  const mapping = {};

  it('processes an empty document', () => {
    const document = deepRecordToDeepSeed(createDocument());

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([]);
  });

  it('processes a document with a child', () => {
    const document = deepRecordToDeepSeed(createDocument([
      {
        _id: rdf.blankNode(),
        [s(rdfx.type)]: elements.P,
        [s(elements.children)]: seq([
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: elements.InnerText,
            [s(schema.text)]: rdf.literal('paragraph'),
          },
        ]),
      },
    ]));

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([
      createElement('paragraph'),
    ]);
  });

  it('handles marks', () => {
    const document = deepRecordToDeepSeed(createDocument([
      {
        _id: rdf.blankNode(),
        [s(rdfx.type)]: elements.InnerText,
        [s(elements.bold)]: rdf.literal(true),
        [s(schema.text)]: rdf.literal('bold text'),
      },
    ]));

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([
      {
        bold: true,
        text: 'bold text',
      },
    ]);
  });

  it('handles links', () => {
    const document = deepRecordToDeepSeed(createDocument([
      {
        _id: rdf.blankNode(),
        [s(rdfx.type)]: elements.A,
        [s(ontola.href)]: rdf.namedNode('https://argu.localtest/info/functionaliteiten'),
        [s(elements.children)]: seq([
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: elements.InnerText,
            [s(schema.text)]: rdf.literal('enquête'),
          },
        ]),
      },
    ]));

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([
      createElement('enquête', {
        attributes: { url: 'https://argu.localtest/info/functionaliteiten' },
        type: ELEMENT_LINK,
      }),
    ]);
  });

  it('handles images', () => {
    const document = deepRecordToDeepSeed(createDocument([
      {
        _id: rdf.blankNode(),
        [s(rdfx.type)]: ontola.PictureSet,
        [s(ontola.imgUrl568x400)]: rdf.namedNode('http://example.com/image.svg'),
      },
    ]));

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([
      createElement('', {
        attributes: { url: 'http://example.com/image.svg' },
        type: ELEMENT_IMAGE,
      }),
    ]);
  });

  it('handles grids', () => {
    const document = deepRecordToDeepSeed(createDocument([
      {
        _id: rdf.blankNode(),
        [s(rdfx.type)]: elements.Grid,
        [s(elements.minWidth)]: rdf.literal('20rem'),
        [s(elements.gap)]: rdf.literal('xxl'),
        [s(elements.children)]: seq([
          text('Verzamel ideeën'),
          text('Stemmen en waarderen'),
          text('Enquêtes'),
          text('Participatief begroten'),
          text('Swipetool'),
        ]),
      },
    ]));

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([
      {
        children: [
          createElement('Verzamel ideeën'),
          createElement('Stemmen en waarderen'),
          createElement('Enquêtes'),
          createElement('Participatief begroten'),
          createElement('Swipetool'),
        ],
        gap: 'xxl',
        minWidth: '20rem',
        type: ELEMENT_GRID,
      },
    ]);
  });
});
