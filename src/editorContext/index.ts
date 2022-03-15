import * as ontAs from '@ontologies/as';
import ontologiesCore from '@ontologies/core';
import * as ontDcterms from '@ontologies/dcterms';
import * as ontFoaf from '@ontologies/foaf';
import * as ontOwl from '@ontologies/owl';
import * as ontRdfx from '@ontologies/rdf';
import * as ontRdfs from '@ontologies/rdfs';
import * as ontSchema from '@ontologies/schema';
import * as ontShacl from '@ontologies/shacl';
import * as ontXsd from '@ontologies/xsd';

import ontApp from '../../app/ontology/app';
import ontAppSlashless from '../../app/ontology/appSlashless';
import ontArgu from '../../app/ontology/argu';
import ontDbo from '../../app/ontology/dbo';
import ontDexes from '../../app/ontology/dexes';
import ontEx from '../../app/ontology/ex';
import ontExample from '../../app/ontology/example';
import ontFa4 from '../../app/ontology/fa4';
import ontFhir from '../../app/ontology/fhir';
import ontForm from '../../app/ontology/form';
import ontHttp from '../../app/ontology/http';
import ontHttph from '../../app/ontology/httph';
import ontHydra from '../../app/ontology/hydra';
import ontLd from '../../app/ontology/ld';
import ontLibro from '../../app/ontology/libro';
import ontLink from '../../app/ontology/link';
import ontLl from '../../app/ontology/ll';
import ontMeeting from '../../app/ontology/meeting';
import ontOntola from '../../app/ontology/ontola';
import ontOpengov from '../../app/ontology/opengov';
import ontOrg from '../../app/ontology/org';
import ontPerson from '../../app/ontology/person';
import ontQb from '../../app/ontology/qb';
import ontRivm from '../../app/ontology/rivm';
import ontSp from '../../app/ontology/sp';
import ontTeamGL from '../../app/ontology/teamGL';
import ontWdt from '../../app/ontology/wdt';

/* eslint-disable unused-imports/no-unused-vars */

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
const sp = ontSp;
// @ts-ignore
const teamGL = ontTeamGL;
// @ts-ignore
const wdt = ontWdt;

// @ts-ignore
const local = (s: string) => {
  if (s === '' || s.startsWith('#') || s.startsWith('/') || s.startsWith('?')) {
    return ontologiesCore.namedNode(`${window.location.origin}${s}`);
  }

  return ontologiesCore.namedNode(`${window.location.origin}/${s}`);
};

// @ts-ignore
const url = (s: string) => ontologiesCore.namedNode(s);
// @ts-ignore
const date = (s: string) => ontologiesCore.literal(new Date(s));

// @ts-ignore
const rdf = ontologiesCore;

/* eslint-enable unused-imports/no-unused-vars */
