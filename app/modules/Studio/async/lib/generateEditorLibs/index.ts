import * as as from '@ontologies/as';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import appSlashless from '../../../../../ontology/appSlashless';
import dbo from '../../../../Common/ontology/dbo';
import fa4 from '../../../../../ontology/fa4';
import link from '../../../../../ontology/link';
import meeting from '../../../../../ontology/meeting';
import argu from '../../../../Argu/ontology/argu';
import libro from '../../../../Kernel/ontology/libro';
import ontola from '../../../../Kernel/ontology/ontola';
import elements from '../../../../Elements/ontology/elements';
import form from '../../../../Form/ontology/form';
import sales from '../../../../SalesWebsite/ontology/sales';

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
