import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';

import example from '../../../ontology/example';

import components from './thumbnail';

const resource = rdf.namedNode('http://example.com/image/1');

const resources = {
  [resource]: {
    [rdfx.type]: schema.ImageObject,
    [schema.thumbnail]: rdf.namedNode('http://www.example.com/1.thumb.png'),
    [schema.url]: rdf.namedNode('http://www.example.com/1.png'),
  },
};

describeView('ImageObject', components, resources, resource, () => {
  set('ch', () => <Property label={schema.thumbnail} />);

  it('renders a thumbnail', () => {
    expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
  });

  it('passes the correct url', () => {
    expect(subject.find(marker('ImageObjectThumbnail')))
      .toHaveProp('linkedProp', example.ns('1.thumb.png'));
  });
});
