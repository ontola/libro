/* @jest-environment jsdom */

import React from 'react';

import { render } from '../../../../../tests/test-utils';
import TableCell from '../TableCell';
import TableModule from '../../index';

describe('TableCell', () => {
  it('renders the children', async () => {
    const { findByText } = await render((
      <table>
        <tbody>
          <tr>
            <TableCell>
              child
            </TableCell>
          </tr>
        </tbody>
      </table>
    ), { modules: [TableModule] });

    expect(await findByText('child')).toBeVisible();
  });
});
