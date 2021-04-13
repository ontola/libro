import { Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

import { Size } from '../components/shared/config';

declare module '@material-ui/core/styles/createPalette' {
  interface Color {
    dark: string;
    midDark: string;
    main: string;
    midLight: string;
    light: string;
    xLight: string;
    xxLight: string;
    xxLightForegroundSmall: string;
    xxLightForegroundLarge: string;
  }

  interface LinkOptions {
    header: string;
    text: string;
  }

  interface Palette {
    link: LinkOptions;
  }
}

export interface AppBarThemeOpts extends React.CSSProperties {
  iconBreakPoint: Breakpoint;
}

export interface LibroTheme extends Theme {
  appBar: AppBarThemeOpts;
  containerWidth: {
    [K in Size]: string
  }
}
