import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';
import { navbarTopology } from '../../topologies/Navbar';

import components from './index';

const resource = new NamedNode('http://example.com/image/1');
const imagePositionY = 23;
const url = 'http://example.com/image/1.jpg';
const coverUrl = 'http://example.com/image/cover_1.jpg';
const boxUrl = 'http://example.com/image/box_1.jpg';

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('thumbnail')]: new NamedNode('http://example.com/image/1.ico'),
    [NS.schema('url')]: new NamedNode(url),
    [NS.schema('contentUrl')]: new NamedNode(url),
    [NS.argu('url')]: new NamedNode(url),
    [NS.ontola('imgUrl1500x2000')]: new NamedNode(coverUrl),
    [NS.ontola('imgUrl568x400')]: new NamedNode(boxUrl),
    [NS.schema('dateCreated')]: new Literal(Date.now()),
    [NS.argu('imagePositionY')]: Literal.fromValue(imagePositionY),
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
