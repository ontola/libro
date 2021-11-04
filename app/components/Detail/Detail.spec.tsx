/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import React from 'react';

import { render } from '../../test-utils';

import Detail, { DetailProps } from './index';

describe('Detail', () => {
  const testId = 'Detail';

  const renderComp = (props: Partial<DetailProps> = {}) => render((
    <Detail
      {...props}
    />
  ));

  it('renders', () => {
    const { container, queryByTestId } = renderComp();

    expect(queryByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('span.fa')).toBeNull();
    expect(queryByTestId('Detail-text')).not.toBeInTheDocument();
  });

  describe('with url', () => {
    it('should be an anchor', () => {
      const { getByTestId } = renderComp({ url: 'http://example.org/' });
      expect(getByTestId(testId)).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('with text', () => {
    const props = { text: 'Some text' };

    it('should be a div', () => {
      const { getByTestId } = renderComp(props);
      expect(getByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    });

    it('should not render an image', () => {
      const { container } = renderComp(props);
      expect(container.querySelector('img')).toBeNull();
    });

    it('should not render an icon', () => {
      const { container } = renderComp(props);
      expect(container.querySelector('span.fa')).toBeNull();
    });

    it('should render text', () => {
      const { getByText } = renderComp(props);
      expect(getByText('Some text')).toBeVisible();
    });
  });

  describe('with an image', () => {
    const props = {
      imageUrl: rdf.namedNode('http://example.org/photo.jpg'),
      title: 'A description',
    };

    it('should be a div', () => {
      const { getByTestId } = renderComp(props);
      expect(getByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render an image', () => {
      const { getByLabelText } = renderComp(props);
      expect(getByLabelText(props.title)).toBeInstanceOf(HTMLImageElement);
    });

    it('should have the correct url', () => {
      const { getByLabelText } = renderComp(props);
      expect(getByLabelText(props.title)).toHaveAttribute('src', 'http://example.org/photo.jpg');
    });
  });

  describe('with an icon', () => {
    const props = { icon: 'check' };

    it('should be a div', () => {
      const { getByTestId } = renderComp(props);
      expect(getByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render an icon', () => {
      const { container } = renderComp(props);
      expect(container.querySelector('span.fa')).toBeVisible();
      expect(container.querySelector('span.fa')).toHaveClass('fa-check');
    });
  });

  describe('with icon and image', () => {
    const props = {
      icon: 'check',
      imageUrl: rdf.namedNode('http://example.org/photo.jpg'),
    };

    it('should not render an image', () => {
      const { container } = renderComp(props);
      expect(container.querySelector('img')).toBeNull();
    });

    it('should render an icon', () => {
      const { container } = renderComp(props);
      expect(container.querySelector('span.fa')).toBeVisible();
      expect(container.querySelector('span.fa')).toHaveClass('fa-check');
    });
  });
});
