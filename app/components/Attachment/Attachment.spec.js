/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import Attachment from './';

const comp = mount(<Attachment
  title="Argu"
  url="http://argu.co/"
/>);

describe('Attachment component', () => {
  it('should render', () => {
    assert.equal(comp.find('.Attachment').length, 1, 'component does not render');
    assert.isAbove(comp.find('a').length, 0, 'attachment should have a link');

    comp.setProps({ hasPreview: true });
    assert.equal(
      comp.find('.Attachment__inside-button').length,
      2,
      'attachment with preview should have a previewlink'
    );

    comp.setProps({ isDownloading: false, isDownloaded: false });
    assert.equal(
      comp.find('.Attachment__inside-button').length,
      2,
      'attachment with preview should have a previewlink'
    );

    comp.setProps({ percentageDownloaded: 45 });
    assert.deepEqual(
      comp.find('.Attachment__fill').prop('style'),
      { width: '45%' },
      'attachment fill does not declare correct width'
    );
  });
});
