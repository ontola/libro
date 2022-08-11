import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import argu from '../../Argu/ontology/argu';
import form from '../../Form/ontology/form';
import { quadruple } from '../../Kernel/lib/quadruple';
import ontola from '../../Kernel/ontology/ontola';

const languages = {
  de: 'de',
  en: 'en',
  nl: 'nl',
};

export const seed: Quadruple[] = [

  quadruple(schema.Action, rdfx.type, rdfs.Class),
  quadruple(schema.Action, rdfs.subClassOf, schema.Thing),

  quadruple(schema.CreateAction, rdfx.type, rdfs.Class),
  quadruple(schema.CreateAction, rdfs.subClassOf, schema.Action),

  quadruple(schema.UpdateAction, rdfx.type, rdfs.Class),
  quadruple(schema.UpdateAction, rdfs.subClassOf, schema.Action),

  quadruple(argu.CustomForm, rdfx.type, rdfs.Class),
  quadruple(argu.CustomForm, rdfs.subClassOf, form.Form),

  quadruple(argu.SubmitAction, rdfx.type, rdfs.Class),
  quadruple(argu.SubmitAction, rdfs.subClassOf, schema.CreateAction),

  quadruple(ontola.destroyAction, rdfx.type, rdfx.Property),
  quadruple(ontola.destroyAction, rdfs.label, rdf.literal('Löschen', languages.de)),
  quadruple(ontola.destroyAction, rdfs.label, rdf.literal('Delete', languages.en)),
  quadruple(ontola.destroyAction, rdfs.label, rdf.literal('Verwijderen', languages.nl)),

  quadruple(ontola.publishAction, rdfx.type, rdfx.Property),
  quadruple(ontola.publishAction, rdfs.label, rdf.literal('Veröffentlichen', languages.de)),
  quadruple(ontola.publishAction, rdfs.label, rdf.literal('Publish', languages.en)),
  quadruple(ontola.publishAction, rdfs.label, rdf.literal('Publiceren', languages.nl)),

  quadruple(ontola.makePrimaryAction, rdfx.type, rdfx.Property),
  quadruple(ontola.makePrimaryAction, rdfs.label, rdf.literal('Primär machen', languages.de)),
  quadruple(ontola.makePrimaryAction, rdfs.label, rdf.literal('Make primary', languages.en)),
  quadruple(ontola.makePrimaryAction, rdfs.label, rdf.literal('Maak primair', languages.nl)),

  quadruple(ontola.sendConfirmationAction, rdfx.type, rdfx.Property),
  quadruple(ontola.sendConfirmationAction, rdfs.label, rdf.literal('Bestätigungslink', languages.de)),
  quadruple(ontola.sendConfirmationAction, rdfs.label, rdf.literal('Confirmation link', languages.en)),
  quadruple(ontola.sendConfirmationAction, rdfs.label, rdf.literal('Bevestigingslink', languages.nl)),

  quadruple(ontola.updateAction, rdfx.type, rdfx.Property),
  quadruple(ontola.updateAction, rdfs.label, rdf.literal('Bearbeiten', languages.de)),
  quadruple(ontola.updateAction, rdfs.label, rdf.literal('Edit', languages.en)),
  quadruple(ontola.updateAction, rdfs.label, rdf.literal('Bewerken', languages.nl)),
];
