/* eslint-disable unused-imports/no-unused-vars */
import '../../../useFactory';

import * as ontAs from '@ontologies/as';
import rdf, { Literal } from '@ontologies/core';
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
  seq as linkSeq,
  normalizeType,
} from 'link-lib';

import ontAppSlashless from '../../../ontology/appSlashless';
import ontEx from '../../../ontology/ex';
import ontFa4 from '../../../ontology/fa4';
import ontFhir from '../../../ontology/fhir';
import ontHttp from '../../../ontology/http';
import ontHttph from '../../../ontology/httph';
import ontHydra from '../../../ontology/hydra';
import ontLink from '../../../ontology/link';
import ontMeeting from '../../../ontology/meeting';
import ontOpengov from '../../../ontology/opengov';
import ontOrg from '../../../ontology/org';
import ontPerson from '../../../ontology/person';
import ontArgu from '../../Argu/ontology/argu';
import { createAppNS } from '../../Common/ontology/app';
import ontDbo from '../../Common/ontology/dbo';
import ontWdt from '../../Common/ontology/wdt';
import ontDatacube from '../../DataCube/ontology/datacube';
import ontDexes from '../../Dexes/ontology/dexes';
import ontElements from '../../Elements/ontology/elements';
import ontForm from '../../Form/ontology/form';
import { appendPath } from '../../Kernel/lib/id';
import ontExample from '../../Kernel/ontology/example';
import ontLd from '../../Kernel/ontology/ld';
import ontLibro from '../../Kernel/ontology/libro';
import ontLl from '../../Kernel/ontology/ll';
import ontOntola from '../../Kernel/ontology/ontola';
import ontSp from '../../Kernel/ontology/sp';
import ontSales from '../../SalesWebsite/ontology/sales';

export const evaluate = (source: string, websiteIRI: string): DataObject[] => {
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
  const datacube = ontDatacube;
  // @ts-ignore
  const sales = ontSales;
  // @ts-ignore
  const sp = ontSp;
  // @ts-ignore
  const wdt = ontWdt;

  // @ts-ignore
  const local = (s: string) => {
    if (s === '' || s.startsWith('#') || s.startsWith('/') || s.startsWith('?')) {
      return rdf.namedNode(appendPath(websiteIRI, s));
    }

    return rdf.namedNode(appendPath(websiteIRI, `/${s}`));
  };

  interface LangMap {
    en: string | DataObject,
    nl: string | DataObject
  }

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
  return normalizeType(eval(source));
};
