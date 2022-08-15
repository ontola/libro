/* @jest-environment jsdom */

import React from 'react';

import { render } from '../../../../../tests/test-utils';
import Table from '../Table';
import TableModule from '../../index';

describe('Table', () => {
  it('renders the children', async () => {
    const { findByText } = await render((
      <Table>
        <tbody>
          <tr>
            <td>
              child
            </td>
          </tr>
        </tbody>
      </Table>
    ), { modules: [TableModule] });

    expect(await findByText('child')).toBeVisible();
  });
});
