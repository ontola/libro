/**
 * @jest-environment jsdom
 */

import {
  fireEvent,
  render,
} from '@testing-library/react';
import React from 'react';

import BlurButton from './index';

describe('BlurButton', () => {
  const clickHandler = jest.fn();

  it('should render', () => {
    render(<BlurButton onClick={clickHandler} />);

    expect(clickHandler).not.toHaveBeenCalled();
  });

  it('should blur when clicked', () => {
    const { getByTitle } = render((
      <BlurButton
        title="btn"
        onClick={clickHandler}
      />
    ));

    const btn = getByTitle('btn');
    const blur = jest.spyOn(btn, 'blur');

    fireEvent.click(btn);

    expect(clickHandler).toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();
  });

  it('should not blur when press enter', () => {
    const { getByTitle } = render((
      <BlurButton
        title="btn"
        onClick={clickHandler}
      />
    ));

    const btn = getByTitle('btn');
    const blur = jest.spyOn(btn, 'blur');

    fireEvent.keyPress(btn, { keyCode: 26 });

    expect(clickHandler).toHaveBeenCalled();
    expect(blur).not.toHaveBeenCalled();
  });

  it('should call onClick', () => {
    const { getByTitle } = render((
      <BlurButton
        title="btn"
        onClick={clickHandler}
      />
    ));

    const btn = getByTitle('btn');

    fireEvent.click(btn);

    expect(clickHandler).toHaveBeenCalled();
  });
});
