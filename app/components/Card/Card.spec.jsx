/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';

import CardActions from './CardActions';
import CardButton from './CardButton';
import CardContent from './CardContent';
import CardRow from './CardRow';

import Card from './index';

describe('Card component', () => {
  it('Card should render', () => {
    const comp = shallow(<Card>Content</Card>);
    assert.equal(comp.find('.Card').length, 1, 'card does not render');
    assert.equal(comp.find('.Card').text(), 'Content', 'card does not render children correctly');
  });

  it('CardActions should render', () => {
    const comp = shallow(<CardActions>Content</CardActions>);
    assert.equal(comp.find('.CardActions').length, 1, 'card does not render');
    comp.setProps({ noSpacing: true });
    assert.isTrue(
      comp.find('.CardActions').hasClass('CardActions--no-spacing'),
      'card does not render children correctly'
    );
  });

  it('CardButton should render', () => {
    const spy = sinon.spy(() => undefined);
    const comp = mount(<CardButton action={spy} type="yes">Click here</CardButton>);
    assert.equal(comp.find('button.Button').length, 1, 'cardbutton does not render');
    assert.equal(comp.find('button.Button').text(), 'Click here', 'cardbutton does not render children correctly');
    assert.isTrue(comp.find('button.Button').hasClass('Button--has-icon'), 'button has class to show icon state');
    assert.isTrue(comp.find('.fa').hasClass('fa-thumbs-up'), 'button displays correct icon');

    comp.simulate('click');
    assert.isTrue(spy.called, 'Button click does not respond');
  });

  it('CardContent should render', () => {
    const comp = shallow(<CardContent noSpacing>Content</CardContent>);
    assert.equal(comp.find('.CardContent').length, 1, 'CardContent does not render');
    assert.equal(comp.find('.CardContent').text(), 'Content', 'CardContent does not render children correctly');
    assert.isTrue(comp.find('.CardContent').first().hasClass('CardContent--no-spacing'), 'CardContent has no noSpacing');
  });

  it('CardRow should render', () => {
    const comp = shallow(<CardRow showArrow>Content</CardRow>);
    assert.equal(comp.find('.CardRow').length, 1, 'CardRow does not render');
    assert.equal(comp.find('.CardRow').text(), 'Content', 'CardRow does not render children correctly');
    assert.isTrue(comp.find('.CardRow').first().hasClass('CardRow--show-arrow'), 'CardRow has no noSpacing');
  });
});
