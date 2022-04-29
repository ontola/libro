import { Color, Theme } from '@mui/material';
import { Breakpoint } from '@mui/material/styles';
import { CSSProperties } from '@mui/styles';
import React from 'react';

declare module '@mui/material/index' {
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

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontSizes: {
      [K in Size]: string;
    }
  }
}

declare module '@mui/material/styles/createPalette' {
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

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    appBar: AppBarThemeOpts;
    boxShadow: {
      [K in Shadows]: string;
    };
    containerWidth: {
      [K in Size]: string;
    };
    semanticColors: {
      [index: string]: string;
    };
    zIndexFormInputButtons: number;
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

export interface IndexablePalette {
  [key: string]: Color;
  [key: number]: Color;
}

export type CSSPropertiesMap = { [key: string]: CSSProperties };
export type MaterialStyleMap = { [key: string]: CSSPropertiesMap };

/* eslint-disable @typescript-eslint/no-magic-numbers */
export enum Margin {
  'Small' = 2.7,
  'Medium' = 5.4,
  'Large' = 8.1,
  'XL' = 12,
  'XXL' = 20,
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
