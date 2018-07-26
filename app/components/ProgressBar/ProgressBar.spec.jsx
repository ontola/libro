/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import ProgressBar from ".";

const comp = shallow(<ProgressBar completed={2} total={4} />);

describe('ProgressBar component', () => {
  it('ProgressBar should render', () => {
    assert.equal(comp.find('.ProgressBar').length, 1, 'ProgressBar does not render');
    assert.equal(comp.find('.ProgressBar__bar-background').length, 1, 'ProgressBar__bar-background does not render');
    assert.equal(comp.find('.ProgressBar__completion-text').text(), '2/4', 'Progress not displayed correctly');
    assert.deepEqual(
      comp.find('.ProgressBar__bar').first().prop('style'),
      { width: '50%' },
      'Progress incorrect'
    );

    comp.setProps({ context: 'Context here' });
    assert.equal(comp.find('.ProgressBar__context').text(), 'Context here', 'Context not displayed correctly');
  });
});
