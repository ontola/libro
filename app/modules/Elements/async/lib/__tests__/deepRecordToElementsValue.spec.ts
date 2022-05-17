import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  ELEMENT_DEFAULT,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  MARK_BOLD,
} from '@udecode/plate';
import { SomeNode } from 'link-lib';

import elements from '../../../../../ontology/elements';
import ontola from '../../../../../ontology/ontola';
import sales from '../../../../../ontology/sales';
import { deepRecordToElementsValue } from '../deepRecordToElementsValue';

const seq = (arr: any[], id?: SomeNode) => {
  const base = {
    _id: id ?? rdf.blankNode(),
    [rdfx.type.value]: rdfx.Seq,
  };

  return arr.reduce((acc, next, n) => Object.assign(acc, { [rdfx.ns(`_${n}`).value]: next }), base);
};

const s = (v: NamedNode): string => v.value;

type Opts = { type?: string, mark?: string | undefined };

const createElement = (text: string, { type = ELEMENT_PARAGRAPH, mark = undefined }: Opts = {}) => {
  const leaf: any = { text };

  if (mark) {
    leaf[mark] = true;
  }

  return {
    children: [leaf],
    type,
  };
};

describe('deepRecordToElementsValue', () => {
  it('processes an empty document', () => {
    const document = {
      _id: rdf.blankNode(),
      [s(rdfx.type)]: elements.Document,
      [s(elements.children)]: seq([]),
    };

    expect(deepRecordToElementsValue(document)).toEqual([
      {
        children: [{
          children: [],
          type: 'p',
        }],
        type: ELEMENT_DEFAULT,
      },
    ]);
  });

  it('processes a document with a child', () => {
    const document = {
      _id: rdf.blankNode(),
      [s(rdfx.type)]: elements.Document,
      [s(elements.children)]: seq([
        {
          [s(rdfx.type)]: elements.P,
          [s(elements.children)]: seq([
            {
              [s(rdfx.type)]: elements.InnerText,
              [s(schema.text)]: rdf.literal('paragraph'),
            },
          ]),
        },
      ]),
    };

    expect(deepRecordToElementsValue(document)).toEqual([
      {
        children: [
          createElement('paragraph'),
        ],
        type: ELEMENT_DEFAULT,
      },
    ]);
  });

  it('handles marks', () => {
    const document = {
      _id: rdf.blankNode(),
      [s(rdfx.type)]: elements.Document,
      [s(elements.children)]: seq([
        {
          [s(rdfx.type)]: elements.InnerText,
          [s(elements.bold)]: rdf.literal(true),
          [s(schema.text)]: rdf.literal('bold text'),
        },
      ]),
    };

    expect(deepRecordToElementsValue(document)).toEqual([
      {
        children: [
          createElement('bold text', { mark: MARK_BOLD }),
        ],
        type: ELEMENT_DEFAULT,
      },
    ]);

  });

  it('handles links', () => {
    const document = {
      _id: rdf.blankNode(),
      children: seq([
        {
          [s(rdfx.type)]: elements.A,
          [s(ontola.href)]: rdf.namedNode('https://argu.localtest/info/functionaliteiten'),
          [s(elements.children)]: seq([
            {
              [s(rdfx.type)]: elements.InnerText,
              [s(schema.text)]: rdf.literal('enquête'),
            },
          ]),
        },
      ]),
    };

    expect(deepRecordToElementsValue(document)).toEqual([
      {
        children: [
          createElement('a', { type: ELEMENT_LINK }),
        ],
        type: ELEMENT_DEFAULT,
      },
    ]);
  });

  it('handles grids', () => {
    const document = {
      _id: rdf.blankNode(),
      [s(rdfx.type)]: elements.Document,
      [s(elements.children)]: seq([
        {
          [s(rdfx.type)]: elements.Grid,
          [s(elements.minWidth)]: rdf.literal('20rem'),
          [s(elements.gap)]: rdf.literal('xxl'),
          [s(elements.children)]: seq([
            {
              [s(rdfx.type)]: sales.SellingPoint,
              [s(schema.text)]: rdf.literal('Verzamel ideeën'),
              [s(schema.image)]: {
                [s(rdfx.type)]: ontola.PictureSet,
                [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_bulb_icon.svg'),
              },
              [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
            },
            {
              [s(rdfx.type)]: sales.SellingPoint,
              [s(schema.text)]: rdf.literal('Stemmen en waarderen'),
              [s(schema.image)]: {
                [s(rdfx.type)]: ontola.PictureSet,
                [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_thumbsup_icon.svg'),
              },
              [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
            },
            {
              [s(rdfx.type)]: sales.SellingPoint,
              [s(schema.text)]: rdf.literal('Enquêtes'),
              [s(schema.image)]: {
                [s(rdfx.type)]: ontola.PictureSet,
                [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_list_icon.svg'),
              },
              [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
            },
            {
              [s(rdfx.type)]: sales.SellingPoint,
              [s(schema.text)]: rdf.literal('Participatief begroten'),
              [s(schema.image)]: {
                [s(rdfx.type)]: ontola.PictureSet,
                [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_euro_icon.svg'),
              },
              [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
            },
            {
              [s(rdfx.type)]: sales.SellingPoint,
              [s(schema.text)]: rdf.literal('Swipetool'),
              [s(schema.image)]: {
                [s(rdfx.type)]: ontola.PictureSet,
                [s(ontola['format/svg'])]: rdf.namedNode('https://dptr8y9slmfgv.cloudfront.net/sales/images/circle_swipe_icon.svg'),
              },
              [s(ontola.href)]: rdf.literal('https://argu.co/info/functionaliteiten'),
            },
          ]),
        },
      ]),
    };

    expect(deepRecordToElementsValue(document)).toEqual([
      {
        children: [
          createElement('paragraph'),
        ],
        type: ELEMENT_DEFAULT,
      },
    ]);
  });
});
