/* eslint no-console: 0 */
// import fetch from 'isomorphic-fetch';
import formatProvider from 'rdf-formats-common';
import LinkedRenderStore, { processors } from 'link-lib';
import React from 'react';

const formats = formatProvider();
const PRIO_MAX = 1.0;
const PRIO_HIGH = 0.8;

LinkedRenderStore.api.registerProcessor(processors.jsonapi, 'application/vnd.api+json', PRIO_MAX);
const mediaTypes = Object.keys(formats.parsers);
const rdf = mediaTypes.splice(mediaTypes.indexOf('application/rdf+xml'), PRIO_MAX);
LinkedRenderStore.api.registerProcessor(processors.rdfFormatsCommon, mediaTypes, PRIO_HIGH);
if (rdf[0]) {
  LinkedRenderStore.api.registerProcessor(processors.rdfFormatsCommon, 'application/rdf+xml', PRIO_MAX);
}

LinkedRenderStore.api.setAcceptForHost('https://argu.local/', 'application/vnd.api+json');
LinkedRenderStore.api.setAcceptForHost('https://argu.co/', 'application/vnd.api+json');

function getErrorMessage(code) {
  switch (code) {
    case 404:
      return 'Object could not be found';
    default:
      return 'An unknown error occurred';
  }
}
LinkedRenderStore.onError =
  props => (<p>{getErrorMessage(props.data.get('http://www.w3.org/2011/http#statusCodeValue'))}</p>);

LinkedRenderStore.addOntologySchematics([
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
    '@id': 'https://argu.co/ns/core#Challenge',
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
]);

// fetch('/graph.jsonld')
//   .then(graph => graph.json())
//   .then((graph) => {
//     LinkedRenderStore.addOntologySchematics(graph['@graph']);
//   });

export default LinkedRenderStore;
window.LRS = LinkedRenderStore;
