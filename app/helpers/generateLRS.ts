import as from '@ontologies/as';
import rdf, { Quad } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import owl from '@ontologies/owl';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, MiddlewareFn } from 'link-lib';

import { FRONTEND_ACCEPT } from '../config';
import analyticsMiddleware from '../middleware/analyticsMiddleware';
import { appMiddleware, website } from '../middleware/app';
import execFilter from '../middleware/execFilter';
import logging from '../middleware/logging';
import ontolaMiddleware from '../middleware/ontolaMiddleware';
import { appOntology } from '../ontology/app';
import argu from '../ontology/argu';
import link from '../ontology/link';
import meeting from '../ontology/meeting';
import ontola from '../ontology/ontola';
import opengov from '../ontology/opengov';
import teamGL from '../ontology/teamGL';
import arguDeltaProcessor from './arguDeltaProcessor';
import { getMetaContent } from './arguHelpers';

import { handle } from './logging';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';
import hexjson from './transformers/hexjson';
import { initializeCable, subscribeDeltaChannel } from './websockets';

export default function generateLRS() {
  const history = __CLIENT__ ? createBrowserHistory() : createMemoryHistory();
  const serviceWorkerCommunicator = new ServiceWorkerCommunicator();

  const middleware: Array<MiddlewareFn<any>> = [
    logging(),
    ontolaMiddleware(history, serviceWorkerCommunicator),
    analyticsMiddleware(),
    appMiddleware(),
    execFilter(),
  ];

  const lrs = createStore<React.ComponentType<any>>({ report: handle }, middleware);
  serviceWorkerCommunicator.linkedRenderStore = lrs;
  (lrs as any).bulkFetch = true;

  lrs.deltaProcessors.unshift(arguDeltaProcessor(lrs));

  lrs.api.registerTransformer(hexjson.transformer(lrs), hexjson.mediaTypes, hexjson.acceptValue);
  transformers(lrs).forEach((t) =>
    lrs.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue),
  );

  if (!website) {
    handle(new Error('No website in head'));
  }

// @ts-ignore TS2341
  lrs.api.accept.default = FRONTEND_ACCEPT;

  const languages = {
    en: 'en',
    nl: 'nl',
  };

  const THING_TYPES = [
    schema.Thing,
    rdfs.Resource,
    owl.Thing,
    link.Document,
  ].map((t) => rdf.id(t));

  const websocketPath = getMetaContent('websocket-path');

  if (__CLIENT__ && websocketPath) {
    initializeCable(lrs, websocketPath).then(() => {
      subscribeDeltaChannel(lrs, 'UserChannel');
    });
  }

  lrs.store.getInternalStore().newPropertyAction(rdfx.type, (q: Quad): boolean => {
    if (THING_TYPES.includes(rdf.id(q.object))) {
      return false;
    }
    lrs.schema.addQuads([rdf.quad(q.object, rdfs.subClassOf, schema.Thing)]);
    return false;
  });

// tslint:disable max-line-length
  const ontologicalClassData = [
    rdf.quad(schema.Thing, rdfs.subClassOf, rdfs.Resource),
    rdf.quad(owl.Thing, owl.sameAs, schema.Thing),

    rdf.quad(schema.Thing, rdfx.type, rdfs.Class),
    rdf.quad(schema.Thing, rdfs.comment, rdf.literal('The most generic type of item.')),
    rdf.quad(schema.Thing, rdfs.label, rdf.literal('Thing', languages.en)),
    rdf.quad(schema.Thing, ontola['forms/inputs/select/displayProp'], schema.name),

    rdf.quad(as.Collection, rdfs.subClassOf, rdfs.Resource),
    rdf.quad(ontola.Collection, rdfs.subClassOf, as.Collection),
    rdf.quad(ontola.InfiniteView, rdfs.subClassOf, as.CollectionPage),
    rdf.quad(ontola.PaginatedView, rdfs.subClassOf, as.CollectionPage),

    rdf.quad(opengov.Motion, rdfx.type, rdfs.Class),
    rdf.quad(opengov.Motion, rdfs.label, rdf.literal('Motion', languages.en)),
    rdf.quad(opengov.Motion, rdfs.label, rdf.literal('Motie', languages.nl)),

    rdf.quad(schema.ImageObject, rdfs.subClassOf, schema.MediaObject),

    rdf.quad(schema.Action, rdfx.type, rdfs.Class),
    rdf.quad(schema.Action, rdfs.subClassOf, schema.Thing),

    rdf.quad(schema.CreateAction, rdfx.type, rdfs.Class),
    rdf.quad(schema.CreateAction, rdfs.subClassOf, schema.Action),

    rdf.quad(schema.WebPage, rdfx.type, rdfs.Class),
    rdf.quad(schema.WebPage, rdfs.subClassOf, schema.Thing),

    rdf.quad(schema.WebSite, rdfx.type, rdfs.Class),
    rdf.quad(schema.WebSite, rdfs.subClassOf, schema.Thing),

    rdf.quad(ontola['Create::Users::Password'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Users::Password'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola['Create::Users::Confirmation'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Users::Confirmation'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola['Create::Users::Unlock'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Users::Unlock'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola['Create::Vote'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Vote'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola.VideoPage, rdfx.type, rdfs.Class),
    rdf.quad(ontola.VideoPage, rdfs.subClassOf, schema.WebPage),

    rdf.quad(schema.UpdateAction, rdfx.type, rdfs.Class),
    rdf.quad(schema.UpdateAction, rdfs.subClassOf, schema.Action),

    rdf.quad(teamGL.ContactedAction, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.ContactedAction, rdfs.subClassOf, schema.UpdateAction),

    rdf.quad(teamGL.NewVolunteer, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.NewVolunteer, rdfs.subClassOf, teamGL.Volunteer),

    rdf.quad(teamGL.NotAvailableAction, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.NotAvailableAction, rdfs.subClassOf, schema.UpdateAction),

    rdf.quad(teamGL.TryAgainAction, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.TryAgainAction, rdfs.subClassOf, schema.UpdateAction),

    rdf.quad(teamGL.UnsubscribeAction, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.UnsubscribeAction, rdfs.subClassOf, schema.UpdateAction),

    rdf.quad(teamGL.Participant, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.Participant, rdfs.subClassOf, teamGL.Volunteer),

    rdf.quad(teamGL.PotentialParticipant, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.PotentialParticipant, rdfs.subClassOf, teamGL.Participant),

    rdf.quad(meeting.Meeting, rdfx.type, rdfs.Class),
    rdf.quad(meeting.Meeting, rdfs.subClassOf, schema.Thing),
    rdf.quad(meeting.Meeting, rdfs.subClassOf, rdf.namedNode('http://purl.org/NET/c4dm/event.owl#Event')),
    rdf.quad(meeting.Meeting, rdfs.label, rdf.literal('Meeting', languages.en)),
    rdf.quad(meeting.Meeting, rdfs.label, rdf.literal('Vergadering', languages.nl)),
    rdf.quad(meeting.Meeting, schema.description, rdf.literal('A meeting is an event where people discuss things and make decisions.', languages.en)),
    rdf.quad(meeting.Meeting, schema.description, rdf.literal('Een vergadering is een bijeenkomst waar mensen dingen bespreken en belsuiten nemen.', languages.nl)),
    rdf.quad(meeting.Meeting, schema.image, rdf.namedNode('http://fontawesome.io/icon/calendar')),

    rdf.quad(meeting.AgendaItem, rdfx.type, rdfs.Class),
    rdf.quad(meeting.AgendaItem, rdfs.label, rdf.literal('Agenda Item', languages.en)),
    rdf.quad(meeting.AgendaItem, rdfs.label, rdf.literal('Agendapunt', languages.nl)),
    rdf.quad(meeting.AgendaItem, rdfs.subClassOf, schema.Thing),
    rdf.quad(meeting.AgendaItem, schema.description, rdf.literal('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
    rdf.quad(meeting.AgendaItem, schema.description, rdf.literal('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
    rdf.quad(meeting.AgendaItem, schema.image, rdf.namedNode('http://fontawesome.io/icon/list')),

    rdf.quad(ontola.MenuItem, rdfx.type, rdfs.Class),
    rdf.quad(ontola.MenuItem, rdfs.subClassOf, schema.Thing),

    rdf.quad(as.Create, rdfx.type, rdfs.Class),
    rdf.quad(as.Create, rdfs.subClassOf, as.Activity),
    rdf.quad(as.Update, rdfx.type, rdfs.Class),
    rdf.quad(as.Update, rdfs.subClassOf, as.Activity),
    rdf.quad(as.Delete, rdfx.type, rdfs.Class),
    rdf.quad(as.Delete, rdfs.subClassOf, as.Activity),
    rdf.quad(as.Remove, rdfx.type, rdfs.Class),
    rdf.quad(as.Remove, rdfs.subClassOf, as.Activity),
    rdf.quad(as.Accept, rdfx.type, rdfs.Class),
    rdf.quad(as.Accept, rdfs.subClassOf, as.Activity),
    rdf.quad(as.Reject, rdfx.type, rdfs.Class),
    rdf.quad(as.Reject, rdfs.subClassOf, as.Activity),
    rdf.quad(as.Add, rdfx.type, rdfs.Class),
    rdf.quad(as.Add, rdfs.subClassOf, as.Activity),
    rdf.quad(argu.PublishActivity, rdfx.type, rdfs.Class),
    rdf.quad(argu.PublishActivity, rdfs.subClassOf, as.Activity),
    rdf.quad(argu.ForwardActivity, rdfx.type, rdfs.Class),
    rdf.quad(argu.ForwardActivity, rdfs.subClassOf, as.Activity),
    rdf.quad(argu.ConvertActivity, rdfx.type, rdfs.Class),
    rdf.quad(argu.ConvertActivity, rdfs.subClassOf, as.Activity),
  ];
// tslint:enable max-line-length

  lrs.addOntologySchematics(ontologicalClassData);
  lrs.store.addQuads(ontologicalClassData);

  const ontologicalPropertyData = [
    rdf.quad(foaf.name, owl.sameAs, schema.name),
    rdf.quad(schema.name, rdfx.type, rdfx.Property),

    rdf.quad(argu.applyLink, rdfx.type, rdfx.Property),
    rdf.quad(argu.applyLink, rdfs.label, rdf.literal('Link', languages.en)),
    rdf.quad(argu.applyLink, rdfs.label, rdf.literal('Link', languages.nl)),

    rdf.quad(ontola.destroyAction, rdfx.type, rdfx.Property),
    rdf.quad(ontola.destroyAction, rdfs.label, rdf.literal('Delete', languages.en)),
    rdf.quad(ontola.destroyAction, rdfs.label, rdf.literal('Verwijderen', languages.nl)),

    rdf.quad(argu.invitee, rdfx.type, rdfx.Property),
    rdf.quad(argu.invitee, rdfs.label, rdf.literal('Invitee', languages.en)),
    rdf.quad(argu.invitee, rdfs.label, rdf.literal('Uitgenodigde', languages.nl)),

    rdf.quad(ontola.makePrimaryAction, rdfx.type, rdfx.Property),
    rdf.quad(ontola.makePrimaryAction, rdfs.label, rdf.literal('Make primary', languages.en)),
    rdf.quad(ontola.makePrimaryAction, rdfs.label, rdf.literal('Maak primair', languages.nl)),

    rdf.quad(argu.opened, rdfx.type, rdfx.Property),
    rdf.quad(argu.opened, rdfs.label, rdf.literal('Opened', languages.en)),
    rdf.quad(argu.opened, rdfs.label, rdf.literal('Geopend', languages.nl)),

    rdf.quad(argu.redirectUrl, rdfx.type, rdfx.Property),
    rdf.quad(argu.redirectUrl, rdfs.label, rdf.literal('Redirect to', languages.en)),
    rdf.quad(argu.redirectUrl, rdfs.label, rdf.literal('Redirect naar', languages.nl)),

    rdf.quad(ontola.hiddenGroup, rdfx.type, sh.PropertyGroup),

    rdf.quad(ontola.sendConfirmationAction, rdfx.type, rdfx.Property),
    rdf.quad(
        ontola.sendConfirmationAction,
        rdfs.label,
        rdf.literal('Send confirmation', languages.en),
    ),
    rdf.quad(
        ontola.sendConfirmationAction,
        rdfs.label,
        rdf.literal('Verstuur bevestiging', languages.nl),
    ),

    rdf.quad(ontola.updateAction, rdfx.type, rdfx.Property),
    rdf.quad(ontola.updateAction, rdfs.label, rdf.literal('Edit', languages.en)),
    rdf.quad(ontola.updateAction, rdfs.label, rdf.literal('Bewerken', languages.nl)),

    rdf.quad(argu.usages, rdfx.type, rdfx.Property),
    rdf.quad(argu.usages, rdfs.label, rdf.literal('Used', languages.en)),
    rdf.quad(argu.usages, rdfs.label, rdf.literal('Gebruikt', languages.nl)),
  ];

  lrs.addOntologySchematics(ontologicalPropertyData);
  lrs.store.addQuads(ontologicalPropertyData);

  const ontologyData = [
    ...appOntology,
  ];

  lrs.store.addQuads(ontologyData);

  return {
    history,
    lrs,
    serviceWorkerCommunicator,
  };
}
