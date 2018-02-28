import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests/index';

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
  }
};

describeView('Thing', components, resources, resource, () => {
  it('renders a Thing', () => {
    expect(subject.find(marker('thing'))).toBePresent();
  });

  it('renders the name', () => {
    expect(subject.find(marker('name', 'card', 'main'))).toBePresent();
  });

  it('renders the text', () => {
    expect(subject.find(marker('text'))).toBePresent();
  });

  it('renders the parent', () => {
    expect(subject.find(marker('parent'))).toBePresent();
  });

  as(NS.argu('card'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'card'))).toBePresent();
    });

    it('renders the text', () => {
      expect(subject.find(marker('text'))).toBePresent();
    });
  });

  as(NS.argu('inline'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'inline'))).toBePresent();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).toBeEmpty();
    });
  });

  as(NS.argu('section'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'card'))).toBePresent();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).toBeEmpty();
    });
  });

  as(NS.argu('header'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('name', 'header'))).toBePresent();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).toBeEmpty();
    });
  });

  as(NS.argu('parent'), () => {
    it('renders the name', () => {
      expect(subject.find(marker('parent'))).toBePresent();
    });

    it('does not render the text', () => {
      expect(subject.find(marker('text'))).toBeEmpty();
    });
  });
});
