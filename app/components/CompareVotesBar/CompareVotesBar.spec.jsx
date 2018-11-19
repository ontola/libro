import React from 'react';
import { shallow } from 'enzyme';

import CompareVotesBar from '.';

describe('CompareVotesBar component', () => {
  const comp = shallow((
    <CompareVotesBar
      label="Label"
      tags={[{ label: 'Tag 1' }, { label: 'Tag 2' }, { label: 'Tag 3' }]}
      totalValue={97}
    >
      child
    </CompareVotesBar>));

  it('CompareVotesBar should render', () => {
    expect(comp.find('.CompareVotesBar')).toExist();
  });
});
