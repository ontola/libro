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
    zIndexHoverBox: number;
    zIndexOverlay: number;
  }
}

export interface AppBarThemeOpts extends React.CSSProperties {
  iconBreakPoint: Breakpoint;
  resolveColor: () => string | undefined;
}

export type LibroTheme = Theme;

export type CSSPropertiesMap = { [key: string]: CSSProperties };
export type MaterialStyleMap = { [key: string]: CSSPropertiesMap };

/* eslint-disable @typescript-eslint/no-magic-numbers */
export enum Margin {
  'Small' = 2.5,
  'Medium' = 5,
  'Large' = 7.5,
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
