import React from 'react';

import Columns from '.';

const exampleChildren = [<div key={0}>Joe</div>, <div key={1}>Joe</div>];

const propTypes = {
  children: {},
};

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
}, { propTypes });
