import * as schema from '@ontologies/schema';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as as from '@ontologies/as';

import sales from '../../../../../ontology/sales';
import ontola from '../../../../../ontology/ontola';
import argu from '../../../../../ontology/argu';
import elements from '../../../../../ontology/elements';
import dbo from '../../../../../ontology/dbo';
import fa4 from '../../../../../ontology/fa4';
import appSlashless from '../../../../../ontology/appSlashless';
import form from '../../../../../ontology/form';
import libro from '../../../../../ontology/libro';
import link from '../../../../../ontology/link';
import meeting from '../../../../../ontology/meeting';

import { OntologyMap, generateOntologyDeclerations } from './generateOntologyDeclerations';

const extraLibs = [
  'declare type NamedNode = string;',
  'declare function seq<T = any>(arr: T[], id?: string | undefined): Object;',
];

export const generateEditorLibs = (): string => {
  const onts: OntologyMap = [
    [ontola, 'ontola'],
    [sales, 'sales'],
    [argu, 'argu'],
    [elements, 'elements'],
    [dbo, 'dbo'],
    [rdfx, 'rdfx'],
    [rdfs, 'rdfs'],
    [schema, 'schema'],
    [fa4, 'fa4'],
    [appSlashless, 'appSlashless'],
    [form, 'form'],
    [libro, 'libro'],
    [link, 'link'],
    [meeting, 'meeting'],
    [as, 'as'],
  ];

  const declarations = [
    ...extraLibs,
  ].flat().join('\n');

  return `${declarations}\n${generateOntologyDeclerations(onts)}`;
};
