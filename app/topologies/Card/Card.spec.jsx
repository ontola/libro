import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { mount, shallow } from 'enzyme';

import CardActions from '../../components/Card/CardActions';
import CardContent from '../../components/Card/CardContent';
import themes from '../../themes';

import CardRow from './CardRow';

import Card from '.';

describe('Card component', () => {
  it('Card should render', () => {
    const tree = mount(
      <Card>
        Content
      </Card>
    );
    expect(tree.find(Card)).toExist();
    expect(tree.find('.Card')).toHaveText('Content');
  });

  it('CardActions should render', () => {
    const tree = shallow(
      <CardActions>
        Content
      </CardActions>
    );
    expect(tree.find('.CardActions')).toExist();
    tree.setProps({ noSpacing: true });
    expect(tree.find('.CardActions')).toHaveClassName('CardActions--no-spacing');
  });

  it('CardContent should render', () => {
    const tree = mount(
      <ThemeProvider theme={themes.common({})}>
        <CardContent noSpacing>
          Content
        </CardContent>
      </ThemeProvider>
    );
    expect(tree.find('CardContent')).toExist();
    expect(tree.find('.CardContent')).toHaveText('Content');
    expect(tree.find('.CardContent')).toHaveClassName('CardContent--no-spacing');
  });

  it('CardRow should render', () => {
    const tree = mount(
      <CardRow showArrow>
        Content
      </CardRow>
    );
    expect(tree.find('.CardRow')).toExist();
    expect(tree.find('.CardRow')).toHaveText('Content');
    expect(tree.find('.CardRow')).toHaveClassName('CardRow--show-arrow');
  });
});
