import * as ontAs from '@ontologies/as';
import { NamedNode, Namespace } from '@ontologies/core';
import * as ontDcterms from '@ontologies/dcterms';
import * as ontFoaf from '@ontologies/foaf';
import * as ontOwl from '@ontologies/owl';
import * as ontRdfx from '@ontologies/rdf';
import * as ontRdfs from '@ontologies/rdfs';
import * as ontSchema from '@ontologies/schema';
import * as ontShacl from '@ontologies/shacl';
import * as ontXsd from '@ontologies/xsd';

import ontAppSlashless from '../../../../ontology/appSlashless';
import ontDbo from '../../../Common/ontology/dbo';
import ontEx from '../../../../ontology/ex';
import ontFa4 from '../../../../ontology/fa4';
import ontFhir from '../../../../ontology/fhir';
import ontHttp from '../../../../ontology/http';
import ontHttph from '../../../../ontology/httph';
import ontHydra from '../../../../ontology/hydra';
import ontLd from '../../../Kernel/ontology/ld';
import ontLink from '../../../../ontology/link';
import ontMeeting from '../../../../ontology/meeting';
import ontOpengov from '../../../../ontology/opengov';
import ontOrg from '../../../../ontology/org';
import ontPerson from '../../../../ontology/person';
import ontQb from '../../../../ontology/qb';
import ontSp from '../../../Kernel/ontology/sp';
import ontWdt from '../../../Common/ontology/wdt';
import ontArgu from '../../../Argu/ontology/argu';
import { createAppNS } from '../../../Common/ontology/app';
import ontExample from '../../../Kernel/ontology/example';
import ontLibro from '../../../Kernel/ontology/libro';
import ontLl from '../../../Kernel/ontology/ll';
import ontOntola from '../../../Kernel/ontology/ontola';
import ontDexes from '../../../Dexes/ontology/dexes';
import ontElements from '../../../Elements/ontology/elements';
import ontForm from '../../../Form/ontology/form';
import ontTeamGL from '../../../GroenLinks/ontology/teamGL';
import ontSales from '../../../SalesWebsite/ontology/sales';

import { quote } from './serialization';
import { NodeProperty, NodeType } from './types';

type Test = { ns: Namespace };
type ExplicitNamespaceMap = Test & Exclude<Test, Record<string, NamedNode>>;

type ShortMap = Record<string, { map: ExplicitNamespaceMap, prefix: string }>;

const staticMap: ShortMap = {
  appSlashless: {
    map: ontAppSlashless as ExplicitNamespaceMap,
    prefix: ontAppSlashless.ns('').value,
  },
  argu: {
    map: ontArgu as ExplicitNamespaceMap,
    prefix: ontArgu.ns('').value,
  },
  as: {
    map: ontAs as ExplicitNamespaceMap,
    prefix: ontAs.ns('').value,
  },
  dbo: {
    map: ontDbo as ExplicitNamespaceMap,
    prefix: ontDbo.ns('').value,
  },
  dcterms: {
    map: ontDcterms as ExplicitNamespaceMap,
    prefix: ontDcterms.ns('').value,
  },
  dexes: {
    map: ontDexes as ExplicitNamespaceMap,
    prefix: ontDexes.ns('').value,
  },
  elements: {
    map: ontElements as ExplicitNamespaceMap,
    prefix: ontElements.ns('').value,
  },
  ex: {
    map: ontEx as ExplicitNamespaceMap,
    prefix: ontEx.ns('').value,
  },
  example: {
    map: ontExample as ExplicitNamespaceMap,
    prefix: ontExample.ns('').value,
  },
  fa4: {
    map: ontFa4 as ExplicitNamespaceMap,
    prefix: ontFa4.ns('').value,
  },
  fhir: {
    map: ontFhir as ExplicitNamespaceMap,
    prefix: ontFhir.ns('').value,
  },
  foaf: {
    map: ontFoaf as ExplicitNamespaceMap,
    prefix: ontFoaf.ns('').value,
  },
  form: {
    map: ontForm as ExplicitNamespaceMap,
    prefix: ontForm.ns('').value,
  },
  http: {
    map: ontHttp as ExplicitNamespaceMap,
    prefix: ontHttp.ns('').value,
  },
  httph: {
    map: ontHttph as ExplicitNamespaceMap,
    prefix: ontHttph.ns('').value,
  },
  hydra: {
    map: ontHydra as ExplicitNamespaceMap,
    prefix: ontHydra.ns('').value,
  },
  ld: {
    map: ontLd as ExplicitNamespaceMap,
    prefix: ontLd.ns('').value,
  },
  libro: {
    map: ontLibro as ExplicitNamespaceMap,
    prefix: ontLibro.ns('').value,
  },
  link: {
    map: ontLink as ExplicitNamespaceMap,
    prefix: ontLink.ns('').value,
  },
  ll: {
    map: ontLl as ExplicitNamespaceMap,
    prefix: ontLl.ns('').value,
  },
  meeting: {
    map: ontMeeting as ExplicitNamespaceMap,
    prefix: ontMeeting.ns('').value,
  },
  ontola: {
    map: ontOntola as ExplicitNamespaceMap,
    prefix: ontOntola.ns('').value,
  },
  opengov: {
    map: ontOpengov as ExplicitNamespaceMap,
    prefix: ontOpengov.ns('').value,
  },
  org: {
    map: ontOrg as ExplicitNamespaceMap,
    prefix: ontOrg.ns('').value,
  },
  owl: {
    map: ontOwl as ExplicitNamespaceMap,
    prefix: ontOwl.ns('').value,
  },
  person: {
    map: ontPerson as ExplicitNamespaceMap,
    prefix: ontPerson.ns('').value,
  },
  qb: {
    map: ontQb as ExplicitNamespaceMap,
    prefix: ontQb.ns('').value,
  },
  rdfs: {
    map: ontRdfs as ExplicitNamespaceMap,
    prefix: ontRdfs.ns('').value,
  },
  rdfx: {
    map: ontRdfx as ExplicitNamespaceMap,
    prefix: ontRdfx.ns('').value,
  },
  sales: {
    map: ontSales as ExplicitNamespaceMap,
    prefix: ontSales.ns('').value,
  },
  schema: {
    map: ontSchema as ExplicitNamespaceMap,
    prefix: ontSchema.ns('').value,
  },
  shacl: {
    map: ontShacl as ExplicitNamespaceMap,
    prefix: ontShacl.ns('').value,
  },
  sp: {
    map: ontSp as ExplicitNamespaceMap,
    prefix: ontSp.ns('').value,
  },
  teamGL: {
    map: ontTeamGL as ExplicitNamespaceMap,
    prefix: ontTeamGL.ns('').value,
  },
  wdt: {
    map: ontWdt as ExplicitNamespaceMap,
    prefix: ontWdt.ns('').value,
  },
  xsd: {
    map: ontXsd as ExplicitNamespaceMap,
    prefix: ontXsd.ns('').value,
  },
};

const createShortMap = (websiteIRI: string): ShortMap => {
  const ontApp = createAppNS(websiteIRI);

  return {
    app: {
      map: ontApp as ExplicitNamespaceMap,
      prefix: ontApp.ns('').value,
    },
    ...staticMap,
  };
};

const jsSymbolMatcher = /^([_$a-zA-Z])[_$a-zA-Z0-9]*$/;

const validJSSymbol = (value: string): boolean => jsSymbolMatcher.test(value);

const memoizedMap = {
  key: '',
  value: staticMap,
};

const shortmapFor = (websiteIRI: string): ShortMap => {
  if (memoizedMap.key === websiteIRI) {
    return memoizedMap.value;
  }

  return createShortMap(websiteIRI);
};

export const shortenGlobalId = (iri: string, websiteIRI: string): NodeProperty => {
  const shortMap = shortmapFor(websiteIRI);
  const shortMapEntries = Object.entries(shortMap);

  if (websiteIRI && iri.startsWith(websiteIRI)) {
    const value = iri.split(websiteIRI).pop() ?? '';

    return {
      type: NodeType.LocalPath,
      value: value.slice(value.startsWith('/') ? 1 : 0),
    };
  }

  if (iri.startsWith('/') || iri.startsWith('#')) {
    return {
      type: NodeType.LocalPath,
      value: iri,
    };
  }

  for (const [k, { map, prefix }] of shortMapEntries) {
    if (iri.startsWith(prefix)) {
      const term = iri.split(prefix).pop();

      if (term === undefined) {
        return {
          type: NodeType.StringValue,
          value: iri,
        };
      }

      if (!Object.prototype.hasOwnProperty.call(map, term)) {
        return {
          type: NodeType.Shorthand,
          value: `${k}.ns(${quote(term)})`,
        };
      }

      if (!validJSSymbol(term)) {
        return {
          type: NodeType.Shorthand,
          value: `${k}[${quote(term)}]`,
        };
      }

      return {
        type: NodeType.Shorthand,
        value: `${k}.${term}`,
      };
    }
  }

  return {
    type: NodeType.StringValue,
    value: iri,
  };
};
