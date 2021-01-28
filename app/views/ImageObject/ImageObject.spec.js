import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import components from './index';

const resource = rdf.namedNode('http://example.com/image/1');
const imagePositionY = 23;
const url = 'http://example.com/image/1.jpg';
const coverUrl = 'http://example.com/image/cover_1.jpg';
const boxUrl = 'http://example.com/image/box_1.jpg';

const resources = {
  [resource]: {
    [rdfx.type]: schema.ImageObject,
    [schema.thumbnail]: rdf.namedNode('http://example.com/image/1.ico'),
    [schema.url]: rdf.namedNode(url),
    [schema.contentUrl]: rdf.namedNode(url),
    [argu.url]: rdf.namedNode(url),
    [ontola.imgUrl1500x2000]: rdf.namedNode(coverUrl),
    [ontola.imgUrl568x400]: rdf.namedNode(boxUrl),
    [schema.dateCreated]: rdf.literal(Date.now()),
    [ontola.imagePositionY]: rdf.literal(imagePositionY),
  },
};

describeView('ImageObject', components, resources, resource, () => {
  as(argu.cardMain, () => {
    it('renders an image', () => {
      expect(subject.find(marker('image'))).toHaveProp('src', url);
    });
  });

  as(argu.detail, () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });

  as(navbarTopology, () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('navbar'))).toExist();
      expect(subject.find(marker('ImageObjectBox'))).toExist();
    });
  });

  as(argu.voteBubble, () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });
});
