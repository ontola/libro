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
// @ts-ignore
import { arguDeltaProcessor } from './data';
import history from './history';
import { handle } from './logging';
import ontolaMiddleware from './ontolaMiddleware';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';

export const serviceWorkerCommunicator = new ServiceWorkerCommunicator();

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
LRS.namespaces.sh = Namespace('http://www.w3.org/ns/shacl#');
LRS.namespaces.opengov = Namespace('http://www.w3.org/ns/opengov#');
LRS.namespaces.org = Namespace('http://www.w3.org/ns/org#');
LRS.namespaces.person = Namespace('http://www.w3.org/ns/person#');
LRS.namespaces.fa4 = Namespace('http://fontawesome.io/icon/');

export const NS = LRS.namespaces;

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

  new Statement(NS.as('Collection'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),

  new Statement(NS.argu('Collection'), NS.rdfs('subClassOf'), NS.as('Collection')),

  new Statement(NS.argu('InfiniteCollectionView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),
  new Statement(NS.argu('PaginatedCollectionView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),

  new Statement(NS.schema('CreativeWork'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('CreativeWork'), NS.dc('source'), NamedNode.find('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('comment'), Literal.find('The most generic kind of creative work, including books, movies, photographs, software programs, etc.', languages.en)),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('label'), Literal.find('CreativeWork', languages.en)),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('subClassOf'), NS.schema('Thing')),

  new Statement(NS.schema('Comment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Comment'), NS.rdfs('comment'), Literal.find("A comment on an item - for example, a comment on a blog post. The comment's content is "
    + 'expressed via the <a class="localLink" href="/text">text</a> property, and its topic '
    + 'via <a class="localLink" href="/about">about</a>, properties shared with all CreativeWorks.')),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), Literal.find('Comment', languages.en)),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), Literal.find('Reactie', languages.nl)),
  new Statement(NS.schema('Comment'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.schema('Comment'), NS.schema('description'), Literal.find('A comment is a (brief) written response or note about a thing.', languages.en)),
  new Statement(NS.schema('Comment'), NS.schema('description'), Literal.find('Een reactie is een (korte) geschreven antwoord of notitie over een ding.', languages.nl)),

  new Statement(NS.argu('Question'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Question'), NS.rdfs('label'), Literal.find('Challenge', languages.en)),
  new Statement(NS.argu('Question'), NS.rdfs('label'), Literal.find('Uitdaging', languages.nl)),
  new Statement(NS.argu('Question'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Question'), NS.schema('description'), Literal.find('A challenge is a problem or question to which people can submit their ideas.', languages.en)),
  new Statement(NS.argu('Question'), NS.schema('description'), Literal.find('Een uitdaging is een probleem of vraagstuk waar ideeën op kunnen worden ingediend.', languages.nl)),
  new Statement(NS.argu('Question'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/question')),

  new Statement(NS.schema('Thing'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Thing'), NS.rdfs('comment'), Literal.find('The most generic type of item.')),
  new Statement(NS.schema('Thing'), NS.rdfs('label'), Literal.find('Thing', languages.en)),
  new Statement(NS.schema('Thing'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

  new Statement(NS.schema('Person'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Person'), NS.dc('source'), NamedNode.find('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('Person'), NS.owl('equivalentClass'), NS.foaf('Person')),
  new Statement(NS.schema('Person'), NS.rdfs('comment'), Literal.find('A person (alive, dead, undead, or fictional).', languages.en)),
  new Statement(NS.schema('Person'), NS.rdfs('label'), Literal.find('Person', languages.en)),
  new Statement(NS.schema('Person'), NS.rdfs('label'), Literal.find('Persoon', languages.nl)),
  new Statement(NS.schema('Person'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.schema('Person'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

  new Statement(NS.foaf('name'), NS.owl('sameAs'), NS.schema('name')),
  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),

  new Statement(NS.argu('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), Literal.find('Idea', languages.en)),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), Literal.find('Idee', languages.nl)),
  new Statement(NS.argu('Motion'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Motion'), NS.schema('description'), Literal.find('An idea is a proposal on which people can vote and add pro- or con arguments.', languages.en)),
  new Statement(NS.argu('Motion'), NS.schema('description'), Literal.find('Een idee is een voorstel waar je voor of tegen kan zijn.', languages.nl)),
  new Statement(NS.argu('Motion'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/lightbulb-o')),

  new Statement(NS.opengov('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.opengov('Motion'), NS.rdfs('label'), Literal.find('Motion', languages.en)),
  new Statement(NS.opengov('Motion'), NS.rdfs('label'), Literal.find('Motie', languages.nl)),

  new Statement(NS.argu('Topic'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Topic'), NS.rdfs('label'), Literal.find('Topic', languages.en)),
  new Statement(NS.argu('Topic'), NS.rdfs('label'), Literal.find('Topic', languages.nl)),
  new Statement(NS.argu('Topic'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Topic'), NS.rdfs('description'), Literal.find('A topic is a general discussion about a specific subject.', languages.en)),
  new Statement(NS.argu('Topic'), NS.rdfs('description'), Literal.find('Een topic is een gesprek over een specifiek onderwerp.', languages.nl)),
  new Statement(NS.argu('Topic'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/comments')),

  new Statement(NS.argu('Argument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), Literal.find('Argument', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), Literal.find('Argument', languages.nl)),
  new Statement(NS.argu('Argument'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), Literal.find('An argument is a single reason in favor or against an idea.', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), Literal.find('Een argument is een enkele reden voor of tegen een idee.', languages.nl)),

  new Statement(NS.argu('ConArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ConArgument'), NS.rdfs('label'), new Literal('Argument against', languages.en)),
  new Statement(NS.argu('ConArgument'), NS.rdfs('label'), new Literal('Argument tegen', languages.nl)),
  new Statement(NS.argu('ConArgument'), NS.rdfs('subClassOf'), NS.argu('Argument')),
  new Statement(NS.argu('ConArgument'), NS.schema('description'), new Literal('A con argument is a reason to be against something.', languages.en)),
  new Statement(NS.argu('ConArgument'), NS.schema('description'), new Literal('Een tegenargument is een reden om ergens voor.', languages.nl)),
  new Statement(NS.argu('ConArgument'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/minus')),

  new Statement(NS.argu('ProArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ProArgument'), NS.rdfs('label'), new Literal('Argument in favour', languages.en)),
  new Statement(NS.argu('ProArgument'), NS.rdfs('label'), new Literal('Argument voor', languages.nl)),
  new Statement(NS.argu('ProArgument'), NS.rdfs('subClassOf'), NS.argu('Argument')),
  new Statement(NS.argu('ProArgument'), NS.schema('description'), new Literal('A pro argument is a reason to be in favor of something.', languages.en)),
  new Statement(NS.argu('ProArgument'), NS.schema('description'), new Literal('Een voorargument is een reden om ergens voor te zijn.', languages.nl)),
  new Statement(NS.argu('ProArgument'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/plus')),

  new Statement(NS.argu('Comment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Comment'), NS.rdfs('label'), Literal.find('Comment', languages.en)),
  new Statement(NS.argu('Comment'), NS.rdfs('label'), Literal.find('Reactie', languages.nl)),
  new Statement(NS.argu('Comment'), NS.schema('description'), Literal.find('A comment is a written response or note about a thing.', languages.en)),
  new Statement(NS.argu('Comment'), NS.schema('description'), Literal.find('Een reactie is een geschreven antwoord of notitie over een ding.', languages.nl)),
  new Statement(NS.argu('Comment'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/comment')),

  new Statement(NS.argu('BlogPost'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('BlogPost'), NS.rdfs('label'), Literal.find('Blogpost', languages.en)),
  new Statement(NS.argu('BlogPost'), NS.rdfs('label'), Literal.find('Blogpost', languages.nl)),
  new Statement(NS.argu('BlogPost'), NS.schema('description'), Literal.find('An Blogpost is a message or article in which something is shared.', languages.en)),
  new Statement(NS.argu('BlogPost'), NS.schema('description'), Literal.find('Een Blogpost is een bericht of artikel waarin iets wordt gedeeld.', languages.nl)),
  new Statement(NS.argu('BlogPost'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/bullhorn')),

  new Statement(NS.argu('ConOpinion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ConOpinion'), NS.rdfs('label'), new Literal('Opinion', languages.en)),
  new Statement(NS.argu('ConOpinion'), NS.rdfs('label'), new Literal('Mening', languages.nl)),
  new Statement(NS.argu('ConOpinion'), NS.schema('description'), new Literal('An opinion is an explanation of why you are for or against something.', languages.en)),
  new Statement(NS.argu('ConOpinion'), NS.schema('description'), new Literal('Een opinion is een toelichting op jouw stem voor of tegen iets.', languages.nl)),
  new Statement(NS.argu('ConOpinion'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/thumbs-down')),

  new Statement(NS.argu('NeutralOpinion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('NeutralOpinion'), NS.rdfs('label'), new Literal('Opinion', languages.en)),
  new Statement(NS.argu('NeutralOpinion'), NS.rdfs('label'), new Literal('Mening', languages.nl)),
  new Statement(NS.argu('NeutralOpinion'), NS.schema('description'), new Literal('An opinion is an explanation of why you are for or against something.', languages.en)),
  new Statement(NS.argu('NeutralOpinion'), NS.schema('description'), new Literal('Een opinion is een toelichting op jouw stem voor of tegen iets.', languages.nl)),
  new Statement(NS.argu('NeutralOpinion'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/pause')),

  new Statement(NS.argu('ProOpinion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ProOpinion'), NS.rdfs('label'), new Literal('Opinion', languages.en)),
  new Statement(NS.argu('ProOpinion'), NS.rdfs('label'), new Literal('Mening', languages.nl)),
  new Statement(NS.argu('ProOpinion'), NS.schema('description'), new Literal('An opinion is an explanation of why you are for or against something.', languages.en)),
  new Statement(NS.argu('ProOpinion'), NS.schema('description'), new Literal('Een opinion is een toelichting op jouw stem voor of tegen iets.', languages.nl)),
  new Statement(NS.argu('ProOpinion'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/thumbs-up')),

  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),

  new Statement(NS.schema('MediaObject'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('MediaObject'), NS.rdfs('label'), Literal.find('Attachment', languages.en)),
  new Statement(NS.schema('MediaObject'), NS.rdfs('label'), Literal.find('Bijlage', languages.nl)),
  new Statement(NS.schema('MediaObject'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.schema('MediaObject'), NS.schema('description'), Literal.find('An attachment is a file which has been appended to a document to provide more information.', languages.en)),
  new Statement(NS.schema('MediaObject'), NS.schema('description'), Literal.find('Een bijlage is een bestand dat bij een document gevoegd is om meer informatie te verschaffen.', languages.nl)),
  new Statement(NS.schema('MediaObject'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/file')),

  new Statement(NS.schema('ImageObject'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),
  new Statement(NS.schema('VideoObject'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),

  new Statement(NS.schema('Action'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Action'), NS.rdfs('subClassOf'), NS.schema('Thing')),

  new Statement(NS.schema('CreateAction'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('CreateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

  new Statement(NS.argu('Create::Vote'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Create::Vote'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

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

  new Statement(NS.argu('EmailAddress'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('EmailAddress'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.argu('EmailAddress'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('email')),

  new Statement(NS.argu('Forum'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Forum'), NS.rdfs('subClassOf'), NS.argu('ContainerNode')),

  new Statement(NS.argu('OpenDataPortal'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('OpenDataPortal'), NS.rdfs('subClassOf'), NS.argu('ContainerNode')),

  new Statement(NS.argu('Blog'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Blog'), NS.rdfs('subClassOf'), NS.argu('ContainerNode')),
];
// tslint:enable max-line-length

LRS.addOntologySchematics(ontologicalClassData);
// @ts-ignore TS2341
LRS.store.addStatements(ontologicalClassData);

const ontologicalPropertyData = [
    new Statement(NS.argu('attachments'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('attachments'), NS.rdfs('label'), Literal.find('Attachments', languages.en)),
    new Statement(NS.argu('attachments'), NS.rdfs('label'), Literal.find('Bijlagen', languages.nl)),
    new Statement(NS.argu('attachments'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/paperclip')),

    new Statement(NS.argu('coverPhoto'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.argu('coverPhoto'), NS.rdfs('label'), Literal.find('Cover photo', languages.en)),
    new Statement(NS.argu('coverPhoto'), NS.rdfs('label'), Literal.find('Achtergrondfoto', languages.nl)),
    new Statement(NS.argu('coverPhoto'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/file-image-o')),

    new Statement(NS.schema('location'), NS.rdf('type'), NS.rdf('Property')),
    new Statement(NS.schema('location'), NS.rdfs('label'), Literal.find('Location', languages.en)),
    new Statement(NS.schema('location'), NS.rdfs('label'), Literal.find('Locatie', languages.nl)),
    new Statement(NS.schema('location'), NS.schema('image'), NamedNode.find('http://fontawesome.io/icon/map-marker')),

];

LRS.addOntologySchematics(ontologicalPropertyData);
// @ts-ignore TS2341
LRS.store.addStatements(ontologicalPropertyData);

export default LRS;
