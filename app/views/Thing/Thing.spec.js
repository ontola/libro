import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';

import components from './index';

const parent = new NamedNode('http://example.com/page/1');
const resource = new NamedNode('http://example.com/thing/1');

const resources = {
  [parent]: {
    [NS.rdf('type')]: NS.schema('Thing'),
    [NS.schema('name')]: new Literal('Parent resource'),
  },
  [resource]: {
    [NS.rdf('type')]: NS.schema('Thing'),
    [NS.schema('isPartOf')]: parent,
    [NS.schema('name')]: new Literal('Test item'),
    [NS.schema('text')]: new Literal('Body text'),
  },
};

describeView('Thing', components, resources, resource, () => {
  it('renders a Thing', () => {
    expect(subject.find(marker('thing'))).toExist();
  });

  it('renders the name', () => {
    expect(subject.find(marker('name', 'card', 'main'))).toExist();
  });

  it('renders the text', () => {
    expect(subject.find(marker('text'))).toExist();
  });

  it('renders the parent', () => {
    expect(subject.find(marker('parent'))).toExist();
  });

  as(NS.argu('card'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'card'))).toExist();
    });

    it('renders the text', () => {
      expect(subject.find(marker('text', 'card'))).toExist();
    });
  });

  as(NS.argu('inline'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'inline'))).toExist();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });
  });

  as(NS.argu('section'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'card', 'preview'))).toExist();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });
  });

  as(NS.argu('parent'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('parent'))).toExist();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).not.toExist();
    });
  });
});
