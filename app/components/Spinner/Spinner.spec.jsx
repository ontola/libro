import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '.';

describe('Spinner component', () => {
  it('Spinner should render', () => {
    const comp = shallow(<Spinner loading />);

    expect(comp.find('.Spinner')).toExist();
    expect(comp.find('.Spinner').first()).toHaveClassName('Spinner--loading');
  });
});
