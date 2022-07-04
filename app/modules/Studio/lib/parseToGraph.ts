/* eslint-disable unused-imports/no-unused-vars */
import * as ontAs from '@ontologies/as';
import rdf, {
  Literal,
  Node,
  QuadPosition,
  SomeTerm,
  isBlankNode,
  isLiteral,
  isNamedNode,
  isTerm,
} from '@ontologies/core';
import * as ontDcterms from '@ontologies/dcterms';
import * as ontFoaf from '@ontologies/foaf';
import * as ontOwl from '@ontologies/owl';
import * as ontRdfx from '@ontologies/rdf';
import * as ontRdfs from '@ontologies/rdfs';
import * as ontSchema from '@ontologies/schema';
import * as ontShacl from '@ontologies/shacl';
import * as ontXsd from '@ontologies/xsd';
import { OK } from 'http-status-codes';
import {
  DataObject,
  SerializableDataTypes,
  seq as linkSeq,
  normalizeType,
  toGraph,
} from 'link-lib';
import { ParsedObject } from 'link-lib/dist-types/types';

import ontAppSlashless from '../../../ontology/appSlashless';
import ontDbo from '../../Common/ontology/dbo';
import ontEx from '../../../ontology/ex';
import ontFa4 from '../../../ontology/fa4';
import ontFhir from '../../../ontology/fhir';
import ontHttp from '../../../ontology/http';
import ontHttph from '../../../ontology/httph';
import ontHydra from '../../../ontology/hydra';
import ontLd from '../../Kernel/ontology/ld';
import ontLink from '../../../ontology/link';
import ontMeeting from '../../../ontology/meeting';
import ontOpengov from '../../../ontology/opengov';
import ontOrg from '../../../ontology/org';
import ontPerson from '../../../ontology/person';
import ontQb from '../../../ontology/qb';
import ontSp from '../../Kernel/ontology/sp';
import ontWdt from '../../Common/ontology/wdt';
import '../../../useFactory';
import ontArgu from '../../Argu/ontology/argu';
import { toEmpJson } from '../../Kernel/lib/empjsonSerializer';
import { createAppNS } from '../../Common/ontology/app';
import ontExample from '../../Kernel/ontology/example';
import ontLibro from '../../Kernel/ontology/libro';
import ontLl from '../../Kernel/ontology/ll';
import ontOntola from '../../Kernel/ontology/ontola';
import ontDexes from '../../Dexes/ontology/dexes';
import ontElements from '../../Elements/ontology/elements';
import ontForm from '../../Form/ontology/form';
import ontTeamGL from '../../GroenLinks/ontology/teamGL';
import ontSales from '../../SalesWebsite/ontology/sales';

const isSerializablePrimitive = (obj: any): obj is Exclude<SerializableDataTypes, DataObject> => {
  if (obj === undefined || obj === null) {
    throw new Error('Value in serializable object was empty.');
  }

  if (Array.isArray(obj)) {
    return obj.every((e) => isSerializablePrimitive(e));
  }

  const isDataValue = typeof obj === 'boolean'
    || typeof obj === 'number'
    || typeof obj === 'string'
    || isTerm(obj)
    || obj.constructor === Date
    || obj.constructor === File;

  if (!isDataValue && typeof obj !== 'object') {
    throw new Error(`Data wasn't a serializable primitive nor a DataObject ('${typeof obj}', '${obj}')`);
  }

  return isDataValue;
};

const nameIdempotently = <T extends DataObject | SerializableDataTypes>(obj: T, path: string): T => {
  if (Array.isArray(obj)) {
    return obj.map((e, i) => nameIdempotently(e, `${path}.${i}`)) as T;
  }

  if (isSerializablePrimitive(obj)) {
    return obj;
  }

  const seed: DataObject = { '@id': (obj as any)['@id'] ?? rdf.namedNode(path) };

  return Object.entries(obj)
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: nameIdempotently(v, `${path}.${k}`),
      }),
      seed,
    ) as T;
};

const parseToGraph = (source: string, websiteIRI: string, idempotentNaming = true): ParsedObject[] => {
  // @ts-ignore
  const as = ontAs;
  // @ts-ignore
  const dcterms = ontDcterms;
  // @ts-ignore
  const foaf = ontFoaf;
  // @ts-ignore
  const owl = ontOwl;
  // @ts-ignore
  const rdfx = ontRdfx;
  // @ts-ignore
  const rdfs = ontRdfs;
  // @ts-ignore
  const schema = ontSchema;
  // @ts-ignore
  const shacl = ontShacl;
  // @ts-ignore
  const xsd = ontXsd;

  // @ts-ignore
  const app = createAppNS(websiteIRI);
  // @ts-ignore
  const appSlashless = ontAppSlashless;
  // @ts-ignore
  const argu = ontArgu;
  // @ts-ignore
  const dbo = ontDbo;
  // @ts-ignore
  const dexes = ontDexes;
  // @ts-ignore
  const elements = ontElements;
  // @ts-ignore
  const ex = ontEx;
  // @ts-ignore
  const example = ontExample;
  // @ts-ignore
  const fa4 = ontFa4;
  // @ts-ignore
  const fhir = ontFhir;
  // @ts-ignore
  const form = ontForm;
  // @ts-ignore
  const http = ontHttp;
  // @ts-ignore
  const httph = ontHttph;
  // @ts-ignore
  const hydra = ontHydra;
  // @ts-ignore
  const ld = ontLd;
  // @ts-ignore
  const libro = ontLibro;
  // @ts-ignore
  const link = ontLink;
  // @ts-ignore
  const ll = ontLl;
  // @ts-ignore
  const meeting = ontMeeting;
  // @ts-ignore
  const ontola = ontOntola;
  // @ts-ignore
  const opengov = ontOpengov;
  // @ts-ignore
  const org = ontOrg;
  // @ts-ignore
  const person = ontPerson;
  // @ts-ignore
  const qb = ontQb;
  // @ts-ignore
  const sales = ontSales;
  // @ts-ignore
  const sp = ontSp;
  // @ts-ignore
  const teamGL = ontTeamGL;
  // @ts-ignore
  const wdt = ontWdt;

  // @ts-ignore
  const local = (s: string) => {
    if (s === '' || s.startsWith('#') || s.startsWith('/') || s.startsWith('?')) {
      return rdf.namedNode(`${websiteIRI}${s}`);
    }

    return rdf.namedNode(`${websiteIRI}/${s}`);
  };

  interface LangMap { en: string | DataObject, nl: string | DataObject }
  // @ts-ignore
  const t = (langMap: LangMap): Array<Literal | DataObject> =>
    Object.entries(langMap).map(([k, v]) => {
      if (typeof v === 'string') {
        return rdf.literal(v, k);
      }

      return {
        [rdfx.type.toString()]: libro.ns('TranslatedObject'),
        [libro.ns('language').toString()]: k,
        [libro.ns('value').toString()]: v,
      };
    });

  // @ts-ignore
  const url = (s: string) => rdf.namedNode(s);
  // @ts-ignore
  const lang = (language: string, value: string) => rdf.literal(value, language);
  // @ts-ignore
  const date = (s: string) => rdf.literal(new Date(s));
  // @ts-ignore
  const seq = linkSeq;
  // tslint:disable-next-line:no-eval
  const data = normalizeType(eval(source));
  const normalized = idempotentNaming
    ? data.map((obj) => nameIdempotently(obj, (obj['@id'] as string) ?? rdf.blankNode().value))
    : data;

  return normalized.map((obj) => toGraph(obj, undefined, undefined, {
    _ids: {
      ns: (_) => rdf.namedNode('_ids'),
    },
  }));
};

const hexJSONSubject = (subject: Node): string => (isBlankNode(subject) ? `_:${subject.value}` : subject.value);

const hexJSONValue = (object: SomeTerm): string => (isLiteral(object) ? object.value : hexJSONSubject(object));

const hexJSONDataType = (object: SomeTerm): string => {
  if (isLiteral(object)) {
    return object.datatype.value;
  }

  return isNamedNode(object)
    ? ontRdfx.ns('namedNode').value
    : ontRdfx.ns('blankNode').value;
};

export const sourceToSlice = (source: string, websiteIRI: string): string => {
  const quads = parseToGraph(source, websiteIRI, false)
    .flatMap(([_, store]) => store.quads);

  return JSON.stringify(toEmpJson(quads));
};

export const sourceToHextuples = (source: string, websiteIRI: string): string => {
  const quads = parseToGraph(source, websiteIRI, false)
    .flatMap(([subject, store]) => {
      store.add(subject, ontHttp.statusCode, rdf.literal(OK), ontLl.meta);
      store.add(rdf.namedNode(websiteIRI), ontHttp.statusCode, rdf.literal(OK), ontLl.meta);

      return store.quads;
    });

  return quads.map((q) => JSON.stringify([
    hexJSONSubject(q[QuadPosition.subject]),
    q[QuadPosition.predicate].value,
    hexJSONValue(q[QuadPosition.object]),
    hexJSONDataType(q[QuadPosition.object]),
    (q[QuadPosition.object] as Literal).language ?? '',
    q[QuadPosition.graph].value === 'rdf:defaultGraph'
      ? ontLd.add.value
      : q[QuadPosition.graph].value,
  ])).join('\n');
};

export default parseToGraph;

