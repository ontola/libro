/* @jest-environment jsdom */

import React from 'react';

import { render } from '../../../../../tests/test-utils';
import TableRow from '../TableRow';
import TableModule from '../../index';

describe('TableRow', () => {
  it('renders the children', async () => {
    const { findByText } = await render((
      <table>
        <tbody>
          <TableRow>
            <td>
              child
            </td>
          </TableRow>
        </tbody>
      </table>
    ), { modules: [TableModule] });

    expect(await findByText('child')).toBeVisible();
  });
});
