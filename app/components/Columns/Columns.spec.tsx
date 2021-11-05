/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import Columns from './index';

describe('Columns', () => {
  describe('with node child', () => {
    it('wraps the children', () => {
      const { container, getByText } = render((
        <Columns>
          <p>
            only
          </p>
        </Columns>
      ));

      expect(getByText('only')).toBeVisible();
      const columns = container.querySelectorAll('.Column');
      expect(columns[0]).toHaveTextContent('only');
    });
  });

  describe('with array child', () => {
    it('wraps the children', () => {
      const { container, getByText } = render((
        <Columns>
          <div key="first">
            first
          </div>
          <div key="second">
            second
          </div>
        </Columns>
      ));

      expect(getByText('first')).toBeVisible();
      expect(getByText('second')).toBeVisible();
      const columns = container.querySelectorAll('.Column');
      expect(columns[0]).toHaveTextContent('first');
      expect(columns[1]).toHaveTextContent('second');
    });
  });
});
