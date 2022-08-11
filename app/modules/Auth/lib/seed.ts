import { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import { quadruple } from '../../Kernel/lib/quadruple';
import ontola from '../../Kernel/ontology/ontola';

export const seed: Quadruple[] = [
  quadruple(ontola['Create::Auth::AccessToken'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::Auth::AccessToken'], rdfs.subClassOf, schema.CreateAction),
  quadruple(ontola['Create::Auth::Confirmation'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::Auth::Confirmation'], rdfs.subClassOf, schema.CreateAction),
  quadruple(ontola['Create::Auth::Password'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::Auth::Password'], rdfs.subClassOf, schema.CreateAction),
  quadruple(ontola['Create::Auth::Session'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::Auth::Session'], rdfs.subClassOf, schema.CreateAction),
  quadruple(ontola['Create::Auth::Unlock'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::Auth::Unlock'], rdfs.subClassOf, schema.CreateAction),

  quadruple(ontola['Create::User'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::User'], rdfs.subClassOf, schema.CreateAction),
];
