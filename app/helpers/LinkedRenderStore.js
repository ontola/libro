/* eslint no-console: 0 */
import LinkedRenderStore, { memoizedNamespace } from 'link-lib';
import { Literal, NamedNode, Statement } from 'rdflib';

import { FRONTEND_URL } from '../config';

import transformers from './transformers';
import ontolaMiddleware from './ontolaMiddleware';

const LRS = new LinkedRenderStore({
  middleware: [
    () => next => (a, o) => {
      console.log('Link action:', a, o);
      return next(a, o);
    },
    ontolaMiddleware,
  ],
});

transformers
  .transformers
  .forEach(t => LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue));

LRS.api.setAcceptForHost(FRONTEND_URL, 'application/n-quads');

LRS.namespaces.app = memoizedNamespace(FRONTEND_URL.endsWith('/') ? FRONTEND_URL : `${FRONTEND_URL}/`);
LRS.namespaces.aod = memoizedNamespace('https://argu.co/ns/od#');
LRS.namespaces.council = memoizedNamespace('https://argu.co/ns/0.1/gov/council#');
LRS.namespaces.sh = memoizedNamespace('http://www.w3.org/ns/shacl#');
LRS.namespaces.opengov = memoizedNamespace('http://www.w3.org/ns/opengov#');

export const NS = LRS.namespaces;

export const allTopologies = [
  undefined,
  NS.argu('actionsBar'),
  NS.argu('card'),
  NS.argu('cardAppendix'),
  NS.argu('cardFixed'),
  /**
   * In the top right corner of a card
   */
  NS.argu('cardFloat'),
  NS.argu('cardHover'),
  /**
   * A list inside a CardContent
   */
  NS.argu('cardList'),
  NS.argu('cardMain'),
  NS.argu('cardRow'),
  NS.argu('cardVoteEvent'),
  NS.argu('collection'),
  NS.argu('container'),
  NS.argu('detail'),
  NS.argu('dropdownContent'),
  NS.argu('formFooter'),
  NS.argu('grid'),
  NS.argu('header'),
  NS.argu('inline'),
  NS.argu('omniformFields'),
  NS.argu('parent'),
  NS.argu('popup'),
  NS.argu('sidebar'),
  NS.argu('tabBar'),
  NS.argu('voteBubble'),
  NS.argu('voteEvent'),
  NS.argu('voteEventResult'),
  NS.argu('voteEventResultCard'),
  NS.argu('voteEventSide'),
  NS.argu('widget'),
];

export function allTopologiesExcept(...topologies) {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.indexOf(t);
    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export const getTopologyNumber = topology => allTopologies.findIndex((item) => {
  if (item) {
    return item.term === topology.term;
  }
  return topology === item;
});

const languages = {
  en: 'en',
  nl: 'nl',
};

const ontologicalData = [
  new Statement(NS.rdfs('Resource'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.owl('Thing'), NS.owl('sameAs'), NS.schema('Thing')),

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

  new Statement(NS.argu('Argument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), new Literal('Argument', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), new Literal('Argument', languages.nl)),
  new Statement(NS.argu('Argument'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), new Literal('An argument is a single reason in favor or against an idea.', languages.en)),
  new Statement(NS.argu('Argument'), NS.rdfs('description'), new Literal('Een argument is een enkele reden voor of tegen een idee.', languages.nl)),

  new Statement(NS.argu('ConArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ConArgument'), NS.rdfs('label'), new Literal('Argument against', languages.en)),
  new Statement(NS.argu('ConArgument'), NS.rdfs('label'), new Literal('Argument tegen', languages.nl)),
  new Statement(NS.argu('ConArgument'), NS.rdfs('subClassOf'), NS.schema('Argument')),
  new Statement(NS.argu('ConArgument'), NS.schema('description'), new Literal('A con argumen is a reason to be against something.', languages.en)),
  new Statement(NS.argu('ConArgument'), NS.schema('description'), new Literal('Een tegenargument is een reden om ergens voor.', languages.nl)),
  new Statement(NS.argu('ConArgument'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/minus')),
  new Statement(NS.argu('ConArgument'), NS.rdfs('subClassOf'), NS.argu('Argument')),

  new Statement(NS.argu('ProArgument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('ProArgument'), NS.rdfs('label'), new Literal('Argument in favour', languages.en)),
  new Statement(NS.argu('ProArgument'), NS.rdfs('label'), new Literal('Argument voor', languages.nl)),
  new Statement(NS.argu('ProArgument'), NS.rdfs('subClassOf'), NS.schema('Argument')),
  new Statement(NS.argu('ProArgument'), NS.schema('description'), new Literal('A pro argument is a reason to be in favor of something.', languages.en)),
  new Statement(NS.argu('ProArgument'), NS.schema('description'), new Literal('Een voorargument is een reden om ergens voor te zijn.', languages.nl)),
  new Statement(NS.argu('ProArgument'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/plus')),
  new Statement(NS.argu('ProArgument'), NS.rdfs('subClassOf'), NS.argu('Argument')),

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

  new Statement(NS.argu('InfiniteCollectionView'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('InfiniteCollectionView'), NS.rdfs('subClassOf'), NS.as('CollectionPage')),

  new Statement(NS.opengov('Event'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.opengov('Event'), NS.rdfs('label'), new Literal('Event', languages.en)),
  new Statement(NS.opengov('Event'), NS.rdfs('label'), new Literal('Gebeurtenis', languages.nl)),
  new Statement(NS.opengov('Event'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.opengov('Event'), NS.schema('description'), new Literal('An event is an occurrence that people may attend.', languages.en)),
  new Statement(NS.opengov('Event'), NS.schema('description'), new Literal('Een gebeurtenis is iets dat mensen kunnen bijwonen.', languages.nl)),
  new Statement(NS.opengov('Event'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/calendar')),

  new Statement(NS.council('AgendaItem'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.council('AgendaItem'), NS.rdfs('label'), new Literal('Agenda Item', languages.en)),
  new Statement(NS.council('AgendaItem'), NS.rdfs('label'), new Literal('Agendapunt', languages.nl)),
  new Statement(NS.council('AgendaItem'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.council('AgendaItem'), NS.schema('description'), new Literal('An Agenda Item is a topic that is discussed during a meeeting.', languages.en)),
  new Statement(NS.council('AgendaItem'), NS.schema('description'), new Literal('Een Agendapunt is een onderwerp dat wordt besproken tijdens een vergadering.', languages.nl)),
  new Statement(NS.council('AgendaItem'), NS.schema('image'), new NamedNode('http://fontawesome.io/icon/list')),

  new Statement(NS.council('Attachment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.council('Attachment'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.council('Attachment'), NS.rdfs('subClassOf'), NS.schema('MediaObject')),
];

LRS.addOntologySchematics(ontologicalData);
LRS.store.addStatements(ontologicalData);

try {
  LRS.getEntity(new NamedNode(window.location.href));
} catch (e) {
  console.error('preload failed');
}

export default LRS;
