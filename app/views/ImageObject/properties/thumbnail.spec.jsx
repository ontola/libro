import { Property } from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../../../tests/index';

import components from './thumbnail';

const resource = new NamedNode('http://example.com/image/1');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('thumbnail')]: new NamedNode('http://example.com/1.thumb.png'),
    [NS.schema('url')]: new NamedNode('http://example.com/1.png'),
  }
};

describeView('ImageObject', components, resources, resource, () => {
  set('ch', () => <Property label={NS.schema('thumbnail')} />);

  it('renders a thumbnail', () => {
    expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
  });

  it('passes the correct url', () => {
    expect(subject.find(marker('ImageObjectThumbnail'))).toHaveProp('imageUrl', 'http://example.com/1.thumb.png');
  });
});
