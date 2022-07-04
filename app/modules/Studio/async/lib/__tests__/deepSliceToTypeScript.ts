import rdf from '@ontologies/core';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as xsd from '@ontologies/xsd';
import { DeepRecord } from 'link-lib';

import ex from '../../../../../ontology/ex';
import { createAppNS } from '../../../../Common/ontology/app';
import ontola from '../../../../Kernel/ontology/ontola';
import { DeepSlice } from '../../../lib/dataObjectsToDeepSlice';
import { deepSliceToTypeScript, toDataObject } from '../deepSliceToTypeScript';

const websiteIRI = 'https://mysite.example.com/';
const appNS = createAppNS(websiteIRI);

const oneStringLiteralProp = `{
  "@id": local("0").value,
  [schema.name]: "title",
}`;

const oneNewlineStringLiteralProp = `{
  "@id": local("0").value,
  [schema.name]: ".\\\\n\\\\nIn",
}`;

const oneLangStringLiteralProp = `{
  "@id": local("0").value,
  [schema.name]: lang("en", "title"),
}`;

const twoStringLiteralProp = `{
  "@id": local("0").value,
  [schema.name]: [
    "title1",
    "title2",
  ],
}`;

const oneShorthandGlobalIdProp = `{
  "@id": local("0").value,
  [rdfx.type]: schema.Book,
}`;

const oneNSPropKey = `{
  "@id": local("0").value,
  [schema.ns("extensionProp")]: "",
}`;

const oneUnknownGlobalIdProp = `{
  "@id": local("0").value,
  [rdfx.type]: url("https://dexes.localdev/resources/5"),
}`;

const oneWebsiteIRIScopedGlobalIdProp = `{
  "@id": local("0").value,
  [rdfx.type]: local("resources/5"),
}`;

const oneBooleanLiteralProp = `{
  "@id": local("0").value,
  [schema.isGift]: false,
}`;

const oneDateLiteralProp = `{
  "@id": local("0").value,
  [schema.dateCreated]: date("2021-04-06T14:11:53.996Z"),
}`;

const oneNumberLiteralProp = `{
  "@id": local("0").value,
  [schema.estimatedCost]: 100,
}`;

const oneDecimalLiteralProp = `{
  "@id": local("0").value,
  [schema.estimatedCost]: 100.5,
}`;

const oneNestedStringProp = `{
  "@id": local("0").value,
  [schema.author]: {
    [schema.name]: "Andy",
  },
}`;

const oneComplexNameShorthandProp = `{
  "@id": local("0").value,
  [ontola["format/svg"]]: "",
}`;

const oneSeqProp = `{
  "@id": local("0").value,
  [schema.comment]: seq([
    "comment 1",
    "comment 2",
  ]),
}`;

const oneSeqWithLocalsProp = `{
  "@id": local("0").value,
  [schema.comment]: seq([
    local("1"),
    local("2"),
  ]),
}`;

const multiResourceDocument = `[
  {
    "@id": "http://example.com/ns",
    [rdfx.type]: owl.Ontology,
  },
  {
    "@id": ex.ns("prop").value,
    [rdfx.type]: owl.ObjectProperty,
  },
]
`;

describe('deepSliceToTypeScript', () => {
  describe('toDataObject', () => {
    it('skips empty object', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(undefined);
    });

    it('serializes shorthand globalId property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [rdfx.type.value]: schema.Book,
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneShorthandGlobalIdProp);
    });

    it('serializes namespace property key', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.ns('extensionProp').value]: rdf.literal(''),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneNSPropKey);
    });

    it('serializes unknown globalId property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [rdfx.type.value]: rdf.namedNode('https://dexes.localdev/resources/5'),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneUnknownGlobalIdProp);
    });

    it('serializes websiteIRI scoped globalId property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [rdfx.type.value]: rdf.namedNode(`${websiteIRI}resources/5`),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneWebsiteIRIScopedGlobalIdProp);
    });

    it('serializes string property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.name.value]: rdf.literal('title'),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneStringLiteralProp);
    });

    it('serializes string property with newlines', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.name.value]: rdf.literal('.\\n\\nIn'),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneNewlineStringLiteralProp);
    });

    it('serializes langString property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.name.value]: rdf.literal('title', 'en'),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneLangStringLiteralProp);
    });

    it('serializes two string property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.name.value]: [
          rdf.literal('title1'),
          rdf.literal('title2'),
        ],
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(twoStringLiteralProp);
    });

    it('serializes boolean property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.isGift.value]: rdf.literal(false),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneBooleanLiteralProp);
    });

    it('serializes dateTime property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.dateCreated.value]: rdf.literal('2021-04-06T14:11:53.996Z', xsd.dateTime),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneDateLiteralProp);
    });

    it('serializes number property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.estimatedCost.value]: rdf.literal(100),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneNumberLiteralProp);
    });

    it('serializes decimal property', () => {
      const cost = 100.5;
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [schema.estimatedCost.value]: rdf.literal(cost),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneDecimalLiteralProp);
    });

    it('serializes nested object', () => {
      const subject = appNS.ns('0');
      const author = rdf.blankNode();
      const data: DeepRecord = {
        _id: subject,
        [schema.author.value]: {
          _id: author,
          [schema.name.value]: rdf.literal('Andy'),
        },
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneNestedStringProp);
    });

    it('serializes complex name shorthand property', () => {
      const subject = appNS.ns('0');
      const data: DeepRecord = {
        _id: subject,
        [ontola['format/svg'].value]: rdf.literal(''),
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneComplexNameShorthandProp);
    });

    it('serializes seq objects', () => {
      const subject = appNS.ns('0');
      const comment = rdf.blankNode();
      const data = {
        _id: subject,
        [schema.comment.value]: {
          _id: comment,
          [rdfx.type.value]: rdfx.Seq,
          [rdfx.ns('_2').value]: rdf.literal('comment 2'),
          [rdfx.ns('_1').value]: rdf.literal('comment 1'),
        },
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneSeqProp);
    });

    it('serializes seq objects with local iris', () => {
      const subject = appNS.ns('0');
      const comment = rdf.blankNode();
      const data: DeepRecord = {
        _id: subject,
        [schema.comment.value]: {
          _id: comment,
          [rdfx.type.value]: rdfx.Seq,
          [rdfx.ns('_2').value]: appNS.ns('2'),
          [rdfx.ns('_1').value]: appNS.ns('1'),
        },
      };

      const result = toDataObject(data, websiteIRI);

      expect(result).toEqual(oneSeqWithLocalsProp);
    });
  });

  describe('deepSliceToTypeScript', () => {
    it('serializes multiple records', () => {
      const data: DeepSlice = {
        [rdf.namedNode('http://example.com/ns').value]: {
          _id: rdf.namedNode('http://example.com/ns'),
          [rdfx.type.value]: owl.Ontology,
        },
        [ex.ns('prop').value]: {
          _id: ex.ns('prop'),
          [rdfx.type.value]: owl.ObjectProperty,
        },
      };

      const [result, multiple] = deepSliceToTypeScript(data, websiteIRI);

      expect(multiple).toBeTruthy();
      expect(result).toEqual(multiResourceDocument);
    });
  });
});
