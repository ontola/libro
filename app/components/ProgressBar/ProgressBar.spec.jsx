import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from '.';

describe('ProgressBar component', () => {
  it('ProgressBar should render', () => {
    const comp = shallow(<ProgressBar completed={2} total={4} />);

    expect(comp.find('.ProgressBar')).toExist();
    expect(comp.find('.ProgressBar__bar-background')).toExist();
    expect(comp.find('.ProgressBar__completion-text')).toHaveText('2/4');
    expect(comp.find('.ProgressBar__bar').first()).toHaveStyle({ width: '50%' });

    comp.setProps({ context: 'Context here' });
    expect(comp.find('.ProgressBar__context')).toHaveText('Context here');
  });
});
