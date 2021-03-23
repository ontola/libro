import { Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

export interface AppBarThemeOpts extends React.CSSProperties {
  iconBreakPoint: Breakpoint;
}

export interface LibroTheme extends Theme {
  appBar: AppBarThemeOpts;
}
