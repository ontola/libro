import mediaQuery from 'css-mediaquery';

import { SCREENSIZE } from './themes/common/theme/variables';

export enum ScreenWidth {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

type MatchMediaOptions = Partial<mediaQuery.MediaValues>;
type MediaMatcher = (query: string) => MediaQueryList;

const mediaQueryListFunctions = () => ({
  addEventListener: jest.fn(),
  addListener: () => jest.fn(),
  dispatchEvent: jest.fn(),
  onchange: null,
  removeEventListener: jest.fn(),
  removeListener: () => jest.fn(),
});

const createMatchMedia = (value: MatchMediaOptions) => (query: string): MediaQueryList => ({
  ...mediaQueryListFunctions(),
  matches: mediaQuery.match(query, value),
  media: query,
});

const failedMediaQueryList = (query: string): MediaQueryList => ({
  ...mediaQueryListFunctions(),
  matches: false,
  media: query,
});

const setMatchMedia = (matchMedia: unknown) => {
  Object.defineProperty(window, 'matchMedia', {
    value: matchMedia,
    writable: true,
  });
};

const setInnerWith = (width: number | undefined) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
    writable: true,
  });
};

const cleanup = () => {
  setMatchMedia((q: string) => failedMediaQueryList(q));
  setInnerWith(undefined);
};

/**
 * Create mock functions for [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
 * Does NOT mock media queries defined in the CSS.
 *
 * IMPORTANT! Don't forget to add an `afterEach` to your test and call `mockMedia()` to reset the mock.
 *
 * Example usage: ``mockMedia(screenWidth(ScreenWidth.SM), hoverCapable(false));``
 * @param matchers Media query matchers.
 */
export const mockMedia = (...matchers: MediaMatcher[]): void => {
  if (!matchers || matchers.length === 0) {
    return cleanup();
  }

  const matchMedia = (query: string): MediaQueryList => {
    for (const matcher of matchers) {
      const result = matcher(query);

      if (result.matches) {
        return result;
      }
    }

    return failedMediaQueryList(query);
  };

  setMatchMedia(matchMedia);
};

export const screenWidth = (screenSize: ScreenWidth = ScreenWidth.SM): MediaMatcher => {
  const width = SCREENSIZE[screenSize];

  setInnerWith(width);

  return createMatchMedia({ width });
};

export const hoverCapable = (hasHover = false): MediaMatcher => {
  // css-mediaquery does not support `hover` so we have to mock this manually.
  // Might be worth checking out this fork of css-mediaquery: https://github.com/fosscord/css-mediaquery
  const match = (query: string): boolean => {
    if (query === '(hover: hover)' && hasHover) {
      return true;
    }

    if (query === '(hover: none)' && !hasHover) {
      return true;
    }

    return false;
  };

  return (query: string): MediaQueryList => ({
    ...mediaQueryListFunctions(),
    matches: match(query),
    media: query,
  });
};

export enum PointerType {
  None = 'none',
  Fine = 'fine',
  Coarse = 'coarse',
}

export const pointerQuery = (pointer: PointerType): MediaMatcher => {
  const match = (query: string): boolean => {
    switch (query) {
    case '(pointer: none)': return pointer === PointerType.None;
    case '(pointer: fine)': return pointer === PointerType.Fine;
    case '(pointer: coarse)': return pointer === PointerType.Coarse;
    }

    return false;
  };

  return (query: string): MediaQueryList => ({
    ...mediaQueryListFunctions(),
    matches: match(query),
    media: query,
  });
};
