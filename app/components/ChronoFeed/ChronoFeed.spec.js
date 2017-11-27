/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import ChronoFeed from './';

describe('ChronoFeed component', () => {
  it('ChronoFeed should render', () => {
    const comp = mount((
      <ChronoFeed
        renderItem={id => <div key={id}>{id}</div>}
        speechIds={[1, 2, 3]}
      >
        Content
      </ChronoFeed>
    ));
    assert.equal(comp.find('.ChronoFeed').length, 1, 'ChronoFeed does not render');
    assert.equal(comp.find('.ChronoFeed .List').length, 1, 'A list should render');
    assert.equal(comp.find('.ChronoFeed .List > div').length, 3, 'List does not have enough items');
  });
});
