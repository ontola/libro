import React from 'react';
import { shallow } from 'enzyme';

import Progress from '.';

describe('Progress component', () => {
  it('Progress should render', () => {
    const comp = shallow(<Progress completed={2} direction="down" total={4} />);

    expect(comp.find('.Progress')).toExist();
    expect(comp.find('.Progress--direction-down')).toExist();
    expect(comp.find('.Progress__completed').first()).toHaveStyle({ height: '50%' });
  });
});
