/**
 * @jest-environment jsdom
 */

import userEvent from '@testing-library/user-event';
import React from 'react';

import { act, render } from '../../test-utils';
import { hoverCapable, mockMedia } from '../../test-utils-media';

import HoverBox, { HoverBoxProps } from './index';

describe('HoverBox', () => {
  const renderComp = (props: HoverBoxProps) => render((
    <HoverBox
      {...props}
    />
  ));

  const props = {
    children: <span data-testid="always" />,
    hiddenChildren: <span data-testid="sometimes" />,
  };

  afterEach(() => {
    mockMedia();
  });

  it('should show the children', () => {
    const { getAllByTestId } = renderComp(props);
    expect(getAllByTestId('always')[0]).toBeVisible();
  });

  it('should not show the hidden children', () => {
    mockMedia(hoverCapable(true));
    const { queryByTestId } = renderComp(props);
    expect(queryByTestId('sometimes')).not.toBeInTheDocument();
  });

  describe('when focused', () => {
    it('should show the children', () => {
      mockMedia(hoverCapable(true));
      const { getByTestId, getAllByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      mockMedia(hoverCapable(true));
      const { getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when hovering', () => {
    it('should show the children', () => {
      mockMedia(hoverCapable(true));
      const { getAllByTestId, getByTestId } = renderComp(props);
      userEvent.hover(getByTestId('HoverBox-trigger'));
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      mockMedia(hoverCapable(true));
      const { getByTestId } = renderComp(props);
      userEvent.hover(getByTestId('HoverBox-trigger'));
      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when losing focus', () => {
    it('should show the children', () => {
      mockMedia(hoverCapable(true));
      const { getByTestId, getAllByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      mockMedia(hoverCapable(true));
      const { getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when losing focus', () => {
    it('should show the children', () => {
      mockMedia(hoverCapable(true));
      const { getAllByTestId, getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();
      expect(getAllByTestId('always')[0]).toBeVisible();

      getByTestId('HoverBox-trigger').blur();
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      mockMedia(hoverCapable(true));
      const { queryByTestId, getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();
      expect(getByTestId('sometimes')).toBeVisible();

      getByTestId('HoverBox-trigger').blur();
      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });

  describe('when hover exited', () => {
    it('should show the children', () => {
      mockMedia(hoverCapable(true));
      const { getAllByTestId, getByTestId } = renderComp(props);

      userEvent.unhover(getByTestId('HoverBox-trigger'));

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      mockMedia(hoverCapable(true));
      const { getByTestId, queryByTestId } = renderComp(props);
      userEvent.unhover(getByTestId('HoverBox-trigger'));
      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });

  describe('non hover capable device', () => {
    it('should show the hidden children', () => {
      mockMedia(hoverCapable(false));
      const { getByTestId, queryByTestId } = renderComp(props);
      const triggerElement = getByTestId('HoverBox-trigger');

      expect(queryByTestId('sometimes')).not.toBeInTheDocument();

      act(() => {
        triggerElement.focus();
      });

      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });
});
