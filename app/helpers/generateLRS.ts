/* eslint no-console: 0 */
import as from '@ontologies/as';
import rdf, { createNS, NamedNode, Namespace, Node, SomeTerm, Term } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import owl from '@ontologies/owl';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import xsd from '@ontologies/xsd';
import { createStore, MiddlewareFn, rdflib } from 'link-lib';

import { ReactType } from 'react';

import { FRONTEND_ACCEPT } from '../config';
import { appMiddleware, frontendIRIStr, website } from '../middleware/app';
import execFilter from '../middleware/execFilter';
import logging from '../middleware/logging';
import ontolaMiddleware from '../middleware/ontolaMiddleware';
import sp from '../ontology/sp';
import arguDeltaProcessor from './arguDeltaProcessor';
import { getMetaContent } from './arguHelpers';

import history from './history';
import { handle } from './logging';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';
import { initializeCable, subscribeDeltaChannel } from './websockets';

export default function generateLRS() {
  const serviceWorkerCommunicator = new ServiceWorkerCommunicator();

  const middleware: Array<MiddlewareFn<any>> = [
    logging(),
    ontolaMiddleware(history, serviceWorkerCommunicator),
    appMiddleware(),
    execFilter(),
  ];

  const LRS = createStore<ReactType>({ report: handle }, middleware);
  serviceWorkerCommunicator.linkedRenderStore = LRS;
  (LRS as any).bulkFetch = true;

  LRS.deltaProcessors.push(arguDeltaProcessor(LRS));

  transformers(LRS).forEach((t) =>
// @ts-ignore TS2341
          LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue),
  );

  if (!website) {
    handle(new Error('No website in head'));
  }

// @ts-ignore TS2341
  LRS.api.accept.default = FRONTEND_ACCEPT;

  const NS = {
    ...LRS.namespaces as {
      argu: Namespace;
      as: Namespace;
      bibo: Namespace;
      cc: Namespace;
      dbo: Namespace;
      dbp: Namespace;
      dbpedia: Namespace;
      dcat: Namespace;
      dctype: Namespace;
      ex: Namespace;
      example: Namespace;
      fhir: Namespace;
      fhir3: Namespace;
      foaf: Namespace;
      geo: Namespace;
      http: Namespace;
      http07: Namespace;
      httph: Namespace;
      hydra: Namespace;
      ianalr: Namespace;
      ld: Namespace;
      link: Namespace;
      ll: Namespace;
      owl: Namespace;
      p: Namespace;
      prov: Namespace;
      qb: Namespace;
      rdf: Namespace;
      rdfs: Namespace;
      schema: Namespace;
      sh: Namespace;
      shacl: Namespace;
      skos: Namespace;
      wd: Namespace;
      wdata: Namespace;
      wdref: Namespace;
      wds: Namespace;
      wdt: Namespace;
      wdv: Namespace;
      xmlns: Namespace;
    },

    as: as.ns,
    foaf: foaf.ns,
    owl: owl.ns,
    rdf: rdfx.ns,
    rdfs: rdfs.ns,
    schema: schema.ns,
    xsd: xsd.ns,

    aod: createNS('https://argu.co/ns/od#'),
    app: createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`),
    appSlashless: createNS(frontendIRIStr.slice(0, frontendIRIStr.endsWith('/') ? -1 : undefined)),
    fa4: createNS('http://fontawesome.io/icon/'),
    meeting: createNS('https://argu.co/ns/meeting/'),
    ontola: createNS('https://ns.ontola.io/'),
    opengov: createNS('http://www.w3.org/ns/opengov#'),
    org: createNS('http://www.w3.org/ns/org#'),
    person: createNS('http://www.w3.org/ns/person#'),
    rivm: createNS('https://argu.co/ns/rivm#'),
    sp: sp.ns,
    teamGL: createNS('http://glapp.nl/tgl#'),
  };

  const languages = {
    en: 'en',
    nl: 'nl',
  };

  const THING_TYPES = [
    NS.schema('Thing'),
    NS.rdfs('Resource'),
    NS.owl('Thing'),
    NS.link('Document'),
  ].map((t) => rdf.id(t));

  const websocketPath = getMetaContent('websocket-path');

  if (__CLIENT__ && websocketPath) {
    initializeCable(LRS, websocketPath).then(() => {
      subscribeDeltaChannel(LRS, 'UserChannel');
    });
  }

  LRS.store.getInternalStore().newPropertyAction(NS.rdf('type'), (
      _: rdflib.Store,
      __: SomeTerm,
      ___: NamedNode,
      obj: Term,
      ____: Node,
  ): boolean => {
    if (THING_TYPES.includes(rdf.id(obj))) {
      return false;
    }
    // @ts-ignore TS2341
    LRS.schema.addStatement(rdf.quad(obj, NS.rdfs('subClassOf'), NS.schema('Thing')));
    return false;
  });

// tslint:disable max-line-length
  const ontologicalClassData = [
    rdf.quad(NS.schema('Thing'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
    rdf.quad(NS.owl('Thing'), NS.owl('sameAs'), NS.schema('Thing')),

    rdf.quad(NS.schema('Thing'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.schema('Thing'), NS.rdfs('comment'), rdf.literal('The most generic type of item.')),
    rdf.quad(NS.schema('Thing'), NS.rdfs('label'), rdf.literal('Thing', languages.en)),
    rdf.quad(NS.schema('Thing'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

    rdf.quad(NS.as('Collection'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
    rdf.quad(NS.ontola('Collection'), NS.rdfs('subClassOf'), NS.as('Collection')),
    rdf.quad(NS.ontola('InfiniteView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),
    rdf.quad(NS.ontola('PaginatedView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),

    rdf.quad(NS.opengov('Motion'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.opengov('Motion'), NS.rdfs('label'), rdf.literal('Motion', languages.en)),
    rdf.quad(NS.opengov('Motion'), NS.rdfs('label'), rdf.literal('Motie', languages.nl)),

    rdf.quad(NS.schema('ImageObject'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),

    rdf.quad(NS.schema('Action'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.schema('Action'), NS.rdfs('subClassOf'), NS.schema('Thing')),

    rdf.quad(NS.schema('CreateAction'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.schema('CreateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

    rdf.quad(NS.schema('WebPage'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.schema('WebPage'), NS.rdfs('subClassOf'), NS.schema('Thing')),

    rdf.quad(NS.schema('WebSite'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.schema('WebSite'), NS.rdfs('subClassOf'), NS.schema('Thing')),

    rdf.quad(NS.ontola('Create::Users::Password'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.ontola('Create::Users::Password'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    rdf.quad(NS.ontola('Create::Users::Confirmation'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.ontola('Create::Users::Confirmation'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    rdf.quad(NS.ontola('Create::Users::Unlock'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.ontola('Create::Users::Unlock'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    rdf.quad(NS.ontola('Create::Vote'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.ontola('Create::Vote'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    rdf.quad(NS.ontola('VideoPage'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.ontola('VideoPage'), NS.rdfs('subClassOf'), NS.schema('WebPage')),

    rdf.quad(NS.schema('UpdateAction'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.schema('UpdateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

    rdf.quad(NS.teamGL('ContactedAction'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('ContactedAction'), NS.rdfs('subClassOf'), NS.schema('UpdateAction')),

    rdf.quad(NS.teamGL('NewVolunteer'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('NewVolunteer'), NS.rdfs('subClassOf'), NS.teamGL('Volunteer')),

    rdf.quad(NS.teamGL('NotAvailableAction'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('NotAvailableAction'), NS.rdfs('subClassOf'), NS.schema('UpdateAction')),

    rdf.quad(NS.teamGL('TryAgainAction'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('TryAgainAction'), NS.rdfs('subClassOf'), NS.schema('UpdateAction')),

    rdf.quad(NS.teamGL('UnsubscribeAction'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('UnsubscribeAction'), NS.rdfs('subClassOf'), NS.schema('UpdateAction')),

    rdf.quad(NS.teamGL('Participant'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('Participant'), NS.rdfs('subClassOf'), NS.teamGL('Volunteer')),

    rdf.quad(NS.teamGL('PotentialParticipant'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.teamGL('PotentialParticipant'), NS.rdfs('subClassOf'), NS.teamGL('Participant')),

    rdf.quad(NS.meeting('Meeting'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.meeting('Meeting'), NS.rdfs('subClassOf'), NS.schema('Thing')),
    rdf.quad(NS.meeting('Meeting'), NS.rdfs('subClassOf'), rdf.namedNode('http://purl.org/NET/c4dm/event.owl#Event')),
    rdf.quad(NS.meeting('Meeting'), NS.rdfs('label'), rdf.literal('Meeting', languages.en)),
    rdf.quad(NS.meeting('Meeting'), NS.rdfs('label'), rdf.literal('Vergadering', languages.nl)),
    rdf.quad(NS.meeting('Meeting'), NS.schema('description'), rdf.literal('A meeting is an event where people discuss things and make decisions.', languages.en)),
    rdf.quad(NS.meeting('Meeting'), NS.schema('description'), rdf.literal('Een vergadering is een bijeenkomst waar mensen dingen bespreken en belsuiten nemen.', languages.nl)),
    rdf.quad(NS.meeting('Meeting'), NS.schema('image'), rdf.namedNode('http://fontawesome.io/icon/calendar')),

    rdf.quad(NS.meeting('AgendaItem'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.meeting('AgendaItem'), NS.rdfs('label'), rdf.literal('Agenda Item', languages.en)),
    rdf.quad(NS.meeting('AgendaItem'), NS.rdfs('label'), rdf.literal('Agendapunt', languages.nl)),
    rdf.quad(NS.meeting('AgendaItem'), NS.rdfs('subClassOf'), NS.schema('Thing')),
    rdf.quad(NS.meeting('AgendaItem'), NS.schema('description'), rdf.literal('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
    rdf.quad(NS.meeting('AgendaItem'), NS.schema('description'), rdf.literal('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
    rdf.quad(NS.meeting('AgendaItem'), NS.schema('image'), rdf.namedNode('http://fontawesome.io/icon/list')),

    rdf.quad(NS.ontola('MenuItem'), NS.rdf('type'), NS.rdfs('Class')),
    rdf.quad(NS.ontola('MenuItem'), NS.rdfs('subClassOf'), NS.argu('Thing')),
  ];
// tslint:enable max-line-length

  LRS.addOntologySchematics(ontologicalClassData);
// @ts-ignore TS2341
  LRS.store.addStatements(ontologicalClassData);

  const ontologicalPropertyData = [
    rdf.quad(NS.foaf('name'), NS.owl('sameAs'), NS.schema('name')),

    rdf.quad(NS.argu('applyLink'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.argu('applyLink'), NS.rdfs('label'), rdf.literal('Link', languages.en)),
    rdf.quad(NS.argu('applyLink'), NS.rdfs('label'), rdf.literal('Link', languages.nl)),

    rdf.quad(NS.ontola('destroyAction'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.ontola('destroyAction'), NS.rdfs('label'), rdf.literal('Delete', languages.en)),
    rdf.quad(NS.ontola('destroyAction'), NS.rdfs('label'), rdf.literal('Verwijderen', languages.nl)),

    rdf.quad(NS.argu('invitee'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.argu('invitee'), NS.rdfs('label'), rdf.literal('Invitee', languages.en)),
    rdf.quad(NS.argu('invitee'), NS.rdfs('label'), rdf.literal('Uitgenodigde', languages.nl)),

    rdf.quad(NS.ontola('makePrimaryAction'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.ontola('makePrimaryAction'), NS.rdfs('label'), rdf.literal('Make primary', languages.en)),
    rdf.quad(NS.ontola('makePrimaryAction'), NS.rdfs('label'), rdf.literal('Maak primair', languages.nl)),

    rdf.quad(NS.argu('opened'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.argu('opened'), NS.rdfs('label'), rdf.literal('Opened', languages.en)),
    rdf.quad(NS.argu('opened'), NS.rdfs('label'), rdf.literal('Geopend', languages.nl)),

    rdf.quad(NS.argu('redirectUrl'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.argu('redirectUrl'), NS.rdfs('label'), rdf.literal('Redirect to', languages.en)),
    rdf.quad(NS.argu('redirectUrl'), NS.rdfs('label'), rdf.literal('Redirect naar', languages.nl)),

    rdf.quad(NS.ontola('sendConfirmationAction'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(
        NS.ontola('sendConfirmationAction'),
        NS.rdfs('label'),
        rdf.literal('Send confirmation', languages.en),
    ),
    rdf.quad(
        NS.ontola('sendConfirmationAction'),
        NS.rdfs('label'),
        rdf.literal('Verstuur bevestiging', languages.nl),
    ),

    rdf.quad(NS.ontola('updateAction'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.ontola('updateAction'), NS.rdfs('label'), rdf.literal('Edit', languages.en)),
    rdf.quad(NS.ontola('updateAction'), NS.rdfs('label'), rdf.literal('Bewerken', languages.nl)),

    rdf.quad(NS.argu('usages'), NS.rdf('type'), NS.rdf('Property')),
    rdf.quad(NS.argu('usages'), NS.rdfs('label'), rdf.literal('Used', languages.en)),
    rdf.quad(NS.argu('usages'), NS.rdfs('label'), rdf.literal('Gebruikt', languages.nl)),
  ];

  LRS.addOntologySchematics(ontologicalPropertyData);
// @ts-ignore TS2341
  LRS.store.addStatements(ontologicalPropertyData);

  return {
    LRS,
    NS,
    serviceWorkerCommunicator,
  };
}
