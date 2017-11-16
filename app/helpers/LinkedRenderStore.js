/* eslint no-console: 0 */
import LinkedRenderStore, { anyRDFValue } from 'link-lib';
import rdf from 'rdflib';

import Error from '../components/Error';
import Loading from '../components/Loading';
import { FRONTEND_URL } from '../config';

import { authenticityHeader } from './arguHelpers';
import './linkDevTools';
import transformers from './transformers';

const LRS = new LinkedRenderStore();

LRS.onError = Error;
LRS.loadingComp = Loading;

transformers
  .transformers
  .forEach(t => LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue));

LRS.api.setAcceptForHost(FRONTEND_URL, 'text/n3');
LRS.api.setAcceptForHost('https://beta.argu.co/', 'text/n3');

LRS.namespaces.aod = rdf.Namespace('https://argu.co/ns/od#');
export const NS = LRS.namespaces;

LRS.addOntologySchematics([
  {
    '@id': 'http://www.w3.org/2000/01/rdf-schema#Resource',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/Thing',
    },
  },
  {
    '@id': 'http://www.w3.org/2002/07/owl#Thing',
    'owl:sameAs': {
      '@id': 'http://schema.org/Thing',
    },
  },
  {
    '@id': 'http://wikiba.se/ontology#Entity',
    'owl:sameAs': {
      '@id': 'http://schema.org/Thing',
    },
  },
  {
    '@id': 'http://schema.org/CreativeWork',
    '@type': 'rdfs:Class',
    'http://purl.org/dc/terms/source': {
      '@id': 'http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews',
    },
    'rdfs:comment': 'The most generic kind of creative work, including books, movies, photographs, software programs, etc.',
    'rdfs:label': 'CreativeWork',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/Thing',
    },
  },
  {
    '@id': 'http://schema.org/Argument',
    '@type': 'rdfs:Class',
    'http://purl.org/dc/terms/source': {
      '@id': 'http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews',
    },
    'rdfs:comment': 'The most generic kind of creative work, including books, movies, photographs, software programs, etc.',
    'rdfs:label': 'CreativeWork',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/Comment',
    },
  },
  {
    '@id': 'http://schema.org/Comment',
    '@type': 'rdfs:Class',
    'rdfs:comment': "A comment on an item - for example, a comment on a blog post. The comment's content is " +
    'expressed via the <a class="localLink" href="/text">text</a> property, and its topic ' +
    'via <a class="localLink" href="/about">about</a>, properties shared with all CreativeWorks.',
    'rdfs:label': 'Comment',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/CreativeWork',
    },
  },
  {
    '@id': 'https://argu.co/ns/core#Question',
    '@type': 'rdfs:Class',
    'rdfs:comment': '',
    'rdfs:label': 'Challenge',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/CreativeWork',
    },
  },
  {
    '@id': 'http://schema.org/Thing',
    '@type': 'rdfs:Class',
    'rdfs:comment': 'The most generic type of item.',
    'rdfs:label': 'Thing',
  },
  {
    '@id': 'http://schema.org/Person',
    '@type': 'rdfs:Class',
    'http://purl.org/dc/terms/source': {
      '@id': 'http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews',
    },
    'http://www.w3.org/2002/07/owl#equivalentClass': {
      '@id': 'http://xmlns.com/foaf/0.1/Person',
    },
    'rdfs:comment': 'A person (alive, dead, undead, or fictional).',
    'rdfs:label': 'Person',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/Thing',
    },
  },
  {
    '@id': 'http://xmlns.com/foaf/0.1/name',
    'owl:sameAs': {
      '@id': 'http://schema.org/name',
    },
  },
  {
    '@id': 'https://argu.co/ns/od#title',
    'owl:sameAs': {
      '@id': 'http://schema.org/name',
    },
  },
  {
    '@id': 'https://argu.co/ns/od#Motie',
    'owl:sameAs': {
      '@id': 'https://argu.co/ns/core#Motion',
    },
  },
  {
    '@id': 'https://argu.co/ns/od#Amendement',
    'owl:sameAs': {
      '@id': 'https://argu.co/ns/core#Motion',
    },
  },
  {
    '@id': 'https://argu.co/ns/od#createdAt',
    'owl:sameAs': {
      '@id': 'http://schema.org/dateCreated',
    },
  },
  {
    '@id': 'https://argu.co/ns/core#Motion',
    '@type': 'rdfs:Class',
    'rdfs:label': 'Motion',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/CreativeWork',
    },
  },
  {
    '@id': 'https://argu.co/ns/core#Argument',
    '@type': 'rdfs:Class',
    'rdfs:label': 'Argument',
    'rdfs:subClassOf': {
      '@id': 'http://schema.org/CreativeWork',
    },
  },
  {
    '@id': 'https://argu.co/ns/od#text',
    'owl:sameAs': {
      '@id': 'http://schema.org/text',
    },
  },
  {
    '@id': 'https://argu.co/ns/core#VoteCollection',
    'owl:sameAs': {
      '@id': 'https://argu.co/ns/core#Collection',
    },
  },
]);

LRS.execActionByIRI = function execActionByIRI(subject) {
  let object, url;
  this
    .getEntity(new rdf.NamedNode(subject))
    .then((action) => {
      object = this.getEntity(anyRDFValue(action, NS.schema('object')));
      return this.getEntity(anyRDFValue(action, NS.schema('target')));
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
}
