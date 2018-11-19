import React from 'react';
import { shallow } from 'enzyme';

import Markdown from '.';

describe('Markdown component', () => {
  it('Markdown should render', () => {
    const comp = shallow(<Markdown
      highlightedText="Joe"
      text="Joep is cool"
    />);

    expect(comp.find('.Markdown')).toExist();
  });
});
