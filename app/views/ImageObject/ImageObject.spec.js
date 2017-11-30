import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests/index';

import components from './index';

const resource = new NamedNode('http://example.com/image/1');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('thumbnail')]: new NamedNode('http://example.com/image/1.ico'),
    [NS.schema('url')]: new NamedNode('http://example.com/image/1.jpg'),
    [NS.schema('dateCreated')]: new Literal(Date.now()),
  }
};

describeView('ImageObject', components, resources, resource, () => {
  it('renders a thumbnail', () => {
    expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
  });

  as(NS.argu('collection'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
    });
  });

  as(NS.argu('detail'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
    });
  });

  as(NS.argu('sidebar'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('sidebar'))).toBePresent();
      expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
    });
  });

  as(NS.argu('voteBubble'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
    });
  });

  as(NS.argu('sidebarBlock'), () => {
    it('renders a thumbnail', () => {
      expect(subject.find(marker('ImageObjectThumbnail'))).toBePresent();
    });
  });
});
