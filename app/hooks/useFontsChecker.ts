import React from 'react';

import { handle } from '../helpers/logging';

const TIMEOUT = 1000;

const useFontsChecker = (font: string): boolean => {
  if (!__CLIENT__) {
    return true;
  }

  const [fontLoaded, setFontLoaded] = React.useState(false);

  const loadFonts = React.useCallback(() => {
    Promise.race([
      (document as any).fonts.load(font),
      new Promise((_, reject) => setTimeout(() => reject, TIMEOUT)),
    ]).then((fonts: any[]) => {
      if (fonts.length > 0) {
        setFontLoaded(true);
      } else {
        window.setTimeout(loadFonts, TIMEOUT);
      }
    }).catch(() => {
      handle(new Error('Could not load fonts within timeout'));
    });
  }, []);

  React.useLayoutEffect(() => {
    loadFonts();
  }, []);

  return fontLoaded;
};

export default useFontsChecker;
