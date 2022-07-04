import rdf, { Quad } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as xsd from '@ontologies/xsd';
import HttpStatus from 'http-status-codes';

import ex from '../../../../../ontology/ex';
import http from '../../../../../ontology/http';
import { createAppNS } from '../../../../Common/ontology/app';
import example from '../../../../Kernel/ontology/example';
import ontola from '../../../../Kernel/ontology/ontola';
import { toDataDocument, toDataObject } from '../quadsToDataObject';

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

const multiResourceDocument = `{
  "@id": "http://example.com/ns",
  [rdfx.type]: owl.Ontology,
},
{
  "@id": ex.ns("prop").value,
  [rdfx.type]: owl.ObjectProperty,
},
`;

describe('quadsToDataObject', () => {
  describe('toDataObject', () => {
    it('skips empty object', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(undefined);
    });

    it('skips objects without appropriate data', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(example.ns('0'), http.statusCode, HttpStatus.OK),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(undefined);
    });

    it('serializes shorthand globalId property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, rdfx.type, schema.Book),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneShorthandGlobalIdProp);
    });

    it('serializes namespace property key', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.ns('extensionProp'), rdf.literal('')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneNSPropKey);
    });

    it('serializes unknown globalId property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, rdfx.type, rdf.namedNode('https://dexes.localdev/resources/5')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneUnknownGlobalIdProp);
    });

    it('serializes websiteIRI scoped globalId property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, rdfx.type, rdf.namedNode(`${websiteIRI}resources/5`)),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneWebsiteIRIScopedGlobalIdProp);
    });

    it('serializes string property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.name, rdf.literal('title')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneStringLiteralProp);
    });

    it('serializes string property with newlines', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.name, rdf.literal('.\\n\\nIn')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneNewlineStringLiteralProp);
    });

    it('serializes langString property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.name, rdf.literal('title', 'en')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneLangStringLiteralProp);
    });

    it('serializes two string property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.name, rdf.literal('title1')),
        rdf.quad(subject, schema.name, rdf.literal('title2')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(twoStringLiteralProp);
    });

    it('serializes boolean property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.isGift, rdf.literal(false)),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneBooleanLiteralProp);
    });

    it('serializes dateTime property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.dateCreated, rdf.literal('2021-04-06T14:11:53.996Z', xsd.dateTime)),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneDateLiteralProp);
    });

    it('serializes number property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.estimatedCost, rdf.literal(100)),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneNumberLiteralProp);
    });

    it('serializes decimal property', () => {
      const cost = 100.5;
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, schema.estimatedCost, rdf.literal(cost)),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneDecimalLiteralProp);
    });

    it('serializes nested object', () => {
      const subject = appNS.ns('0');
      const author = rdf.blankNode();
      const data: Quad[] = [
        rdf.quad(subject, schema.author, author),
        rdf.quad(author, schema.name, rdf.literal('Andy')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneNestedStringProp);
    });

    it('serializes complex name shorthand property', () => {
      const subject = appNS.ns('0');
      const data: Quad[] = [
        rdf.quad(subject, ontola['format/svg'], rdf.literal('')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneComplexNameShorthandProp);
    });

    it('serializes seq objects', () => {
      const subject = appNS.ns('0');
      const comment = rdf.blankNode();
      const data: Quad[] = [
        rdf.quad(subject, schema.comment, comment),
        rdf.quad(comment, rdfx.type, rdfx.Seq),
        rdf.quad(comment, rdfx.ns('_2'), rdf.literal('comment 2')),
        rdf.quad(comment, rdfx.ns('_1'), rdf.literal('comment 1')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneSeqProp);
    });

    it('serializes seq objects with local iris', () => {
      const subject = appNS.ns('0');
      const comment = rdf.blankNode();
      const data: Quad[] = [
        rdf.quad(subject, schema.comment, comment),
        rdf.quad(comment, rdfx.type, rdfx.Seq),
        rdf.quad(comment, rdfx.ns('_2'), appNS.ns('2')),
        rdf.quad(comment, rdfx.ns('_1'), appNS.ns('1')),
      ];

      const result = toDataObject(subject, data, websiteIRI);

      expect(result).toEqual(oneSeqWithLocalsProp);
    });
  });

  describe('toDataDocument', () => {
    it('serializes nested resources', () => {
      const subject = rdf.namedNode('http://example.com/ns');
      const data: Quad[] = [
        rdf.quad(rdf.namedNode('http://example.com/ns'), rdfx.type, owl.Ontology),
        rdf.quad(ex.ns('prop'), rdfx.type, owl.ObjectProperty),
      ];

      const [result, multiple] = toDataDocument(subject, data, websiteIRI);

      expect(multiple).toBeTruthy();
      expect(result).toEqual(multiResourceDocument);
    });
  });
});
