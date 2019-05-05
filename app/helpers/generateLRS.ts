/* eslint no-console: 0 */
import { createStore, MiddlewareFn } from 'link-lib';
import {
  Formula,
  Literal,
  NamedNode,
  Namespace,
  Node,
  SomeTerm,
  Statement,
} from 'rdflib';
import { ReactType } from 'react';

import { FRONTEND_ACCEPT } from '../config';
import { appMiddleware, website } from '../middleware/app';
import execFilter from '../middleware/execFilter';
import logging from '../middleware/logging';
import ontolaMiddleware from '../middleware/ontolaMiddleware';

// @ts-ignore
import { arguDeltaProcessor } from './data';
import history from './history';
import { handle } from './logging';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';

export default
function generateLRS() {
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

  LRS.namespaces.aod = Namespace('https://argu.co/ns/od#');
  LRS.namespaces.meeting = Namespace('https://argu.co/ns/meeting/');
  LRS.namespaces.opengov = Namespace('http://www.w3.org/ns/opengov#');
  LRS.namespaces.org = Namespace('http://www.w3.org/ns/org#');
  LRS.namespaces.person = Namespace('http://www.w3.org/ns/person#');
  LRS.namespaces.sp = Namespace('http://spinrdf.org/sp#');
  LRS.namespaces.fa4 = Namespace('http://fontawesome.io/icon/');

  const NS = LRS.namespaces;

  const languages = {
    en: 'en',
    nl: 'nl',
  };

  const THING_TYPES = [
    NS.schema('Thing'),
    NS.rdfs('Resource'),
    NS.owl('Thing'),
    NS.link('Document'),
  ];

// @ts-ignore TS2341
  LRS.store.store.newPropertyAction(NS.rdf('type'), (
      _: Formula,
      __: SomeTerm,
      ___: NamedNode,
      obj: SomeTerm,
      ____: Node,
  ): boolean => {
    if (THING_TYPES.includes(obj as NamedNode)) {
      return false;
    }
    // @ts-ignore TS2341
    LRS.schema.addStatement(new Statement(obj, NS.rdfs('subClassOf'), NS.schema('Thing')));
    return false;
  });

// tslint:disable max-line-length
  const ontologicalClassData = [
    new Statement(NS.schema('Thing'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
    new Statement(NS.owl('Thing'), NS.owl('sameAs'), NS.schema('Thing')),

    new Statement(NS.schema('Thing'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.schema('Thing'), NS.rdfs('comment'), Literal.find('The most generic type of item.')),
    new Statement(NS.schema('Thing'), NS.rdfs('label'), Literal.find('Thing', languages.en)),
    new Statement(NS.schema('Thing'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

    new Statement(NS.as('Collection'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
    new Statement(NS.ontola('Collection'), NS.rdfs('subClassOf'), NS.as('Collection')),
    new Statement(NS.ontola('InfiniteView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),
    new Statement(NS.ontola('PaginatedView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),

    new Statement(NS.opengov('Motion'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.opengov('Motion'), NS.rdfs('label'), Literal.find('Motion', languages.en)),
    new Statement(NS.opengov('Motion'), NS.rdfs('label'), Literal.find('Motie', languages.nl)),

    new Statement(NS.schema('ImageObject'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),

    new Statement(NS.schema('Action'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.schema('Action'), NS.rdfs('subClassOf'), NS.schema('Thing')),

    new Statement(NS.schema('CreateAction'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.schema('CreateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

    new Statement(NS.schema('WebPage'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.schema('WebPage'), NS.rdfs('subClassOf'), NS.schema('Thing')),

    new Statement(NS.schema('WebSite'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.schema('WebSite'), NS.rdfs('subClassOf'), NS.schema('Thing')),

    new Statement(NS.ontola('Create::Users::Password'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.ontola('Create::Users::Password'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    new Statement(NS.ontola('Create::Users::Confirmation'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.ontola('Create::Users::Confirmation'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    new Statement(NS.ontola('Create::Users::Unlock'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.ontola('Create::Users::Unlock'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    new Statement(NS.ontola('Create::Vote'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.ontola('Create::Vote'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

    new Statement(NS.ontola('VideoPage'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.ontola('VideoPage'), NS.rdfs('subClassOf'), NS.schema('WebPage')),

    new Statement(NS.schema('UpdateAction'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.schema('UpdateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

    new Statement(NS.meeting('Meeting'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.meeting('Meeting'), NS.rdfs('subClassOf'), NS.schema('Thing')),
    new Statement(NS.meeting('Meeting'), NS.rdfs('subClassOf'), NamedNode.find('http://purl.org/NET/c4dm/event.owl#Event')),
    new Statement(NS.meeting('Meeting'), NS.rdfs('label'), Literal.find('Meeting', languages.en)),
    new Statement(NS.meeting('Meeting'), NS.rdfs('label'), Literal.find('Vergadering', languages.nl)),
    new Statement(NS.meeting('Meeting'), NS.schema('description'), Literal.find('A meeting is an event where people discuss things and make decisions.', languages.en)),
    new Statement(NS.meeting('Meeting'), NS.schema('description'), Literal.find('Een vergadering is een bijeenkomst waar mensen dingen bespreken en belsuiten nemen.', languages.nl)),
    new Statement(NS.meeting('Meeting'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/calendar')),

    new Statement(NS.meeting('AgendaItem'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.meeting('AgendaItem'), NS.rdfs('label'), Literal.find('Agenda Item', languages.en)),
    new Statement(NS.meeting('AgendaItem'), NS.rdfs('label'), Literal.find('Agendapunt', languages.nl)),
    new Statement(NS.meeting('AgendaItem'), NS.rdfs('subClassOf'), NS.schema('Thing')),
    new Statement(NS.meeting('AgendaItem'), NS.schema('description'), Literal.find('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
    new Statement(NS.meeting('AgendaItem'), NS.schema('description'), Literal.find('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
    new Statement(NS.meeting('AgendaItem'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/list')),

    new Statement(NS.ontola('MenuItem'), NS.rdf('type'), NS.rdfs('Class')),
    new Statement(NS.ontola('MenuItem'), NS.rdfs('subClassOf'), NS.argu('Thing')),
  ];
// tslint:enable max-line-length

  LRS.addOntologySchematics(ontologicalClassData);
// @ts-ignore TS2341
  LRS.store.addStatements(ontologicalClassData);

  const ontologicalPropertyData = [
    new Statement(NS.foaf('name'), NS.owl('sameAs'), NS.schema('name')),

    new Statement(NS.argu('applyLink'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('applyLink'), NS.rdfs('label'), Literal.find('Link', languages.en)),
    new Statement(NS.argu('applyLink'), NS.rdfs('label'), Literal.find('Link', languages.nl)),

    new Statement(NS.ontola('destroyAction'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.ontola('destroyAction'), NS.rdfs('label'), Literal.find('Delete', languages.en)),
    new Statement(NS.ontola('destroyAction'), NS.rdfs('label'), Literal.find('Verwijderen', languages.nl)),

    new Statement(NS.argu('invitee'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('invitee'), NS.rdfs('label'), Literal.find('Invitee', languages.en)),
    new Statement(NS.argu('invitee'), NS.rdfs('label'), Literal.find('Uitgenodigde', languages.nl)),

    new Statement(NS.ontola('makePrimaryAction'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.ontola('makePrimaryAction'), NS.rdfs('label'), Literal.find('Make primary', languages.en)),
    new Statement(NS.ontola('makePrimaryAction'), NS.rdfs('label'), Literal.find('Maak primair', languages.nl)),

    new Statement(NS.argu('opened'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('opened'), NS.rdfs('label'), Literal.find('Opened', languages.en)),
    new Statement(NS.argu('opened'), NS.rdfs('label'), Literal.find('Geopend', languages.nl)),

    new Statement(NS.argu('redirectUrl'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('redirectUrl'), NS.rdfs('label'), Literal.find('Redirect to', languages.en)),
    new Statement(NS.argu('redirectUrl'), NS.rdfs('label'), Literal.find('Redirect naar', languages.nl)),

    new Statement(NS.ontola('sendConfirmationAction'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(
        NS.ontola('sendConfirmationAction'),
        NS.rdfs('label'),
        Literal.find('Send confirmation', languages.en),
    ),
    new Statement(
        NS.ontola('sendConfirmationAction'),
        NS.rdfs('label'),
        Literal.find('Verstuur bevestiging', languages.nl),
    ),

    new Statement(NS.ontola('updateAction'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.ontola('updateAction'), NS.rdfs('label'), Literal.find('Edit', languages.en)),
    new Statement(NS.ontola('updateAction'), NS.rdfs('label'), Literal.find('Bewerken', languages.nl)),

    new Statement(NS.argu('usages'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('usages'), NS.rdfs('label'), Literal.find('Used', languages.en)),
    new Statement(NS.argu('usages'), NS.rdfs('label'), Literal.find('Gebruikt', languages.nl)),
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
