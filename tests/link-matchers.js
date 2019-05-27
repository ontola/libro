import Enzyme from 'enzyme';
import { toExist, toIncludeText } from 'enzyme-matchers';

Enzyme.ReactWrapper.prototype.findSubject = function findSubject(iri) {
  return this.find('LinkedResourceContainer').find({ subject: iri }).first();
};

expect.extend({
  toRenderProperty(tree, iri, content) {
    const elem = tree
      .findWhere(e => e.name() === 'Property' && (
        Array.isArray(e.prop('label'))
          ? e.prop('label').includes(iri)
          : e.prop('label') === iri
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
        pass: iri === subject && topology === top,
      };
    }

    return {
      message: () => `Expected resource ${iri} but found ${subject}`,
      pass: iri === subject,
    };
  },

  toRenderView(tree, view) {
    const elem = tree.find(view.displayName);

    const { pass } = toExist(elem);

    return {
      message: () => `Could not find view ${view}`,
      pass,
    };
  },
});