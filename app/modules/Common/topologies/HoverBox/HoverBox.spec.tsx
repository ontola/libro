/**
 * @jest-environment jsdom
 */

import userEvent from '@testing-library/user-event';
import React from 'react';

import { act, render } from '../../../../../tests/test-utils';
import { hoverCapable, mockMedia } from '../../../../../tests/test-utils-media';

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

  it('should show the children', async () => {
    const { getAllByTestId } = await renderComp(props);
    expect(getAllByTestId('always')[0]).toBeVisible();
  });

  it('should not show the hidden children', async () => {
    mockMedia(hoverCapable(true));
    const { queryByTestId } = await renderComp(props);
    expect(queryByTestId('sometimes')).not.toBeInTheDocument();
  });

  describe('when focused', () => {
    it('should show the children', async () => {
      mockMedia(hoverCapable(true));
      const { getByTestId, getAllByTestId } = await renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', async () => {
      mockMedia(hoverCapable(true));
      const { getByTestId } = await renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when hovering', () => {
    it('should show the children', async () => {
      mockMedia(hoverCapable(true));
      const { getAllByTestId, getByTestId } = await renderComp(props);
      await userEvent.hover(getByTestId('HoverBox-trigger'));
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', async () => {
      mockMedia(hoverCapable(true));
      const { getByTestId } = await renderComp(props);
      await userEvent.hover(getByTestId('HoverBox-trigger'));
      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when losing focus', () => {
    it('should show the children', async () => {
      mockMedia(hoverCapable(true));
      const { getByTestId, getAllByTestId } = await renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', async () => {
      mockMedia(hoverCapable(true));
      const { getByTestId } = await renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when losing focus', () => {
    it('should show the children', async () => {
      mockMedia(hoverCapable(true));
      const { getAllByTestId, getByTestId } = await renderComp(props);
      getByTestId('HoverBox-trigger').focus();
      expect(getAllByTestId('always')[0]).toBeVisible();

      getByTestId('HoverBox-trigger').blur();
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', async () => {
      mockMedia(hoverCapable(true));
      const { queryByTestId, getByTestId } = await renderComp(props);
      getByTestId('HoverBox-trigger').focus();
      expect(getByTestId('sometimes')).toBeVisible();

      getByTestId('HoverBox-trigger').blur();
      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });

  describe('when hover exited', () => {
    it('should show the children', async () => {
      mockMedia(hoverCapable(true));
      const { getAllByTestId, getByTestId } = await renderComp(props);

      await userEvent.unhover(getByTestId('HoverBox-trigger'));

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', async () => {
      mockMedia(hoverCapable(true));
      const { getByTestId, queryByTestId } = await renderComp(props);

      await userEvent.unhover(getByTestId('HoverBox-trigger'));

      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });

  describe('non hover capable device', () => {
    it('should show the hidden children', async () => {
      mockMedia(hoverCapable(false));
      const { getByTestId, queryByTestId } = await renderComp(props);
      const triggerElement = getByTestId('HoverBox-trigger');

      expect(queryByTestId('sometimes')).not.toBeInTheDocument();

      act(() => {
        triggerElement.focus();
      });

      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });
});
