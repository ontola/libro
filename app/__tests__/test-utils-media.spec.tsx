/**
 * @jest-environment jsdom
 */

import useMediaQuery from '@mui/material/useMediaQuery';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  ScreenWidth,
  hoverCapable,
  mockMedia,
  screenWidth,
} from '../../tests/test-utils-media';

enum Result {
  Match = 'true',
  NoMatch = 'false',
}

interface HoverAssertProps {
  query: string;
}

const TEST_ID = 'result';

const HoverAssert: React.FC<HoverAssertProps> = ({ query }) => {
  const matches = useMediaQuery(query);

  return (
    <span data-testid={TEST_ID}>
      {matches ? Result.Match : Result.NoMatch}
    </span>
  );
};

const result = () => screen.getByTestId(TEST_ID);

describe('test-utils-media', () => {
  afterEach(() => {
    mockMedia();
  });

  describe('screenSize', () => {
    it('should always be false when no mock is used', () => {
      const { rerender } = render(<HoverAssert query="(min-width: 1px)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);

      rerender(<HoverAssert query="(min-width: 100000px)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);
    });

    it('should match media query when mocked', () => {
      mockMedia(screenWidth(ScreenWidth.MD));
      const { rerender } = render(<HoverAssert query="(min-width: 1px)" />);

      expect(result()).toHaveTextContent(Result.Match);

      rerender(<HoverAssert query="(min-width: 700px)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);

      mockMedia(screenWidth(ScreenWidth.LG));
      rerender(<HoverAssert query="(min-width: 700px)" />);

      expect(result()).toHaveTextContent(Result.Match);

    });
  });

  describe('hoverCapable', () => {
    it('should always be false when no mock is used', () => {
      const { rerender } = render(<HoverAssert query="(hover: hover)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);

      rerender(<HoverAssert query="(hover: none)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);
    });

    it('should match media query when mocked', () => {
      mockMedia(hoverCapable(true));
      const { rerender } = render(<HoverAssert query="(hover: hover)" />);

      expect(result()).toHaveTextContent(Result.Match);

      rerender(<HoverAssert query="(hover: none)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);

      mockMedia(hoverCapable(false));
      rerender(<HoverAssert query="(hover: hover)" />);

      expect(result()).toHaveTextContent(Result.NoMatch);

      rerender(<HoverAssert query="(hover: none)" />);

      expect(result()).toHaveTextContent(Result.Match);
    });
  });

  it('should cleanup properly', () => {
    mockMedia(screenWidth(ScreenWidth.SM));
    const { rerender } = render(<HoverAssert query="(min-width: 1px)" />);

    expect(result()).toHaveTextContent(Result.Match);

    mockMedia();
    rerender(<HoverAssert query="(min-width: 1px)" />);

    expect(result()).toHaveTextContent(Result.NoMatch);
  });

  it('combines multiple mocks', () => {
    mockMedia(screenWidth(ScreenWidth.MD), hoverCapable(false));
    const { rerender } = render(<HoverAssert query="(hover: hover)" />);

    expect(result()).toHaveTextContent(Result.NoMatch);

    rerender(<HoverAssert query="(min-width: 600)" />);

    expect(result()).toHaveTextContent(Result.Match);
  });
});
