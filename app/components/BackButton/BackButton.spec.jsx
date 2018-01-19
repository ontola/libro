import { shallow } from 'enzyme';
import React from 'react';
import { StaticRouter } from 'react-router';

import BackButton from './index';

const comp = () => shallow((
  <StaticRouter context={{}}>
    <BackButton link="http://argu.co/">Go back</BackButton>
  </StaticRouter>
));

describe('BackButton', () => {
  it('renders', () => {
    expect(comp()).toMatchSnapshot();
  });

  it('sets the link', () => {
    expect(shallow(<BackButton link="a" />)).toHaveProp('to', 'a');
  });
});
