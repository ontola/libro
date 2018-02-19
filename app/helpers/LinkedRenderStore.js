/* eslint no-console: 0 */
import LinkedRenderStore, { anyRDFValue, memoizedNamespace } from 'link-lib';
import { Literal, NamedNode, Statement } from 'rdflib';

import Error from '../components/Error';
import Loading from '../components/Loading';
import { FRONTEND_URL } from '../config';

import { authenticityHeader } from './arguHelpers';
import LinkDevTools from './LinkDevTools';
import transformers from './transformers';

const LRS = new LinkedRenderStore();

LRS.onError = Error;
LRS.loadingComp = Loading;

transformers
  .transformers
  .forEach(t => LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue));

LRS.api.setAcceptForHost(FRONTEND_URL, 'text/n3');
LRS.api.setAcceptForHost('https://beta.argu.co/', 'text/n3');

LRS.namespaces.app = memoizedNamespace(FRONTEND_URL.endsWith('/') ? FRONTEND_URL : `${FRONTEND_URL}/`);
LRS.namespaces.aod = memoizedNamespace('https://argu.co/ns/od#');
LRS.namespaces.council = memoizedNamespace('https://argu.co/ns/0.1/gov/council#');

export const NS = LRS.namespaces;

export const allTopologies = [
  undefined,
  NS.argu('card'),
  NS.argu('cardFixed'),
  NS.argu('cardHover'),
  NS.argu('cardMain'),
  NS.argu('cardRow'),
  NS.argu('collection'),
  NS.argu('container'),
  NS.argu('detail'),
  NS.argu('inline'),
  NS.argu('sidebar'),
  NS.argu('sidebarBlock'),
  NS.argu('section'),
  NS.argu('grid'),
  NS.argu('voteBubble'),
  NS.argu('widget'),
];

LRS.addOntologySchematics([
  new Statement(NS.rdfs('Resource'), NS.rdfs('subClassOf'), NS.schema('Thing')),
  new Statement(NS.owl('Thing'), NS.owl('sameAs'), NS.schema('Thing')),

  new Statement(NS.schema('CreativeWork'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('CreativeWork'), NS.dc('source'), new NamedNode('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('comment'), new Literal('The most generic kind of creative work, including books, movies, photographs, software programs, etc.')),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('label'), new Literal('CreativeWork')),
  new Statement(NS.schema('CreativeWork'), NS.rdfs('subClassOf'), NS.schema('Thing')),

  new Statement(NS.schema('Comment'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Comment'), NS.rdfs('comment'), new Literal("A comment on an item - for example, a comment on a blog post. The comment's content is " +
    'expressed via the <a class="localLink" href="/text">text</a> property, and its topic ' +
    'via <a class="localLink" href="/about">about</a>, properties shared with all CreativeWorks.')),
  new Statement(NS.schema('Comment'), NS.rdfs('label'), new Literal('Comment')),
  new Statement(NS.schema('Comment'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),

  new Statement(NS.argu('Question'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Question'), NS.rdfs('label'), new Literal('Challenge')),
  new Statement(NS.argu('Question'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),

  new Statement(NS.schema('Thing'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Thing'), NS.rdfs('comment'), new Literal('The most generic type of item.')),
  new Statement(NS.schema('Thing'), NS.rdfs('label'), new Literal('Thing')),


  new Statement(NS.schema('Person'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.schema('Person'), NS.dc('source'), new NamedNode('http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews')),
  new Statement(NS.schema('Person'), NS.owl('equivalentClass'), NS.foaf('Person')),
  new Statement(NS.schema('Person'), NS.rdfs('comment'), new Literal('A person (alive, dead, undead, or fictional).')),
  new Statement(NS.schema('Person'), NS.rdfs('label'), new Literal('Person')),
  new Statement(NS.schema('Person'), NS.rdfs('subClassOf'), NS.schema('Thing')),


  new Statement(NS.foaf('name'), NS.owl('sameAs'), NS.schema('name')),
  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),

  new Statement(NS.argu('Motion'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Motion'), NS.rdfs('label'), new Literal('Motion')),
  new Statement(NS.argu('Motion'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),

  new Statement(NS.argu('Argument'), NS.rdf('type'), NS.rdfs('Class')),
  new Statement(NS.argu('Argument'), NS.rdfs('label'), new Literal('Argument')),
  new Statement(NS.argu('Argument'), NS.rdfs('subClassOf'), NS.schema('CreativeWork')),

  new Statement(NS.aod('title'), NS.owl('sameAs'), NS.schema('name')),
]);

LRS.execActionByIRI = function execActionByIRI(subject) {
  let object, url;
  this
    .getEntity(subject)
    .then((action) => {
      object = this.getResourceProperty(action, NS.schema('object'));
      return this.getResourceProperties(action, NS.schema('target'));
    })
    .then((target) => {
      url = anyRDFValue(target, NS.schema('url'));
      const targetMethod = anyRDFValue(target, NS.schema('method'));
      const method = typeof targetMethod !== 'undefined' ? targetMethod.toString() : 'GET';
      const opts = {
        credentials: 'include',
        headers: authenticityHeader({
          Accept: LRS.api.processor.accept[new URL(url.value).origin],
        }),
        method: method.toUpperCase(),
        mode: 'same-origin',
      };
      return fetch(url.value, opts);
    })
    .then(resp => Promise.all([LRS.api.processor.feedResponse(url, resp), object]))
    .then(([statements, objectRef]) => {
      this.replaceStatements(objectRef, statements);
    });
};

export default LRS;
if (typeof window !== 'undefined') {
  window.LRS = LRS;
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    window.dev = new LinkDevTools('');
  }
}
