import React from 'react';

const useFontsChecker = () => {
  if (!__CLIENT__) {
    return true;
  }

  const [fontLoaded, setFontLoaded] = React.useState(false);

  const loadFonts = React.useCallback(() => {
    (document as any).fonts.load('normal 18px FontAwesome').then((fonts: any[]) => {
      if (fonts.length > 0) {
        setFontLoaded(true);
      } else {
        window.setTimeout(loadFonts, 1000);
      }
    });
  }, []);

  React.useLayoutEffect(() => {
    loadFonts();
  }, []);

  return fontLoaded;
};

export default useFontsChecker;
