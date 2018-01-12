import React from 'react';

import CollapsibleContainer from '../../containers/CollapsibleContainer';

import { SideBarCollapsible } from './index';

const clickHandler = jest.fn();
const label = 'Nice label';

describe('SideBarCollapsible package', () => {
  argUnit(SideBarCollapsible, () => {
    setProp('children', () => React.createElement(
      'div',
      { 'data-test': 'SideBarCollapsible-children' },
      null
    ));
    setProp('id', () => 'test');
    setProp('labelComp', () => label);
    setProp('onClickToggle', () => clickHandler);

    it('should be clickable', () => {
      expect(subject.find(marker('toggle')).simulate('click'));
      expect(clickHandler).toHaveBeenCalled();
    });

    it('should display the label and the button', () => {
      expect(subject.find(marker('label'))).toHaveText(`${label}<Button />`);
    });

    it('should start closed', () => {
      expect(subject).not.toHaveClassName('SideBarCollapsible--open');
    });

    it('should not mount children', () => {
      expect(subject.find(CollapsibleContainer)).toHaveProp('alwaysMountChildren', undefined);
    });

    describe('with alwaysMountChildren', () => {
      setProp('alwaysMountChildren', () => true);

      it('should mount children', () => {
        expect(subject.find(CollapsibleContainer)).toHaveProp('alwaysMountChildren', true);
        expect(subject.find(marker('children'))).toBePresent();
      });
    });

    describe('when opened', () => {
      setProp('open', () => true);

      it('should start opened', () => {
        expect(subject).toHaveClassName('SideBarCollapsible--open');
      });
    });
  });
});
