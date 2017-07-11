/* eslint no-console: 0 */
import LinkedRenderStore, { DataWorkerLoader } from 'link-lib';
import { PropTypes } from 'react';

import DataWorker from 'worker-loader!../workers/DataWorker';
import transformers from './transformers';

import Error from '../components/Error';

const LRS = new LinkedRenderStore();

LRS.onError = Error;

if (typeof window !== 'undefined' && window.Worker) {
  LRS.api.processor = new DataWorkerLoader(DataWorker);
} else {
  transformers.transformers.forEach(
    t => LRS.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue)
  );
}

LRS.api.setAcceptForHost('https://argu.dev/', 'application/vnd.api+json');
LRS.api.setAcceptForHost('https://beta.argu.dev/', 'application/vnd.api+json');
LRS.api.setAcceptForHost('https://argu.co/', 'application/vnd.api+json');
LRS.api.setAcceptForHost('https://aod-search.argu.co/', 'application/vnd.api+json');
LRS.api.setAcceptForHost('https://beta.argu.co/', 'application/vnd.api+json');

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

const linkedPropVal = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  undefined,
]);

export {
  linkedPropVal,
};

export default LRS;
window.LRS = LRS;
