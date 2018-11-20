/* eslint no-console: 0 */
import {
  createStore,
  memoizedNamespace,
  MiddlewareFn,
} from 'link-lib';
import {
  Formula,
  Literal,
  NamedNode,
  Node,
  SomeTerm,
  Statement,
} from 'rdflib';

import { FRONTEND_ACCEPT, FRONTEND_URL } from '../config';

import history from './history';
import ontolaMiddleware from './ontolaMiddleware';
import transformers from './transformers';

const middleware: Array<MiddlewareFn<any>> = [
  () => (next) => (a, o) => {
    if (!__PRODUCTION__) {
      // tslint:disable-next-line no-console
      console.log('Link action:', a, o);
    }
    return next(a, o);
  },
  ontolaMiddleware(history),
];

const LRS = createStore({}, middleware);

// @ts-ignore TS2341
transformers.forEach((t) => LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue));

// @ts-ignore TS2341
LRS.api.setAcceptForHost(FRONTEND_URL, FRONTEND_ACCEPT);

LRS.namespaces.app = memoizedNamespace(FRONTEND_URL.endsWith('/') ? FRONTEND_URL : `${FRONTEND_URL}/`);
LRS.namespaces.aod = memoizedNamespace('https://argu.co/ns/od#');
LRS.namespaces.meeting = memoizedNamespace('https://argu.co/ns/meeting/');
LRS.namespaces.sh = memoizedNamespace('http://www.w3.org/ns/shacl#');
LRS.namespaces.opengov = memoizedNamespace('http://www.w3.org/ns/opengov#');
LRS.namespaces.person = memoizedNamespace('http://www.w3.org/ns/person#');
LRS.namespaces.fa4 = memoizedNamespace('http://fontawesome.io/icon/');

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

  new Statement(NS.schema('CreativeWork'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('CreativeWork'), NS.dc('source'), new NamedNode('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('comment'), new Literal('The most generic kind of creative work, including books, movies, photographs, software programs, etc.', languages.en)),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('label'), new Literal('CreativeWork', languages.en)),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('subClassOf'), NS.schema('Thing')),

  new Statement(NS.schema('Comment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Comment'), NS.rdfs('comment'), new Literal("A comment on an item - for example, a comment on a blog post. The comment's content is "
    + 'expressed via the <a class="localLink" href="/text">text</a> property, and its topic '
    + 'via <a class="localLink" href="/about">about</a>, properties shared with all CreativeWorks.')),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), new Literal('Comment', languages.en)),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), new Literal('Reactie', languages.nl)),
  new Statement(NS.schema('Comment'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.schema('Comment'), NS.schema('description'), new Literal('A comment is a (brief) written response or note about a thing.', languages.en)),
  new Statement(NS.schema('Comment'), NS.schema('description'), new Literal('Een reactie is een (korte) geschreven antwoord of notitie over een ding.', languages.nl)),

  new Statement(NS.argu('Question'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Question'), NS.rdfs('label'), new Literal('Challenge', languages.en)),
  new Statement(NS.argu('Question'), NS.rdfs('label'), new Literal('Uitdaging', languages.nl)),
  new Statement(NS.argu('Question'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Question'), NS.schema('description'), new Literal('A challenge is a problem or question to which people can submit their ideas.', languages.en)),
  new Statement(NS.argu('Question'), NS.schema('description'), new Literal('Een uitdaging is een probleem of vraagstuk waar ideeën op kunnen worden ingediend.', languages.nl)),
  new Statement(NS.argu('Question'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/question')),

  new Statement(NS.schema('Thing'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Thing'), NS.rdfs('comment'), new Literal('The most generic type of item.')),
  new Statement(NS.schema('Thing'), NS.rdfs('label'), new Literal('Thing', languages.en)),
  new Statement(NS.schema('Thing'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('name')),

  new Statement(NS.schema('Person'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Person'), NS.dc('source'), new NamedNode('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('Person'), NS.owl('equivalentClass'), NS.foaf('Person')),
  new Statement(NS.schema('Person'), NS.rdfs('comment'), new Literal('A person (alive, dead, undead, or fictional).', languages.en)),
  new Statement(NS.schema('Person'), NS.rdfs('label'), new Literal('Person', languages.en)),
  new Statement(NS.schema('Person'), NS.rdfs('label'), new Literal('Persoon', languages.nl)),
  new Statement(NS.schema('Person'), NS.rdfs('subClassOf'), NS.schema('Thing')),

  new Statement(NS.foaf('name'), NS.owl('sameAs'), NS.schema('name')),
  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),

  new Statement(NS.argu('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), new Literal('Idea', languages.en)),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), new Literal('Idee', languages.nl)),
  new Statement(NS.argu('Motion'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Motion'), NS.schema('description'), new Literal('An idea is a proposal on which people can vote and add pro- or con arguments.', languages.en)),
  new Statement(NS.argu('Motion'), NS.schema('description'), new Literal('Een idee is een voorstel waar je voor of tegen kan zijn.', languages.nl)),
  new Statement(NS.argu('Motion'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/lightbulb-o')),

  new Statement(NS.opengov('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.opengov('Motion'), NS.rdfs('label'), new Literal('Motion', languages.en)),
  new Statement(NS.opengov('Motion'), NS.rdfs('label'), new Literal('Motie', languages.nl)),

  new Statement(NS.argu('Argument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), new Literal('Argument', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), new Literal('Argument', languages.nl)),
  new Statement(NS.argu('Argument'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), new Literal('An argument is a single reason in favor or against an idea.', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), new Literal('Een argument is een enkele reden voor of tegen een idee.', languages.nl)),

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
  new Statement(NS.argu('Comment'), NS.rdfs('label'), new Literal('Comment', languages.en)),
  new Statement(NS.argu('Comment'), NS.rdfs('label'), new Literal('Reactie', languages.nl)),
  new Statement(NS.argu('Comment'), NS.schema('description'), new Literal('A comment is a written response or note about a thing.', languages.en)),
  new Statement(NS.argu('Comment'), NS.schema('description'), new Literal('Een reactie is een geschreven antwoord of notitie over een ding.', languages.nl)),
  new Statement(NS.argu('Comment'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/comment')),

  new Statement(NS.argu('BlogPost'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('BlogPost'), NS.rdfs('label'), new Literal('Blogpost', languages.en)),
  new Statement(NS.argu('BlogPost'), NS.rdfs('label'), new Literal('Blogpost', languages.nl)),
  new Statement(NS.argu('BlogPost'), NS.schema('description'), new Literal('An Blogpost is a message or article in which something is shared.', languages.en)),
  new Statement(NS.argu('BlogPost'), NS.schema('description'), new Literal('Een Blogpost is een bericht of artikel waarin iets wordt gedeeld.', languages.nl)),
  new Statement(NS.argu('BlogPost'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/bullhorn')),

  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),

  new Statement(NS.schema('MediaObject'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('MediaObject'), NS.rdfs('label'), new Literal('Attachment', languages.en)),
  new Statement(NS.schema('MediaObject'), NS.rdfs('label'), new Literal('Bijlage', languages.nl)),
  new Statement(NS.schema('MediaObject'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.schema('MediaObject'), NS.schema('description'), new Literal('An attachment is a file which has been appended to a document to provide more information.', languages.en)),
  new Statement(NS.schema('MediaObject'), NS.schema('description'), new Literal('Een bijlage is een bestand dat bij een document gevoegd is om meer informatie te verschaffen.', languages.nl)),
  new Statement(NS.schema('MediaObject'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/file')),

  new Statement(NS.schema('ImageObject'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),
  new Statement(NS.schema('VideoObject'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),

  new Statement(NS.schema('Action'), NS.rdf('type'), NS.rdfs('Class')),

  new Statement(NS.schema('CreateAction'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('CreateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

  new Statement(NS.schema('UpdateAction'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('UpdateAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

  new Statement(NS.argu('CreateAction'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateAction'), NS.rdfs('subClassOf'), NS.schema('CreateAction')),

  new Statement(NS.argu('CreateComment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateComment'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('CreateProArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateProArgument'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('CreateConArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateConArgument'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('CreateBlogPost'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateBlogPost'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('CreateComment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateComment'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('CreateMotion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateMotion'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('CreateVote'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('CreateVote'), NS.rdfs('subClassOf'), NS.argu('CreateAction')),

  new Statement(NS.argu('TrashAction'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('TrashAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

  new Statement(NS.argu('UntrashAction'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('UntrashAction'), NS.rdfs('subClassOf'), NS.schema('Action')),

  new Statement(NS.meeting('Meeting'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.meeting('Meeting'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.meeting('Meeting'), NS.rdfs('subClassOf'), new NamedNode('http://purl.org/NET/c4dm/event.owl#Event')),
  new Statement(NS.meeting('Meeting'), NS.rdfs('label'), new Literal('Meeting', languages.en)),
  new Statement(NS.meeting('Meeting'), NS.rdfs('label'), new Literal('Vergadering', languages.nl)),
  new Statement(NS.meeting('Meeting'), NS.schema('description'), new Literal('A meeting is an event where people discuss things and make decisions.', languages.en)),
  new Statement(NS.meeting('Meeting'), NS.schema('description'), new Literal('Een vergadering is een bijeenkomst waar mensen dingen bespreken en belsuiten nemen.', languages.nl)),
  new Statement(NS.meeting('Meeting'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/calendar')),

  new Statement(NS.meeting('AgendaItem'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.meeting('AgendaItem'), NS.rdfs('label'), new Literal('Agenda Item', languages.en)),
  new Statement(NS.meeting('AgendaItem'), NS.rdfs('label'), new Literal('Agendapunt', languages.nl)),
  new Statement(NS.meeting('AgendaItem'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.meeting('AgendaItem'), NS.schema('description'), new Literal('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
  new Statement(NS.meeting('AgendaItem'), NS.schema('description'), new Literal('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
  new Statement(NS.meeting('AgendaItem'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/list')),

  new Statement(NS.argu('EmailAddress'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('EmailAddress'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.argu('EmailAddress'), NS.ontola('forms/inputs/select/displayProp'), NS.schema('email')),
];
// tslint:enable max-line-length

LRS.addOntologySchematics(ontologicalData);
// @ts-ignore TS2341
LRS.store.addStatements(ontologicalData);

export default LRS;
