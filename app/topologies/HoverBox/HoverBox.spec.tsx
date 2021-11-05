/**
 * @jest-environment jsdom
 */

import userEvent from '@testing-library/user-event';
import React from 'react';

import { render } from '../../test-utils';

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

  it('should show the children', () => {
    const { getAllByTestId } = renderComp(props);
    expect(getAllByTestId('always')[0]).toBeVisible();
  });

  it('should not show the hidden children', () => {
    const { queryByTestId } = renderComp(props);
    expect(queryByTestId('sometimes')).not.toBeInTheDocument();
  });

  describe('when focused', () => {
    it('should show the children', () => {
      const { getByTestId, getAllByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      const { getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when hovering', () => {
    it('should show the children', () => {
      const { getAllByTestId, getByTestId } = renderComp(props);
      userEvent.hover(getByTestId('HoverBox-trigger'));
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      const { getByTestId } = renderComp(props);
      userEvent.hover(getByTestId('HoverBox-trigger'));
      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when losing focus', () => {
    it('should show the children', () => {
      const { getByTestId, getAllByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      const { getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();

      expect(getByTestId('sometimes')).toBeVisible();
    });
  });

  describe('when losing focus', () => {
    it('should show the children', () => {
      const { getAllByTestId, getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();
      expect(getAllByTestId('always')[0]).toBeVisible();

      getByTestId('HoverBox-trigger').blur();
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      const { queryByTestId, getByTestId } = renderComp(props);
      getByTestId('HoverBox-trigger').focus();
      expect(getByTestId('sometimes')).toBeVisible();

      getByTestId('HoverBox-trigger').blur();
      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });

  describe('when hover exited', () => {
    it('should show the children', () => {
      const { getAllByTestId, getByTestId } = renderComp(props);
      userEvent.unhover(getByTestId('HoverBox-trigger'));
      expect(getAllByTestId('always')[0]).toBeVisible();
    });

    it('should show the hidden children', () => {
      const { getByTestId, queryByTestId } = renderComp(props);
      userEvent.unhover(getByTestId('HoverBox-trigger'));
      expect(queryByTestId('sometimes')).not.toBeInTheDocument();
    });
  });
});
