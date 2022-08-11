import * as as from '@ontologies/as';
import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import meeting from '../../../ontology/meeting';
import opengov from '../../../ontology/opengov';
import { quadruple } from '../../Kernel/lib/quadruple';
import ontola from '../../Kernel/ontology/ontola';
import argu from '../ontology/argu';

const languages = {
  de: 'de',
  en: 'en',
  nl: 'nl',
};

export const seed: Quadruple[] = [
  quadruple(opengov.Motion, rdfx.type, rdfs.Class),
  quadruple(opengov.Motion, rdfs.label, rdf.literal('Antrag', languages.de)),
  quadruple(opengov.Motion, rdfs.label, rdf.literal('Motion', languages.en)),
  quadruple(opengov.Motion, rdfs.label, rdf.literal('Motie', languages.nl)),

  quadruple(argu.BudgetShop, rdfx.type, rdfs.Class),
  quadruple(argu.BudgetShop, rdfs.subClassOf, argu.Shop),

  quadruple(ontola['Create::Vote'], rdfx.type, rdfs.Class),
  quadruple(ontola['Create::Vote'], rdfs.subClassOf, schema.CreateAction),

  quadruple(argu.PublishActivity, rdfx.type, rdfs.Class),
  quadruple(argu.PublishActivity, rdfs.subClassOf, as.Activity),
  quadruple(argu.ForwardActivity, rdfx.type, rdfs.Class),
  quadruple(argu.ForwardActivity, rdfs.subClassOf, as.Activity),
  quadruple(argu.ConvertActivity, rdfx.type, rdfs.Class),
  quadruple(argu.ConvertActivity, rdfs.subClassOf, as.Activity),

  quadruple(meeting.Meeting, rdfx.type, rdfs.Class),
  quadruple(meeting.Meeting, rdfs.subClassOf, schema.Thing),
  quadruple(meeting.Meeting, rdfs.subClassOf, rdf.namedNode('http://purl.org/NET/c4dm/event.owl#Event')),
  quadruple(meeting.Meeting, rdfs.label, rdf.literal('Sitzung', languages.de)),
  quadruple(meeting.Meeting, rdfs.label, rdf.literal('Meeting', languages.en)),
  quadruple(meeting.Meeting, rdfs.label, rdf.literal('Vergadering', languages.nl)),
  quadruple(meeting.Meeting, schema.description, rdf.literal('Ein Sitzung ist eine Zusammenkunft, bei der Menschen Dinge diskutieren und Entscheidungen treffen.', languages.de)),
  quadruple(meeting.Meeting, schema.description, rdf.literal('A meeting is an event where people discuss things and make decisions.', languages.en)),
  quadruple(meeting.Meeting, schema.description, rdf.literal('Een vergadering is een bijeenkomst waar mensen dingen bespreken en belsuiten nemen.', languages.nl)),
  quadruple(meeting.Meeting, schema.image, rdf.namedNode('http://fontawesome.io/icon/calendar')),

  quadruple(meeting.AgendaItem, rdfx.type, rdfs.Class),
  quadruple(meeting.AgendaItem, rdfs.label, rdf.literal('Tagesordnungspunkt', languages.de)),
  quadruple(meeting.AgendaItem, rdfs.label, rdf.literal('Agenda Item', languages.en)),
  quadruple(meeting.AgendaItem, rdfs.label, rdf.literal('Agendapunt', languages.nl)),
  quadruple(meeting.AgendaItem, rdfs.subClassOf, schema.Thing),
  quadruple(meeting.AgendaItem, schema.description, rdf.literal('Ein Tagesordnungspunkt ist ein Thema, das während einer Sitzung diskutiert wird.', languages.de)),
  quadruple(meeting.AgendaItem, schema.description, rdf.literal('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
  quadruple(meeting.AgendaItem, schema.description, rdf.literal('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
  quadruple(meeting.AgendaItem, schema.image, rdf.namedNode('http://fontawesome.io/icon/list')),

  quadruple(argu.applyLink, rdfx.type, rdfx.Property),
  quadruple(argu.applyLink, rdfs.label, rdf.literal('Link', languages.de)),
  quadruple(argu.applyLink, rdfs.label, rdf.literal('Link', languages.en)),
  quadruple(argu.applyLink, rdfs.label, rdf.literal('Link', languages.nl)),

  quadruple(argu.invitee, rdfx.type, rdfx.Property),
  quadruple(argu.invitee, rdfs.label, rdf.literal('Eingeladener', languages.de)),
  quadruple(argu.invitee, rdfs.label, rdf.literal('Invitee', languages.en)),
  quadruple(argu.invitee, rdfs.label, rdf.literal('Uitgenodigde', languages.nl)),

  quadruple(argu.opened, rdfx.type, rdfx.Property),
  quadruple(argu.opened, rdfs.label, rdf.literal('Geöffnet', languages.de)),
  quadruple(argu.opened, rdfs.label, rdf.literal('Opened', languages.en)),
  quadruple(argu.opened, rdfs.label, rdf.literal('Geopend', languages.nl)),

  quadruple(ontola.redirectUrl, rdfx.type, rdfx.Property),
  quadruple(ontola.redirectUrl, rdfs.label, rdf.literal('Weiterleiten zu', languages.de)),
  quadruple(ontola.redirectUrl, rdfs.label, rdf.literal('Redirect to', languages.en)),
  quadruple(ontola.redirectUrl, rdfs.label, rdf.literal('Redirect naar', languages.nl)),

  quadruple(argu.usages, rdfx.type, rdfx.Property),
  quadruple(argu.usages, rdfs.label, rdf.literal('Gebraucht', languages.de)),
  quadruple(argu.usages, rdfs.label, rdf.literal('Used', languages.en)),
  quadruple(argu.usages, rdfs.label, rdf.literal('Gebruikt', languages.nl)),
];
