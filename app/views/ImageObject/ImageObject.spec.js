import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';

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
    [NS.argu('url')]: new NamedNode(url),
    [NS.argu('imgUrl1500x600')]: new NamedNode(coverUrl),
    [NS.argu('imgUrl568x400')]: new NamedNode(boxUrl),
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
    it('renders a small cover', () => {
      expect(subject.find(marker('cover'))).toHaveProp('url', boxUrl);
    });
  });

  as(NS.argu('detail'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });

  as(NS.argu('sidebar'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('sidebar'))).toExist();
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });

  as(NS.argu('voteBubble'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });

  as(NS.argu('sidebar'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
    });
  });
});
