import React from 'react';
import { mount, shallow } from 'enzyme';

import CardActions from '../../components/Card/CardActions';
import CardButton from '../../components/Card/CardButton';
import CardContent from '../../components/Card/CardContent';

import CardRow from './CardRow';

import Card from '.';

describe('Card component', () => {
  it('Card should render', () => {
    const tree = mount(<Card>Content</Card>);
    expect(tree.find(Card)).toExist();
    expect(tree.find('.Card')).toHaveText('Content');
  });

  it('CardActions should render', () => {
    const tree = shallow(<CardActions>Content</CardActions>);
    expect(tree.find('.CardActions')).toExist();
    tree.setProps({ noSpacing: true });
    expect(tree.find('.CardActions')).toHaveClassName('CardActions--no-spacing');
  });

  it('CardButton should render', () => {
    const spy = jest.fn();
    const tree = mount(<CardButton action={spy} type="yes">Click here</CardButton>);
    expect(tree.find('button.Button')).toExist();
    expect(tree.find('button.Button')).toHaveText('Click here');
    expect(tree.find('button.Button')).toHaveClassName('Button--has-icon');
    expect(tree.find('.fa')).toHaveClassName('fa-thumbs-up');

    tree.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('CardContent should render', () => {
    const tree = mount(<CardContent noSpacing>Content</CardContent>);
    expect(tree.find('CardContent')).toExist();
    expect(tree.find('.CardContent')).toHaveText('Content');
    expect(tree.find('.CardContent')).toHaveClassName('CardContent--no-spacing');
  });

  it('CardRow should render', () => {
    const tree = mount(<CardRow showArrow>Content</CardRow>);
    expect(tree.find('CardRow')).toExist();
    expect(tree.find('.CardRow')).toHaveText('Content');
    expect(tree.find('.CardRow')).toHaveClassName('CardRow--show-arrow');
  });
});
