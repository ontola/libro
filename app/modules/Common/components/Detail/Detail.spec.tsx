/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { imageQueries, render } from '../../../../../tests/test-utils';

import Detail, { DetailProps } from './index';

describe('Detail', () => {
  const testId = 'Detail';

  const renderComp = (props: Partial<DetailProps> = {}) => render((
    <MemoryRouter>
      <Detail
        {...props}
      />
    </MemoryRouter>
  ));

  it('renders', async () => {
    const { container, queryByTestId } = await renderComp();

    expect(queryByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('span.fa')).toBeNull();
    expect(queryByTestId('Detail-text')).not.toBeInTheDocument();
  });

  describe('with url', () => {
    it('should be an anchor', async () => {
      const { getByTestId } = await renderComp({ url: 'http://example.org/' });
      expect(getByTestId(testId)).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('with text', () => {
    const props = { text: 'Some text' };

    it('should be a div', async () => {
      const { getByTestId } = await renderComp(props);
      expect(getByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    });

    it('should not render an image', async () => {
      const { container } = await renderComp(props);
      expect(container.querySelector('img')).toBeNull();
    });

    it('should not render an icon', async () => {
      const { container } = await renderComp(props);
      expect(container.querySelector('span.fa')).toBeNull();
    });

    it('should render text', async () => {
      const { getByText } = await renderComp(props);
      expect(getByText('Some text')).toBeVisible();
    });
  });

  describe('with a title', () => {
    const props = { title: 'A title' };

    it('should have a label when hovered', async () => {
      const { getByTestId, findByRole, findByTestId } = await renderComp(props);
      fireEvent.mouseOver(getByTestId('Detail'));

      const wrapper = await findByTestId('Detail');
      const tooltip = await findByRole('tooltip');

      expect(tooltip.children[0]).toHaveTextContent('A title');
      expect(tooltip.getAttribute('id')).toEqual(wrapper.getAttribute('aria-describedby'));
    });
  });

  describe('with an image', () => {
    const props = {
      imageUrl: rdf.namedNode('http://example.org/photo.jpg'),
      title: 'A description',
    };

    it('should be a div', async () => {
      const { getByTestId } = await renderComp(props);
      expect(getByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render an image', async () => {
      const { getByImgSrc } = await render((
        <MemoryRouter>
          <Detail
            {...props}
          />
        </MemoryRouter>
      ), {
        queries: imageQueries,
      });

      expect(getByImgSrc('http://example.org/photo.jpg')).toBeVisible();
    });
  });

  describe('with an icon', () => {
    const props = { icon: 'check' };

    it('should be a div', async () => {
      const { getByTestId } = await renderComp(props);
      expect(getByTestId(testId)).toBeInstanceOf(HTMLDivElement);
    });

    it('should render an icon', async () => {
      const { container } = await renderComp(props);
      expect(container.querySelector('span.fa')).toBeVisible();
      expect(container.querySelector('span.fa')).toHaveClass('fa-check');
    });
  });

  describe('with icon and image', () => {
    const props = {
      icon: 'check',
      imageUrl: rdf.namedNode('http://example.org/photo.jpg'),
    };

    it('should not render an image', async () => {
      const { container } = await renderComp(props);
      expect(container.querySelector('img')).toBeNull();
    });

    it('should render an icon', async () => {
      const { container } = await renderComp(props);
      expect(container.querySelector('span.fa')).toBeVisible();
      expect(container.querySelector('span.fa')).toHaveClass('fa-check');
    });
  });
});
