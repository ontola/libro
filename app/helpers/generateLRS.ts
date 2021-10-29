import * as as from '@ontologies/as';
import rdf, { Quad } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  History,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';
import { MiddlewareFn, createStore } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { WebManifest } from '../appContext';
import { FRONTEND_ACCEPT } from '../config';
import analyticsMiddleware from '../middleware/analyticsMiddleware';
import { appMiddleware } from '../middleware/app';
import execFilter from '../middleware/execFilter';
import logging from '../middleware/logging';
import ontolaMiddleware from '../middleware/ontolaMiddleware';
import { searchMiddleware } from '../middleware/searchMiddleware';
import { appOntology, website } from '../ontology/app';
import argu from '../ontology/argu';
import form from '../ontology/form';
import link from '../ontology/link';
import ll from '../ontology/ll';
import meeting from '../ontology/meeting';
import ontola from '../ontology/ontola';
import opengov from '../ontology/opengov';
import teamGL from '../ontology/teamGL';

import arguDeltaProcessor from './arguDeltaProcessor';
import { getMetaContent } from './dom';
import { handle } from './logging';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';
import hexjson from './transformers/hexjson';
import { initializeCable, subscribeDeltaChannel } from './websockets';

export interface LRSBundle {
  history: History;
  lrs: LinkReduxLRSType;
  serviceWorkerCommunicator: ServiceWorkerCommunicator;
}

export interface GenerateLRSOpts {
  middleware?: boolean;
}

const defaultOpts = {
  middleware: __CLIENT__,
};

const basename = __CLIENT__ && !__TEST__ && window.location.pathname.startsWith('/d/studio/viewer')
  ? '/d/studio/viewer'
  : '';

const history = __CLIENT__ && !__TEST__
  ? createBrowserHistory({ basename })
  : createMemoryHistory();

export default async function generateLRS(
  manifest: WebManifest,
  initialDelta: Quad[] = [],
  options: GenerateLRSOpts = defaultOpts,
): Promise<LRSBundle> {
  const serviceWorkerCommunicator = new ServiceWorkerCommunicator();

  const middleware: Array<MiddlewareFn<any>> = options.middleware ? [
    logging(),
    ontolaMiddleware(history, serviceWorkerCommunicator),
    analyticsMiddleware(),
    appMiddleware(),
    searchMiddleware(),
    execFilter(manifest.ontola.website_iri),
  ] : [];
  const storeOptions = __CLIENT__
    ? { report: handle }
    : {
      apiOpts: { bulkEndpoint: 'http://localhost/link-lib/bulk' },
      report: handle,
    };
  const lrs = createStore<React.ComponentType<any>>(storeOptions, middleware);
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

  // Globally disable anti-jump rendering
  (lrs as any).broadcast_old = (lrs as any).broadcast;
  (lrs as any).broadcast = (_: boolean, __: number) => (lrs as any).broadcast_old(false, 0);

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

  if (__CLIENT__ && websocketPath && !localStorage.getItem('_apex_disable_ws') && options.middleware) {
    initializeCable(lrs, websocketPath).then(() => {
      subscribeDeltaChannel(lrs, 'UserChannel');
      subscribeDeltaChannel(lrs, 'RootChannel');
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

    rdf.quad(schema.CreativeWork, rdfx.type, rdfs.Class),
    rdf.quad(schema.CreativeWork, rdfs.subClassOf, schema.Thing),

    rdf.quad(schema.MediaObject, rdfx.type, rdfs.Class),
    rdf.quad(schema.MediaObject, rdfs.subClassOf, schema.CreativeWork),
    rdf.quad(schema.MediaObject, rdfs.comment, rdf.literal('A media object, such as an image, video, or audio object ')),
    rdf.quad(schema.MediaObject, rdfs.label, rdf.literal('MediaObject', languages.en)),

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
    rdf.quad(schema.WebPage, rdfs.label, rdf.literal('Page', languages.en)),
    rdf.quad(schema.WebPage, rdfs.label, rdf.literal('Pagina', languages.nl)),

    rdf.quad(schema.WebSite, rdfx.type, rdfs.Class),
    rdf.quad(schema.WebSite, rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.CustomForm, rdfx.type, rdfs.Class),
    rdf.quad(argu.CustomForm, rdfs.subClassOf, form.Form),

    rdf.quad(argu.MapQuestion, rdfx.type, rdfs.Class),
    rdf.quad(argu.MapQuestion, rdfs.subClassOf, schema.Question),

    rdf.quad(argu.BudgetShop, rdfx.type, rdfs.Class),
    rdf.quad(argu.BudgetShop, rdfs.subClassOf, argu.Shop),

    rdf.quad(argu.SubmitAction, rdfx.type, rdfs.Class),
    rdf.quad(argu.SubmitAction, rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola['Create::Auth::AccessToken'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Auth::AccessToken'], rdfs.subClassOf, schema.CreateAction),
    rdf.quad(ontola['Create::Auth::Confirmation'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Auth::Confirmation'], rdfs.subClassOf, schema.CreateAction),
    rdf.quad(ontola['Create::Auth::Password'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Auth::Password'], rdfs.subClassOf, schema.CreateAction),
    rdf.quad(ontola['Create::Auth::Session'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Auth::Session'], rdfs.subClassOf, schema.CreateAction),
    rdf.quad(ontola['Create::Auth::Unlock'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Auth::Unlock'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola['Create::User'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::User'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(ontola['Create::Vote'], rdfx.type, rdfs.Class),
    rdf.quad(ontola['Create::Vote'], rdfs.subClassOf, schema.CreateAction),

    rdf.quad(schema.UpdateAction, rdfx.type, rdfs.Class),
    rdf.quad(schema.UpdateAction, rdfs.subClassOf, schema.Action),

    rdf.quad(teamGL.ContactedAction, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.ContactedAction, rdfs.subClassOf, schema.UpdateAction),

    rdf.quad(teamGL.SignUpAction, rdfx.type, rdfs.Class),
    rdf.quad(teamGL.SignUpAction, rdfs.subClassOf, schema.UpdateAction),

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

    rdf.quad(form.CollapsibleGroup, rdfx.type, rdfs.Class),
    rdf.quad(form.CollapsibleGroup, rdfs.subClassOf, form.Group),
    rdf.quad(form.FooterGroup, rdfx.type, rdfs.Class),
    rdf.quad(form.FooterGroup, rdfs.subClassOf, form.Group),
    rdf.quad(form.HiddenGroup, rdfx.type, rdfs.Class),
    rdf.quad(form.HiddenGroup, rdfs.subClassOf, form.Group),

    rdf.quad(form.CheckboxGroup, rdfx.type, rdfs.Class),
    rdf.quad(form.CheckboxGroup, rdfs.subClassOf, form.Field),
    rdf.quad(form.CheckboxInput, rdfx.type, rdfs.Class),
    rdf.quad(form.CheckboxInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.ColorInput, rdfx.type, rdfs.Class),
    rdf.quad(form.ColorInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.DateInput, rdfx.type, rdfs.Class),
    rdf.quad(form.DateInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.DateTimeInput, rdfx.type, rdfs.Class),
    rdf.quad(form.DateTimeInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.EmailInput, rdfx.type, rdfs.Class),
    rdf.quad(form.EmailInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.FileInput, rdfx.type, rdfs.Class),
    rdf.quad(form.FileInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.LocationInput, rdfx.type, rdfs.Class),
    rdf.quad(form.LocationInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.MarkdownInput, rdfx.type, rdfs.Class),
    rdf.quad(form.MarkdownInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.NumberInput, rdfx.type, rdfs.Class),
    rdf.quad(form.NumberInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.PasswordInput, rdfx.type, rdfs.Class),
    rdf.quad(form.PasswordInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.PostalRangeInput, rdfx.type, rdfs.Class),
    rdf.quad(form.PostalRangeInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.RadioGroup, rdfx.type, rdfs.Class),
    rdf.quad(form.RadioGroup, rdfs.subClassOf, form.Field),
    rdf.quad(form.SelectInput, rdfx.type, rdfs.Class),
    rdf.quad(form.SelectInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.SliderInput, rdfx.type, rdfs.Class),
    rdf.quad(form.SliderInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.TextAreaInput, rdfx.type, rdfs.Class),
    rdf.quad(form.TextAreaInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.ToggleButtonGroup, rdfx.type, rdfs.Class),
    rdf.quad(form.ToggleButtonGroup, rdfs.subClassOf, form.Field),
    rdf.quad(form.MultipleEmailInput, rdfx.type, rdfs.Class),
    rdf.quad(form.MultipleEmailInput, rdfs.subClassOf, form.Field),
    rdf.quad(form.TextInput, rdfx.type, rdfs.Class),
    rdf.quad(form.TextInput, rdfs.subClassOf, form.Field),

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

    rdf.quad(argu.ns('RichText'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('RichText'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/a'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/a'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/h1'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/h1'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/h2'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/h2'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/h3'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/h3'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/h4'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/h4'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/h5'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/h5'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/h6'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/h6'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/innerHtml'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/innerHtml'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/li'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/li'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/ol'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/ol'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/p'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/p'), rdfs.subClassOf, schema.Thing),

    rdf.quad(argu.ns('Element/ul'), rdfx.type, rdfs.Class),
    rdf.quad(argu.ns('Element/ul'), rdfs.subClassOf, schema.Thing),

    rdf.quad(rdf.namedNode('component:Button'), rdfx.type, rdfs.Class),
    rdf.quad(rdf.namedNode('component:Button'), rdfs.subClassOf, schema.Thing),

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

    rdf.quad(ontola.publishAction, rdfx.type, rdfx.Property),
    rdf.quad(ontola.publishAction, rdfs.label, rdf.literal('Publish', languages.en)),
    rdf.quad(ontola.publishAction, rdfs.label, rdf.literal('Publiceren', languages.nl)),

    rdf.quad(argu.invitee, rdfx.type, rdfx.Property),
    rdf.quad(argu.invitee, rdfs.label, rdf.literal('Invitee', languages.en)),
    rdf.quad(argu.invitee, rdfs.label, rdf.literal('Uitgenodigde', languages.nl)),

    rdf.quad(ontola.makePrimaryAction, rdfx.type, rdfx.Property),
    rdf.quad(ontola.makePrimaryAction, rdfs.label, rdf.literal('Make primary', languages.en)),
    rdf.quad(ontola.makePrimaryAction, rdfs.label, rdf.literal('Maak primair', languages.nl)),

    rdf.quad(ontola.relevance, rdfx.type, rdfx.Property),
    rdf.quad(ontola.relevance, rdfs.label, rdf.literal('Relevance', languages.en)),
    rdf.quad(ontola.relevance, rdfs.label, rdf.literal('Relevantie', languages.nl)),

    rdf.quad(argu.opened, rdfx.type, rdfx.Property),
    rdf.quad(argu.opened, rdfs.label, rdf.literal('Opened', languages.en)),
    rdf.quad(argu.opened, rdfs.label, rdf.literal('Geopend', languages.nl)),

    rdf.quad(ontola.redirectUrl, rdfx.type, rdfx.Property),
    rdf.quad(ontola.redirectUrl, rdfs.label, rdf.literal('Redirect to', languages.en)),
    rdf.quad(ontola.redirectUrl, rdfs.label, rdf.literal('Redirect naar', languages.nl)),

    rdf.quad(ontola.sendConfirmationAction, rdfx.type, rdfx.Property),
    rdf.quad(
      ontola.sendConfirmationAction,
      rdfs.label,
      rdf.literal('Confirmation link', languages.en),
    ),
    rdf.quad(
      ontola.sendConfirmationAction,
      rdfs.label,
      rdf.literal('Bevestigingslink', languages.nl),
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
    rdf.quad(ll.loadingResource, rdfx.type, ll.LoadingResource),
  ];

  lrs.store.addQuads(ontologyData);

  if (initialDelta.length > 0) {
    await lrs.processDelta(initialDelta);
  }

  return {
    history,
    lrs,
    serviceWorkerCommunicator,
  };
}
