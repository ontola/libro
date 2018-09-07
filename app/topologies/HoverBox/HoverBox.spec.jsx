import React from 'react';

import hoverBox, { propTypes } from '.';

const HoverBox = hoverBox();

argUnit(HoverBox, () => {
  set('markerNS', () => 'HoverBox');
  setProp('children', () => <span data-test="HoverBox-always" />);
  setProp('hiddenChildren', () => <span data-test="HoverBox-sometimes" />);

  it('should show the children', () => {
    expect(subject.find(marker('always'))).toExist();
  });

  it('should not show the hidden children', () => {
    expect(subject.find(marker('sometimes'))).not.toExist();
  });

  describe('when focused', () => {
    beforeEach(() => {
      subject.find(marker('trigger')).simulate('focus');
    });

    it('should show the children', () => {
      expect(subject.find(marker('always'))).toExist();
    });

    it('should show the hidden children', () => {
      expect(subject.find(marker('sometimes'))).toExist();
    });
  });

  describe('when hovering', () => {
    beforeEach(() => {
      subject.find(marker('trigger')).simulate('mouseEnter');
    });

    it('should show the children', () => {
      expect(subject.find(marker('always'))).toExist();
    });

    it('should show the hidden children', () => {
      expect(subject.find(marker('sometimes'))).toExist();
    });
  });

  describe('when losing focus', () => {
    beforeEach(() => {
      subject.find(marker('trigger')).simulate('focus');
      subject.find(marker('trigger')).simulate('blur');
    });

    it('should show the children', () => {
      expect(subject.find(marker('always'))).toExist();
    });

    it('should show the hidden children', () => {
      expect(subject.find(marker('sometimes'))).not.toExist();
    });
  });

  describe('when hover exited', () => {
    beforeEach(() => {
      subject.find(marker('trigger')).simulate('mouseEnter');
      subject.find(marker('trigger')).simulate('mouseLeave');
    });

    it('should show the children', () => {
      expect(subject.find(marker('always'))).toExist();
    });

    it('should show the hidden children', () => {
      expect(subject.find(marker('sometimes'))).not.toExist();
    });
  });
}, { link: true, mount: true, propTypes });
