/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '../../../../../tests/test-utils';

import HeadingContext from './HeadingContext';

import Heading, { HeadingSize } from './index';

describe('Heading', () => {
  it('defaults to h1', () => {
    const { getByText } = render(
      <Heading>
        headingText1
      </Heading>,
    );
    expect(getByText('headingText1').tagName).toEqual('H1');
  });

  it('renders h1', () => {
    const { getByText } = render(
      <HeadingContext>
        <Heading>
          headingText2
        </Heading>
      </HeadingContext>,
    );
    const heading1 = getByText('headingText2');

    expect(heading1.tagName).toEqual('H1');
    expect(heading1.classList.value.includes('1')).toEqual(true);
  });

  it('overrides level with size-tag', () => {
    const { getByText } = render(
      <HeadingContext>
        <HeadingContext>
          <HeadingContext>
            <Heading size={HeadingSize.LG}>
              headingText3
            </Heading>
          </HeadingContext>
        </HeadingContext>
      </HeadingContext>,
    );
    const heading3 = getByText('headingText3');

    expect(heading3.tagName).toEqual('H3');
    expect(heading3.classList.value.includes('2')).toEqual(true);
  });
});
