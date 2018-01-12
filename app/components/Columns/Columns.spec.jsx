import React from 'react';

import Columns from './';

const exampleChildren = [<div>Joe</div>, <div>Joe</div>];

argUnit(Columns, () => {
  describe('with node child', () => {
    setProp('children', () => <p>test</p>);

    it('renders', () => {
      expect(subject).toMatchSnapshot();
    });
  });

  describe('with array child', () => {
    setProp('children', () => exampleChildren);

    it('renders', () => {
      expect(subject).toMatchSnapshot();
    });

    it('renders all children', () => {
      expect(subject.children()).toHaveLength(exampleChildren.length);
    });
  });
});
