import { mount } from 'enzyme';
import React from 'react';

import Collapsible from './';

const spy = jest.fn();
const notOpened = jest.fn();
const getComp = props => mount((
  <Collapsible
    hideChildren={false}
    notOpened={notOpened}
    trigger={<span>Click here</span>}
    visibleContent={<span>Content</span>}
    onClickToggle={spy}
    {...props}
  >
    Hoi
  </Collapsible>
));

describe('Collapsible component', () => {
  it('should render', () => {
    const comp = getComp();

    expect(comp.find('.Collapsible')).toBePresent();
    expect(comp.find('.Collapsible__trigger span').first().html()).toEqual('<span>Click here</span>');
    expect(comp.find('.Collapsible__visible-content span').first().html()).toEqual('<span>Content</span>');

    comp.setProps({ opened: true });
    expect(comp.find('.Collapsible__invisible-content').first()).toHaveText('Hoi');

    comp.find('.Collapsible__trigger').first().simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should not display a preview', () => {
    expect(getComp().find('Collapse')).toHaveProp('theme', undefined);
  });

  describe('with preview', () => {
    it('should display a preview', () => {
      const comp = getComp({ preview: true });

      expect(comp.find('Collapse'))
        .toHaveProp('theme', { container: 'Collapsible__container--preview' });
    });
  });
});
