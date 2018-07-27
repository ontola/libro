import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';

import components from './index';

const resource = new NamedNode('http://example.com/image/1');
const imagePositionY = 23;
const url = 'http://example.com/image/1.jpg';

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('thumbnail')]: new NamedNode('http://example.com/image/1.ico'),
    [NS.schema('url')]: new NamedNode(url),
    [NS.schema('dateCreated')]: new Literal(Date.now()),
    [NS.argu('imagePositionY')]: Literal.fromValue(imagePositionY),
  },
};

describeView('ImageObject', components, resources, resource, () => {
  it('renders a cover', () => {
    expect(subject.find(marker('cover'))).toExist();
  });

  it('passed the Y position', () => {
    expect(subject.find(marker('cover'))).toHaveProp('positionY', imagePositionY);
  });

  it('passed the url', () => {
    expect(subject.find(marker('cover'))).toHaveProp('url', url);
  });

  as(NS.argu('card'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('cover'))).toExist();
    });
  });

  as(NS.argu('cardFixed'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('cover'))).toExist();
    });
  });

  as(NS.argu('cardMain'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('cover'))).toExist();
    });
  });

  as(NS.argu('collection'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toExist();
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
