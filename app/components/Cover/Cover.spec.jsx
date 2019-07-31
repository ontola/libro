import React from 'react';

import { cleanup, render } from '../../test-utils';

import Cover from './index';

describe('Cover component', () => {
  afterEach(cleanup);

  it('should have no background by default', () => {
    const { getByTestId } = render(<Cover>Content</Cover>);

    expect(getByTestId('cover')).toHaveStyle('background-image: none;');
  });

  it('should set a background url', () => {
    const { getByTestId } = render(<Cover image="http://placehold.it/50x50">Content</Cover>);

    expect(getByTestId('cover')).toHaveStyle('background-image: url(http://placehold.it/50x50);');
  });
});
