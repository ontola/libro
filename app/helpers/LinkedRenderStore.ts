/* eslint no-console: 0 */
import {
  createStore,
  MiddlewareFn,
} from 'link-lib';
import {
  Formula,
  Literal,
  NamedNode,
  Namespace,
  Node,
  SomeTerm,
  Statement,
  Term,
} from 'rdflib';
import { ReactType } from 'react';

import { FRONTEND_ACCEPT, FRONTEND_URL } from '../config';

// @ts-ignore
import { processDelta } from './data';
import history from './history';
import { log } from './logging';
import ontolaMiddleware from './ontolaMiddleware';
import ServiceWorkerCommunicator from './ServiceWorkerCommunicator';
import transformers from './transformers';

export const serviceWorkerCommunicator = new ServiceWorkerCommunicator();

const middleware: Array<MiddlewareFn<any>> = [
  () => (next) => (a, o) => {
    log('Link action:', a, o);
    return next(a, o);
  },
  ontolaMiddleware(history, serviceWorkerCommunicator),
];

const LRS = createStore<ReactType>({}, middleware);
serviceWorkerCommunicator.linkedRenderStore = LRS;
(LRS as any).bulkFetch = true;

// @monkey
const dispatch = LRS.dispatch;
LRS.dispatch = (action: NamedNode, args: any) => dispatch(action, args).then((response) => processDelta(LRS, response));

// @ts-ignore TS2341
transformers.forEach((t) => LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue));

// @ts-ignore TS2341
LRS.api.setAcceptForHost(FRONTEND_URL, FRONTEND_ACCEPT);

LRS.namespaces.app = Namespace(FRONTEND_URL.endsWith('/') ? FRONTEND_URL : `${FRONTEND_URL}/`);
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
const ontologicalData = [
  new Statement(NS.schema('Thing'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
  new Statement(NS.owl('Thing'), NS.owl('sameAs'), NS.schema('Thing')),

  new Statement(NS.as('Collection'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),

  new Statement(NS.argu('Collection'), NS.rdfs('subClassOf'), NS.as('Collection')),

  new Statement(NS.argu('InfiniteCollectionView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),
  new Statement(NS.argu('PaginatedCollectionView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),

  new Statement(NS.schema('CreativeWork'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('CreativeWork'), NS.dc('source'), Term.namedNodeByIRI('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('comment'), Term.literalByValue('The most generic kind of creative work, including books, movies, photographs, software programs, etc.', languages.en)),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('label'), Term.literalByValue('CreativeWork', languages.en)),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('subClassOf'), NS.schema('Thing')),

  new Statement(NS.schema('Comment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Comment'), NS.rdfs('comment'), Term.literalByValue("A comment on an item - for example, a comment on a blog post. The comment's content is "
    + 'expressed via the <a class="localLink" href="/text">text</a> property, and its topic '
    + 'via <a class="localLink" href="/about">about</a>, properties shared with all CreativeWorks.')),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), Term.literalByValue('Comment', languages.en)),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), Term.literalByValue('Reactie', languages.nl)),
  new Statement(NS.schema('Comment'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.schema('Comment'), NS.schema('description'), Term.literalByValue('A comment is a (brief) written response or note about a thing.', languages.en)),
  new Statement(NS.schema('Comment'), NS.schema('description'), Term.literalByValue('Een reactie is een (korte) geschreven antwoord of notitie over een ding.', languages.nl)),

  new Statement(NS.argu('Question'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Question'), NS.rdfs('label'), Term.literalByValue('Challenge', languages.en)),
  new Statement(NS.argu('Question'), NS.rdfs('label'), Term.literalByValue('Uitdaging', languages.nl)),
  new Statement(NS.argu('Question'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Question'), NS.schema('description'), Term.literalByValue('A challenge is a problem or question to which people can submit their ideas.', languages.en)),
  new Statement(NS.argu('Question'), NS.schema('description'), Term.literalByValue('Een uitdaging is een probleem of vraagstuk waar ideeën op kunnen worden ingediend.', languages.nl)),
  new Statement(NS.argu('Question'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/question')),

  new Statement(NS.schema('Thing'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Thing'), NS.rdfs('comment'), Term.literalByValue('The most generic type of item.')),
  new Statement(NS.schema('Thing'), NS.rdfs('label'), Term.literalByValue('Thing', languages.en)),
  new Statement(NS.schema('Thing'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

  new Statement(NS.schema('Person'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Person'), NS.dc('source'), Term.namedNodeByIRI('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('Person'), NS.owl('equivalentClass'), NS.foaf('Person')),
  new Statement(NS.schema('Person'), NS.rdfs('comment'), Term.literalByValue('A person (alive, dead, undead, or fictional).', languages.en)),
  new Statement(NS.schema('Person'), NS.rdfs('label'), Term.literalByValue('Person', languages.en)),
  new Statement(NS.schema('Person'), NS.rdfs('label'), Term.literalByValue('Persoon', languages.nl)),
  new Statement(NS.schema('Person'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.schema('Person'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

  new Statement(NS.foaf('name'), NS.owl('sameAs'), NS.schema('name')),
  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),

  new Statement(NS.argu('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), Term.literalByValue('Idea', languages.en)),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), Term.literalByValue('Idee', languages.nl)),
  new Statement(NS.argu('Motion'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Motion'), NS.schema('description'), Term.literalByValue('An idea is a proposal on which people can vote and add pro- or con arguments.', languages.en)),
  new Statement(NS.argu('Motion'), NS.schema('description'), Term.literalByValue('Een idee is een voorstel waar je voor of tegen kan zijn.', languages.nl)),
  new Statement(NS.argu('Motion'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/lightbulb-o')),

  new Statement(NS.opengov('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.opengov('Motion'), NS.rdfs('label'), Term.literalByValue('Motion', languages.en)),
  new Statement(NS.opengov('Motion'), NS.rdfs('label'), Term.literalByValue('Motie', languages.nl)),

  new Statement(NS.argu('Argument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), Term.literalByValue('Argument', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), Term.literalByValue('Argument', languages.nl)),
  new Statement(NS.argu('Argument'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), Term.literalByValue('An argument is a single reason in favor or against an idea.', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), Term.literalByValue('Een argument is een enkele reden voor of tegen een idee.', languages.nl)),

  new Statement(NS.argu('ConArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ConArgument'), NS.rdfs('label'), new Literal('Argument against', languages.en)),
  new Statement(NS.argu('ConArgument'), NS.rdfs('label'), new Literal('Argument tegen', languages.nl)),
  new Statement(NS.argu('ConArgument'), NS.rdfs('subClassOf'), NS.argu('Argument')),
  new Statement(NS.argu('ConArgument'), NS.schema('description'), new Literal('A con argumen is a reason to be against something.', languages.en)),
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
  new Statement(NS.argu('Comment'), NS.rdfs('label'), Term.literalByValue('Comment', languages.en)),
  new Statement(NS.argu('Comment'), NS.rdfs('label'), Term.literalByValue('Reactie', languages.nl)),
  new Statement(NS.argu('Comment'), NS.schema('description'), Term.literalByValue('A comment is a written response or note about a thing.', languages.en)),
  new Statement(NS.argu('Comment'), NS.schema('description'), Term.literalByValue('Een reactie is een geschreven antwoord of notitie over een ding.', languages.nl)),
  new Statement(NS.argu('Comment'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/comment')),

  new Statement(NS.argu('BlogPost'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('BlogPost'), NS.rdfs('label'), Term.literalByValue('Blogpost', languages.en)),
  new Statement(NS.argu('BlogPost'), NS.rdfs('label'), Term.literalByValue('Blogpost', languages.nl)),
  new Statement(NS.argu('BlogPost'), NS.schema('description'), Term.literalByValue('An Blogpost is a message or article in which something is shared.', languages.en)),
  new Statement(NS.argu('BlogPost'), NS.schema('description'), Term.literalByValue('Een Blogpost is een bericht of artikel waarin iets wordt gedeeld.', languages.nl)),
  new Statement(NS.argu('BlogPost'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/bullhorn')),

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
  new Statement(NS.schema('MediaObject'), NS.rdfs('label'), Term.literalByValue('Attachment', languages.en)),
  new Statement(NS.schema('MediaObject'), NS.rdfs('label'), Term.literalByValue('Bijlage', languages.nl)),
  new Statement(NS.schema('MediaObject'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.schema('MediaObject'), NS.schema('description'), Term.literalByValue('An attachment is a file which has been appended to a document to provide more information.', languages.en)),
  new Statement(NS.schema('MediaObject'), NS.schema('description'), Term.literalByValue('Een bijlage is een bestand dat bij een document gevoegd is om meer informatie te verschaffen.', languages.nl)),
  new Statement(NS.schema('MediaObject'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/file')),

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
  new Statement(NS.meeting('Meeting'), NS.rdfs('subClassOf'), Term.namedNodeByIRI('http://purl.org/NET/c4dm/event.owl#Event')),
  new Statement(NS.meeting('Meeting'), NS.rdfs('label'), Term.literalByValue('Meeting', languages.en)),
  new Statement(NS.meeting('Meeting'), NS.rdfs('label'), Term.literalByValue('Vergadering', languages.nl)),
  new Statement(NS.meeting('Meeting'), NS.schema('description'), Term.literalByValue('A meeting is an event where people discuss things and make decisions.', languages.en)),
  new Statement(NS.meeting('Meeting'), NS.schema('description'), Term.literalByValue('Een vergadering is een bijeenkomst waar mensen dingen bespreken en belsuiten nemen.', languages.nl)),
  new Statement(NS.meeting('Meeting'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/calendar')),

  new Statement(NS.meeting('AgendaItem'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.meeting('AgendaItem'), NS.rdfs('label'), Term.literalByValue('Agenda Item', languages.en)),
  new Statement(NS.meeting('AgendaItem'), NS.rdfs('label'), Term.literalByValue('Agendapunt', languages.nl)),
  new Statement(NS.meeting('AgendaItem'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.meeting('AgendaItem'), NS.schema('description'), Term.literalByValue('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
  new Statement(NS.meeting('AgendaItem'), NS.schema('description'), Term.literalByValue('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
  new Statement(NS.meeting('AgendaItem'), NS.schema('image'), Term.namedNodeByIRI('http://fontawesome.io/icon/list')),

  new Statement(NS.argu('EmailAddress'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('EmailAddress'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.argu('EmailAddress'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('email')),
];
// tslint:enable max-line-length

LRS.addOntologySchematics(ontologicalData);
// @ts-ignore TS2341
LRS.store.addStatements(ontologicalData);

export default LRS;
