import * as as from '@ontologies/as';
import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  History,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';
import {
  DataRecord,
  LinkedRenderStoreOptions,
  MiddlewareFn,
  createStore,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

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
import ll from '../ontology/ll';
import meeting from '../ontology/meeting';
import ontola from '../ontology/ontola';
import opengov from '../ontology/opengov';
import teamGL from '../ontology/teamGL';
import { WebManifest } from '../WebManifest';

import arguDeltaProcessor from './arguDeltaProcessor';
import { getMetaContent } from './dom';
import { handle } from './logging';
import { quadruple } from './quadruple';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';
import hexjson from './transformers/hexjson';
import empndjson from './transformers/empndjson';
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
  initialData: Record<string, DataRecord> = {},
  mapping: Record<string, string>,
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
  const storeOptions: LinkedRenderStoreOptions<React.ComponentType> = {
    data: initialData,
    report: handle,
  };

  if (!__CLIENT__) {
    storeOptions.apiOpts = { bulkEndpoint: 'http://localhost/link-lib/bulk' };
  }

  const lrs = createStore<React.ComponentType>(storeOptions, middleware);
  serviceWorkerCommunicator.linkedRenderStore = lrs;
  (lrs as any).bulkFetch = true;

  lrs.deltaProcessors.unshift(arguDeltaProcessor(lrs));

  lrs.api.registerTransformer(empndjson.transformer(lrs, manifest.ontola.website_iri, mapping), empndjson.mediaTypes, empndjson.acceptValue);
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
    de: 'de',
    en: 'en',
    nl: 'nl',
  };

  const websocketPath = !__TEST__ && getMetaContent('websocket-path');

  if (__CLIENT__ && websocketPath && !localStorage.getItem('_apex_disable_ws') && options.middleware) {
    initializeCable(lrs, websocketPath).then(() => {
      subscribeDeltaChannel(lrs, 'UserChannel');
      subscribeDeltaChannel(lrs, 'RootChannel');
    });
  }

  // tslint:disable max-line-length
  const ontologicalClassData: Quadruple[] = [
    quadruple(schema.Thing, rdfs.subClassOf, rdfs.Resource),

    quadruple(schema.Thing, rdfx.type, rdfs.Class),
    quadruple(schema.Thing, rdfs.comment, rdf.literal('The most generic type of item.')),
    quadruple(schema.Thing, rdfs.label, rdf.literal('Thing', languages.en)),
    quadruple(schema.Thing, ontola['forms/inputs/select/displayProp'], schema.name),

    quadruple(schema.CreativeWork, rdfx.type, rdfs.Class),
    quadruple(schema.CreativeWork, rdfs.subClassOf, schema.Thing),

    quadruple(schema.MediaObject, rdfx.type, rdfs.Class),
    quadruple(schema.MediaObject, rdfs.subClassOf, schema.CreativeWork),
    quadruple(schema.MediaObject, rdfs.comment, rdf.literal('A media object, such as an image, video, or audio object ')),
    quadruple(schema.MediaObject, rdfs.label, rdf.literal('MediaObject', languages.en)),

    quadruple(as.Collection, rdfs.subClassOf, rdfs.Resource),
    quadruple(ontola.Collection, rdfs.subClassOf, as.Collection),
    quadruple(ontola.InfiniteView, rdfs.subClassOf, as.CollectionPage),
    quadruple(ontola.PaginatedView, rdfs.subClassOf, as.CollectionPage),

    quadruple(opengov.Motion, rdfx.type, rdfs.Class),
    quadruple(opengov.Motion, rdfs.label, rdf.literal('Antrag', languages.de)),
    quadruple(opengov.Motion, rdfs.label, rdf.literal('Motion', languages.en)),
    quadruple(opengov.Motion, rdfs.label, rdf.literal('Motie', languages.nl)),

    quadruple(schema.ImageObject, rdfs.subClassOf, schema.MediaObject),

    quadruple(schema.Action, rdfx.type, rdfs.Class),
    quadruple(schema.Action, rdfs.subClassOf, schema.Thing),

    quadruple(schema.CreateAction, rdfx.type, rdfs.Class),
    quadruple(schema.CreateAction, rdfs.subClassOf, schema.Action),

    quadruple(schema.VideoObject, rdfx.type, rdfs.Class),
    quadruple(schema.VideoObject, rdfs.subClassOf, schema.MediaObject),

    quadruple(schema.WebPage, rdfx.type, rdfs.Class),
    quadruple(schema.WebPage, rdfs.subClassOf, schema.Thing),
    quadruple(schema.WebPage, rdfs.label, rdf.literal('Seite', languages.de)),
    quadruple(schema.WebPage, rdfs.label, rdf.literal('Page', languages.en)),
    quadruple(schema.WebPage, rdfs.label, rdf.literal('Pagina', languages.nl)),

    quadruple(schema.WebSite, rdfx.type, rdfs.Class),
    quadruple(schema.WebSite, rdfs.subClassOf, schema.Thing),

    quadruple(argu.CustomForm, rdfx.type, rdfs.Class),
    quadruple(argu.CustomForm, rdfs.subClassOf, form.Form),

    quadruple(argu.BudgetShop, rdfx.type, rdfs.Class),
    quadruple(argu.BudgetShop, rdfs.subClassOf, argu.Shop),

    quadruple(argu.SubmitAction, rdfx.type, rdfs.Class),
    quadruple(argu.SubmitAction, rdfs.subClassOf, schema.CreateAction),

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

    quadruple(ontola['Create::Vote'], rdfx.type, rdfs.Class),
    quadruple(ontola['Create::Vote'], rdfs.subClassOf, schema.CreateAction),

    quadruple(schema.UpdateAction, rdfx.type, rdfs.Class),
    quadruple(schema.UpdateAction, rdfs.subClassOf, schema.Action),

    quadruple(teamGL.ContactedAction, rdfx.type, rdfs.Class),
    quadruple(teamGL.ContactedAction, rdfs.subClassOf, schema.UpdateAction),

    quadruple(teamGL.SignUpAction, rdfx.type, rdfs.Class),
    quadruple(teamGL.SignUpAction, rdfs.subClassOf, schema.UpdateAction),

    quadruple(teamGL.NewVolunteer, rdfx.type, rdfs.Class),
    quadruple(teamGL.NewVolunteer, rdfs.subClassOf, teamGL.Volunteer),

    quadruple(teamGL.NotAvailableAction, rdfx.type, rdfs.Class),
    quadruple(teamGL.NotAvailableAction, rdfs.subClassOf, schema.UpdateAction),

    quadruple(teamGL.TryAgainAction, rdfx.type, rdfs.Class),
    quadruple(teamGL.TryAgainAction, rdfs.subClassOf, schema.UpdateAction),

    quadruple(teamGL.UnsubscribeAction, rdfx.type, rdfs.Class),
    quadruple(teamGL.UnsubscribeAction, rdfs.subClassOf, schema.UpdateAction),

    quadruple(teamGL.Participant, rdfx.type, rdfs.Class),
    quadruple(teamGL.Participant, rdfs.subClassOf, teamGL.Volunteer),

    quadruple(teamGL.PotentialParticipant, rdfx.type, rdfs.Class),
    quadruple(teamGL.PotentialParticipant, rdfs.subClassOf, teamGL.Participant),

    quadruple(form.CollapsibleGroup, rdfx.type, rdfs.Class),
    quadruple(form.CollapsibleGroup, rdfs.subClassOf, form.Group),
    quadruple(form.FooterGroup, rdfx.type, rdfs.Class),
    quadruple(form.FooterGroup, rdfs.subClassOf, form.Group),
    quadruple(form.HiddenGroup, rdfx.type, rdfs.Class),
    quadruple(form.HiddenGroup, rdfs.subClassOf, form.Group),

    quadruple(form.CheckboxGroup, rdfx.type, rdfs.Class),
    quadruple(form.CheckboxGroup, rdfs.subClassOf, form.Field),
    quadruple(form.CheckboxInput, rdfx.type, rdfs.Class),
    quadruple(form.CheckboxInput, rdfs.subClassOf, form.Field),
    quadruple(form.ColorInput, rdfx.type, rdfs.Class),
    quadruple(form.ColorInput, rdfs.subClassOf, form.Field),
    quadruple(form.DateInput, rdfx.type, rdfs.Class),
    quadruple(form.DateInput, rdfs.subClassOf, form.Field),
    quadruple(form.DateTimeInput, rdfx.type, rdfs.Class),
    quadruple(form.DateTimeInput, rdfs.subClassOf, form.Field),
    quadruple(form.EmailInput, rdfx.type, rdfs.Class),
    quadruple(form.EmailInput, rdfs.subClassOf, form.Field),
    quadruple(form.FileInput, rdfx.type, rdfs.Class),
    quadruple(form.FileInput, rdfs.subClassOf, form.Field),
    quadruple(form.LocationInput, rdfx.type, rdfs.Class),
    quadruple(form.LocationInput, rdfs.subClassOf, form.Field),
    quadruple(form.MarkdownInput, rdfx.type, rdfs.Class),
    quadruple(form.MarkdownInput, rdfs.subClassOf, form.Field),
    quadruple(form.NumberInput, rdfx.type, rdfs.Class),
    quadruple(form.NumberInput, rdfs.subClassOf, form.Field),
    quadruple(form.PasswordInput, rdfx.type, rdfs.Class),
    quadruple(form.PasswordInput, rdfs.subClassOf, form.Field),
    quadruple(form.PostalRangeInput, rdfx.type, rdfs.Class),
    quadruple(form.PostalRangeInput, rdfs.subClassOf, form.Field),
    quadruple(form.RadioGroup, rdfx.type, rdfs.Class),
    quadruple(form.RadioGroup, rdfs.subClassOf, form.Field),
    quadruple(form.SelectInput, rdfx.type, rdfs.Class),
    quadruple(form.SelectInput, rdfs.subClassOf, form.Field),
    quadruple(form.SliderInput, rdfx.type, rdfs.Class),
    quadruple(form.SliderInput, rdfs.subClassOf, form.Field),
    quadruple(form.TextAreaInput, rdfx.type, rdfs.Class),
    quadruple(form.TextAreaInput, rdfs.subClassOf, form.Field),
    quadruple(form.ToggleButtonGroup, rdfx.type, rdfs.Class),
    quadruple(form.ToggleButtonGroup, rdfs.subClassOf, form.Field),
    quadruple(form.MultipleEmailInput, rdfx.type, rdfs.Class),
    quadruple(form.MultipleEmailInput, rdfs.subClassOf, form.Field),
    quadruple(form.TextInput, rdfx.type, rdfs.Class),
    quadruple(form.TextInput, rdfs.subClassOf, form.Field),
    quadruple(form.SwipeInput, rdfx.type, rdfs.Class),
    quadruple(form.SwipeInput, rdfs.subClassOf, form.Field),

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

    quadruple(ontola.MenuItem, rdfx.type, rdfs.Class),
    quadruple(ontola.MenuItem, rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('RichText'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('RichText'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/a'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/a'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/h1'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/h1'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/h2'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/h2'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/h3'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/h3'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/h4'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/h4'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/h5'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/h5'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/h6'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/h6'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/innerHtml'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/innerHtml'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/li'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/li'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/ol'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/ol'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/p'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/p'), rdfs.subClassOf, schema.Thing),

    quadruple(argu.ns('Element/ul'), rdfx.type, rdfs.Class),
    quadruple(argu.ns('Element/ul'), rdfs.subClassOf, schema.Thing),

    quadruple(rdf.namedNode('component:Button'), rdfx.type, rdfs.Class),
    quadruple(rdf.namedNode('component:Button'), rdfs.subClassOf, schema.Thing),

    quadruple(as.Create, rdfx.type, rdfs.Class),
    quadruple(as.Create, rdfs.subClassOf, as.Activity),
    quadruple(as.Update, rdfx.type, rdfs.Class),
    quadruple(as.Update, rdfs.subClassOf, as.Activity),
    quadruple(as.Delete, rdfx.type, rdfs.Class),
    quadruple(as.Delete, rdfs.subClassOf, as.Activity),
    quadruple(as.Remove, rdfx.type, rdfs.Class),
    quadruple(as.Remove, rdfs.subClassOf, as.Activity),
    quadruple(as.Accept, rdfx.type, rdfs.Class),
    quadruple(as.Accept, rdfs.subClassOf, as.Activity),
    quadruple(as.Reject, rdfx.type, rdfs.Class),
    quadruple(as.Reject, rdfs.subClassOf, as.Activity),
    quadruple(as.Add, rdfx.type, rdfs.Class),
    quadruple(as.Add, rdfs.subClassOf, as.Activity),
    quadruple(argu.PublishActivity, rdfx.type, rdfs.Class),
    quadruple(argu.PublishActivity, rdfs.subClassOf, as.Activity),
    quadruple(argu.ForwardActivity, rdfx.type, rdfs.Class),
    quadruple(argu.ForwardActivity, rdfs.subClassOf, as.Activity),
    quadruple(argu.ConvertActivity, rdfx.type, rdfs.Class),
    quadruple(argu.ConvertActivity, rdfs.subClassOf, as.Activity),
  ];
  // tslint:enable max-line-length

  lrs.store.addQuadruples(ontologicalClassData);

  const ontologicalPropertyData = [
    quadruple(schema.name, rdfx.type, rdfx.Property),

    quadruple(argu.applyLink, rdfx.type, rdfx.Property),
    quadruple(argu.applyLink, rdfs.label, rdf.literal('Link', languages.de)),
    quadruple(argu.applyLink, rdfs.label, rdf.literal('Link', languages.en)),
    quadruple(argu.applyLink, rdfs.label, rdf.literal('Link', languages.nl)),

    quadruple(ontola.destroyAction, rdfx.type, rdfx.Property),
    quadruple(ontola.destroyAction, rdfs.label, rdf.literal('Löschen', languages.de)),
    quadruple(ontola.destroyAction, rdfs.label, rdf.literal('Delete', languages.en)),
    quadruple(ontola.destroyAction, rdfs.label, rdf.literal('Verwijderen', languages.nl)),

    quadruple(ontola.publishAction, rdfx.type, rdfx.Property),
    quadruple(ontola.publishAction, rdfs.label, rdf.literal('Veröffentlichen', languages.de)),
    quadruple(ontola.publishAction, rdfs.label, rdf.literal('Publish', languages.en)),
    quadruple(ontola.publishAction, rdfs.label, rdf.literal('Publiceren', languages.nl)),

    quadruple(argu.invitee, rdfx.type, rdfx.Property),
    quadruple(argu.invitee, rdfs.label, rdf.literal('Eingeladener', languages.de)),
    quadruple(argu.invitee, rdfs.label, rdf.literal('Invitee', languages.en)),
    quadruple(argu.invitee, rdfs.label, rdf.literal('Uitgenodigde', languages.nl)),

    quadruple(ontola.makePrimaryAction, rdfx.type, rdfx.Property),
    quadruple(ontola.makePrimaryAction, rdfs.label, rdf.literal('Primär machen', languages.de)),
    quadruple(ontola.makePrimaryAction, rdfs.label, rdf.literal('Make primary', languages.en)),
    quadruple(ontola.makePrimaryAction, rdfs.label, rdf.literal('Maak primair', languages.nl)),

    quadruple(ontola.relevance, rdfx.type, rdfx.Property),
    quadruple(ontola.relevance, rdfs.label, rdf.literal('Relevanz', languages.de)),
    quadruple(ontola.relevance, rdfs.label, rdf.literal('Relevance', languages.en)),
    quadruple(ontola.relevance, rdfs.label, rdf.literal('Relevantie', languages.nl)),

    quadruple(argu.opened, rdfx.type, rdfx.Property),
    quadruple(argu.opened, rdfs.label, rdf.literal('Geöffnet', languages.de)),
    quadruple(argu.opened, rdfs.label, rdf.literal('Opened', languages.en)),
    quadruple(argu.opened, rdfs.label, rdf.literal('Geopend', languages.nl)),

    quadruple(ontola.redirectUrl, rdfx.type, rdfx.Property),
    quadruple(ontola.redirectUrl, rdfs.label, rdf.literal('Weiterleiten zu', languages.de)),
    quadruple(ontola.redirectUrl, rdfs.label, rdf.literal('Redirect to', languages.en)),
    quadruple(ontola.redirectUrl, rdfs.label, rdf.literal('Redirect naar', languages.nl)),

    quadruple(ontola.sendConfirmationAction, rdfx.type, rdfx.Property),
    quadruple(ontola.sendConfirmationAction, rdfs.label, rdf.literal('Bestätigungslink', languages.de)),
    quadruple(ontola.sendConfirmationAction, rdfs.label, rdf.literal('Confirmation link', languages.en)),
    quadruple(ontola.sendConfirmationAction, rdfs.label, rdf.literal('Bevestigingslink', languages.nl)),

    quadruple(ontola.updateAction, rdfx.type, rdfx.Property),
    quadruple(ontola.updateAction, rdfs.label, rdf.literal('Bearbeiten', languages.de)),
    quadruple(ontola.updateAction, rdfs.label, rdf.literal('Edit', languages.en)),
    quadruple(ontola.updateAction, rdfs.label, rdf.literal('Bewerken', languages.nl)),

    quadruple(argu.usages, rdfx.type, rdfx.Property),
    quadruple(argu.usages, rdfs.label, rdf.literal('Gebraucht', languages.de)),
    quadruple(argu.usages, rdfs.label, rdf.literal('Used', languages.en)),
    quadruple(argu.usages, rdfs.label, rdf.literal('Gebruikt', languages.nl)),
  ];

  lrs.store.addQuadruples(ontologicalPropertyData);

  const ontologyData = [
    ...appOntology,
    quadruple(ll.loadingResource, rdfx.type, ll.LoadingResource),
  ];

  lrs.store.addQuadruples(ontologyData);

  return {
    history,
    lrs,
    serviceWorkerCommunicator,
  };
}
