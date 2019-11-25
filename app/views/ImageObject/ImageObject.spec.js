import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';

import { NS } from '../../../tests';
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
    [NS.argu('url')]: rdf.namedNode(url),
    [NS.ontola('imgUrl1500x2000')]: rdf.namedNode(coverUrl),
    [NS.ontola('imgUrl568x400')]: rdf.namedNode(boxUrl),
    [schema.dateCreated]: rdf.literal(Date.now()),
    [NS.argu('imagePositionY')]: rdf.literal(imagePositionY),
  },
};

describeView('ImageObject', components, resources, resource, () => {
  it('renders a large cover', () => {
    expect(subject.find(marker('cover'))).toHaveProp('url', coverUrl);
  });

  as(NS.argu('card'), () => {
    it('renders a small cover', () => {
      expect(subject.find(marker('cover'))).toHaveProp('url', boxUrl);
    });
  });

  as(NS.argu('cardFixed'), () => {
    it('renders a small cover', () => {
      expect(subject.find(marker('cover'))).toHaveProp('url', boxUrl);
    });
  });

  as(NS.argu('cardMain'), () => {
    it('renders an image', () => {
      expect(subject.find(marker('image'))).toHaveProp('src', url);
    });
  });

  as(NS.argu('detail'), () => {
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

  as(NS.argu('voteBubble'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });
});
