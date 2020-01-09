import rdf from '@ontologies/core';
import Enzyme from 'enzyme';
import { toExist, toIncludeText } from 'enzyme-matchers';

Enzyme.ReactWrapper.prototype.findSubject = function findSubject(iri) {
  return this.find('Resource').find({ subject: iri }).first();
};

expect.extend({
  toRenderProperty(tree, iri, content) {
    const elem = tree
      .findWhere(e => e.name() === 'Property' && (
        Array.isArray(e.prop('label'))
          ? e.prop('label').some(label => rdf.equals(label, iri))
          : rdf.equals(e.prop('label'), iri)
      ));

    const { pass } = content
      ? toIncludeText(elem, content)
      : toExist(elem);

    return {
      message: () => `Could not find value '${content}' for property ${iri}`,
      pass,
    };
  },

  toRenderResource(tree, iri, topology) {
    const elem = tree.findSubject(iri);
    const subject = elem.prop('subject');
    const top = elem.prop('topology');

    if (typeof topology !== 'undefined') {
      return {
        message: () => `Expected resource ${iri} with topology ${topology} but found ${subject} with topology ${top} `,
        pass: rdf.equals(iri, subject) && rdf.equals(topology, top),
      };
    }

    return {
      message: () => `Expected resource ${iri} but found ${subject}`,
      pass: rdf.equals(iri, subject),
    };
  },

  toRenderView(tree, view) {
    const displayName = view?.displayName || view?.name;
    if (typeof displayName === 'undefined') {
      throw Error('No displayName nor name for component given');
    }
    const elem = tree.find(displayName);

    const { pass } = toExist(elem);

    return {
      message: () => `Could not find view ${view}`,
      pass,
    };
  },
});
