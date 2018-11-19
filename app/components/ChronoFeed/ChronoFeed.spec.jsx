import { mount } from 'enzyme';
import React from 'react';

import ChronoFeed from '.';

describe('ChronoFeed component', () => {
  it('ChronoFeed should render', () => {
    const comp = mount((
      <ChronoFeed
        renderItem={id => <div key={id}>{id}</div>}
        speechIds={['1', '2', '3']}
      >
        Content
      </ChronoFeed>
    ));

    expect(comp.find('.ChronoFeed')).toExist();
    expect(comp.find('.ChronoFeed .List')).toExist();
    expect(comp.find('.ChronoFeed .List > div')).toExist();
  });
});
