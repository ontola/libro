/* eslint-disable @typescript-eslint/no-unused-vars */
import * as ontAs from '@ontologies/as';
import rdf, { isTerm } from '@ontologies/core';
import * as ontDcterms from '@ontologies/dcterms';
import * as ontFoaf from '@ontologies/foaf';
import * as ontOwl from '@ontologies/owl';
import * as ontRdfx from '@ontologies/rdf';
import * as ontRdfs from '@ontologies/rdfs';
import * as ontSchema from '@ontologies/schema';
import * as ontShacl from '@ontologies/shacl';
import * as ontXsd from '@ontologies/xsd';
import {
  DataObject,
  SerializableDataTypes,
  normalizeType,
  toGraph,
} from 'link-lib';
import { ParsedObject } from 'link-lib/dist-types/types';

import ontApp from '../../ontology/app';
import ontAppSlashless from '../../ontology/appSlashless';
import ontArgu from '../../ontology/argu';
import ontDbo from '../../ontology/dbo';
import ontDexes from '../../ontology/dexes';
import ontEx from '../../ontology/ex';
import ontExample from '../../ontology/example';
import ontFa4 from '../../ontology/fa4';
import ontFhir from '../../ontology/fhir';
import ontForm from '../../ontology/form';
import ontHttp from '../../ontology/http';
import ontHttph from '../../ontology/httph';
import ontHydra from '../../ontology/hydra';
import ontLd from '../../ontology/ld';
import ontLibro from '../../ontology/libro';
import ontLink from '../../ontology/link';
import ontLl from '../../ontology/ll';
import ontMeeting from '../../ontology/meeting';
import ontOntola from '../../ontology/ontola';
import ontOpengov from '../../ontology/opengov';
import ontOrg from '../../ontology/org';
import ontPerson from '../../ontology/person';
import ontQb from '../../ontology/qb';
import ontRivm from '../../ontology/rivm';
import ontSales from '../../ontology/sales';
import ontSp from '../../ontology/sp';
import ontTeamGL from '../../ontology/teamGL';
import ontWdt from '../../ontology/wdt';

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

  const seed: DataObject = { '@id': (obj as any)['@id'] ?? rdf.blankNode(path) };

  return Object.entries(obj)
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: nameIdempotently(v, `${path}.${k}`),
      }),
      seed,
    ) as T;
};

const parseToGraph = (source: string): ParsedObject[] => {
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
  const app = ontApp;
  // @ts-ignore
  const appSlashless = ontAppSlashless;
  // @ts-ignore
  const argu = ontArgu;
  // @ts-ignore
  const dbo = ontDbo;
  // @ts-ignore
  const dexes = ontDexes;
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
  const rivm = ontRivm;
  // @ts-ignore
  const sales = ontSales;
  // @ts-ignore
  const sp = ontSp;
  // @ts-ignore
  const teamGL = ontTeamGL;
  // @ts-ignore
  const wdt = ontWdt;

  // @ts-ignore
  const local = (s: string) => rdf.namedNode(`${window.location.origin}/${s}`);
  // @ts-ignore
  const url = (s: string) => rdf.namedNode(s);
  // @ts-ignore
  const date = (s: string) => rdf.literal(new Date(s));

  // tslint:disable-next-line:no-eval
  const data = eval(source);

  return normalizeType(data)
    .map((obj) => nameIdempotently(obj, (obj['@id'] as string) ?? rdf.blankNode().value))
    .map((t) => toGraph(t));
};

export default parseToGraph;
