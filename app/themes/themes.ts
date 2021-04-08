import { Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

import { Size } from '../components/shared/config';

declare module '@material-ui/core/index' {
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
}

declare module '@material-ui/core/styles/createPalette' {
  interface LinkOptions {
    header: string;
    text: string;
  }

  interface Palette {
    link: LinkOptions;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appBar: AppBarThemeOpts;
    containerWidth: {
      [K in Size]: string
    }
  }
}

export interface AppBarThemeOpts extends React.CSSProperties {
  iconBreakPoint: Breakpoint;
}

export type LibroTheme = Theme;

/* eslint-disable @typescript-eslint/no-magic-numbers */
export enum Margin {
  'Small' = 2.5,
  'Medium' = 5,
  'Large' = 7.5,
}
/* eslint-enable @typescript-eslint/no-magic-numbers */
