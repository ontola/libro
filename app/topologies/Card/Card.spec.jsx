import { ThemeProvider } from '@material-ui/styles';
import { mount, shallow } from 'enzyme';
import React from 'react';

import CardActions from '../../components/Card/CardActions';
import CardContent, { cardContentClassIdentifier } from '../../components/Card/CardContent';
import themes from '../../themes';

import CardRow, {
  cardRowBackdropClassIdentifier,
  cardRowClassIdentifier,
} from './CardRow';
import { cardClassIdentifier } from './sharedCardStyles';

import Card from './';

describe('Card component', () => {
  it('Card should render', () => {
    const tree = mount(
      <ThemeProvider theme={themes.common({})}>
        <Card>
          Content
        </Card>
      </ThemeProvider>
    );
    expect(tree.find(`.${cardClassIdentifier}`)).toExist();
    expect(tree.find(`.${cardClassIdentifier}`)).toHaveText('Content');
  });

  it('CardActions should render', () => {
    const tree = shallow(
      <ThemeProvider theme={themes.common({})}>
        <CardActions>
          Content
        </CardActions>
      </ThemeProvider>
    );
    expect(tree.find(CardActions)).toExist();
  });

  it('CardContent should render', () => {
    const tree = mount(
      <ThemeProvider theme={themes.common({})}>
        <CardContent>
          Content
        </CardContent>
      </ThemeProvider>
    );
    expect(tree.find(`.${cardContentClassIdentifier}`)).toExist();
    expect(tree.find(`.${cardContentClassIdentifier}`)).toHaveText('Content');
  });

  it('CardRow should render', () => {
    const tree = mount(
      <ThemeProvider theme={themes.common({})}>
        <CardRow backdrop>
          Content
        </CardRow>
      </ThemeProvider>
    );
    expect(tree.find(`.${cardRowClassIdentifier}`)).toExist();
    expect(tree.find(`.${cardRowClassIdentifier}`)).toHaveText('Content');
    expect(tree.find(`.${cardRowClassIdentifier}`)).toHaveClassName(cardRowBackdropClassIdentifier);
  });
});
