import { Color, Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { CSSProperties } from '@material-ui/styles';
import React from 'react';

declare module '@material-ui/core/index' {
  interface Color {
    xDark: string;
    dark: string;
    midDark: string;
    main: string;
    midLight: string;
    light: string;
    light7: string
    light85: string;
    xLight: string;
    xxLight: string;
    xxLightForegroundSmall: string;
    xxLightForegroundLarge: string;
  }
}

interface MapIcon {
  background: string,
  backgroundHover: string,
  text: string,
}

declare module '@material-ui/core/styles/createTypography' {
  interface FontStyle {
    fontSizes: {
      [K in Size]: string;
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface LinkOptions {
    header: string;
    text: string;
  }

  type Colors = {
    [K in ColorNames]: Color;
  };

  interface Palette extends Colors {
    link: LinkOptions;
    mapIcon: MapIcon;
  }
}

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    appBar: AppBarThemeOpts;
    boxShadow: {
      [K in Shadows]: string;
    };
    containerWidth: {
      [K in Size]: string;
    };
    mediaQueries: {
      largeAndAbove: string;
      micro: string;
      smallAndAbove: string;
      smallAndBelow: string;
      smallOnly: string;
      smallestOnly: string;
    }
    semanticColors: {
      [index: string]: string;
    };
    zIndexHoverBox: number;
    zIndexLoader: number;
    zIndexOverlay: number;
    greyBorder: string;
  }
}

export interface AppBarThemeOpts extends React.CSSProperties {
  background: string;
  iconBreakPoint: Breakpoint;
  resolveColor: () => string | undefined;
}

export type LibroTheme = Theme;

export type CSSPropertiesMap = { [key: string]: CSSProperties };
export type MaterialStyleMap = { [key: string]: CSSPropertiesMap };

/* eslint-disable @typescript-eslint/no-magic-numbers */
export enum Margin {
  'Small' = 2.7,
  'Medium' = 5.4,
  'Large' = 8.1,
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

export enum Size {
  XSmall = 'xSmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xLarge',
  XXLarge = 'xxLarge',
  XXXLarge = 'xxxLarge',
}

export enum Shadows {
  Transparent = 'transparent',
  Base = 'base',
  Intense = 'intense',
  Inside = 'inside',
  Crazy = 'crazy',
}

enum ColorNames {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
  Pink = 'pink',
  Red = 'red',
  Transparent = 'transparent',
  Orange = 'orange',
}
