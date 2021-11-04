/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import Markdown from '.';

describe('Markdown component', () => {
  it('Markdown should render highlight in uppercase', () => {
    const { getByText } = render((
      <Markdown
        highlightedText="down str"
        text="markdown string"
      />
    ));

    expect(getByText('DOWN STR')).toBeVisible();
  });
});
