import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  ELEMENT_DEFAULT,
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate';
import { SomeNode } from 'link-lib';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import elements from '../../../../../ontology/elements';
import ontola from '../../../../../ontology/ontola';
import sales from '../../../../../ontology/sales';
import { deepRecordToDeepSeed } from '../../../../Studio/async/lib/deepRecordToDeepSeed';
import { deepSeedRecordToElementsValue } from '../deepSeedRecordToElementsValue';

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
  text: string,
  { type = ELEMENT_PARAGRAPH, mark = undefined, attributes = {} }: Opts = {},
) => {
  const leaf: any = { text };

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
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: sales.SellingPoint,
            [s(schema.text)]: rdf.literal('Verzamel ideeën'),
            [s(schema.image)]: {
              _id: rdf.blankNode(),
              [s(rdfx.type)]: ontola.PictureSet,
              [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_bulb_icon.svg'),
            },
            [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
          },
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: sales.SellingPoint,
            [s(schema.text)]: rdf.literal('Stemmen en waarderen'),
            [s(schema.image)]: {
              _id: rdf.blankNode(),
              [s(rdfx.type)]: ontola.PictureSet,
              [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_thumbsup_icon.svg'),
            },
            [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
          },
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: sales.SellingPoint,
            [s(schema.text)]: rdf.literal('Enquêtes'),
            [s(schema.image)]: {
              _id: rdf.blankNode(),
              [s(rdfx.type)]: ontola.PictureSet,
              [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_list_icon.svg'),
            },
            [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
          },
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: sales.SellingPoint,
            [s(schema.text)]: rdf.literal('Participatief begroten'),
            [s(schema.image)]: {
              _id: rdf.blankNode(),
              [s(rdfx.type)]: ontola.PictureSet,
              [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_euro_icon.svg'),
            },
            [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
          },
          {
            _id: rdf.blankNode(),
            [s(rdfx.type)]: sales.SellingPoint,
            [s(schema.text)]: rdf.literal('Swipetool'),
            [s(schema.image)]: {
              _id: rdf.blankNode(),
              [s(rdfx.type)]: ontola.PictureSet,
              [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_swipe_icon.svg'),
            },
            [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
          },
        ]),
      },
    ]));

    expect(deepSeedRecordToElementsValue(document, '', mapping)).toEqual([
      {
        children: [
          createElement('paragraph'),
        ],
        type: ELEMENT_DEFAULT,
      },
    ]);
  });
});
