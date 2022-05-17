import Looks3 from '@material-ui/icons/Looks3';
import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  HeadingPluginOptions,
  HeadingPlugin as headingPluginBase,
} from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands';
import { ElementButton } from '../../components/ElementButton';
import { ButtonOptions, CommandPlugin } from '../types';

export const HEADING1_COMMAND_KEY = 'formatHeading1';
export const HEADING2_COMMAND_KEY = 'formatHeading2';
export const HEADING3_COMMAND_KEY = 'formatHeading3';

export interface HeadingCommands extends Commands {
  [HEADING1_COMMAND_KEY]: Command;
  [HEADING2_COMMAND_KEY]: Command;
  [HEADING3_COMMAND_KEY]: Command;
}

export type HeadingCommandPlugin = CommandPlugin<HeadingCommands>;

export type HeadingCommandPluginOptions = HeadingPluginOptions & {
  h1: ButtonOptions;
  h2: ButtonOptions;
  h3: ButtonOptions;
};

export const headingPlugin = (options?: HeadingCommandPluginOptions): HeadingCommandPlugin => ({
  ...headingPluginBase(options),
  commands: {
    [HEADING1_COMMAND_KEY]: {
      button:
  <ElementButton
    id={HEADING1_COMMAND_KEY}
    key={HEADING1_COMMAND_KEY}
    title={options?.h1.buttonTitle || 'Heading level 1'}
    type={options?.h1?.type || ELEMENT_H1}
  >
    <LooksOne />
  </ElementButton>,
    },

    [HEADING2_COMMAND_KEY]: {
      button:
  <ElementButton
    id={HEADING2_COMMAND_KEY}
    key={HEADING2_COMMAND_KEY}
    title={options?.h2.buttonTitle || 'Heading level 2'}
    type={options?.h2?.type || ELEMENT_H2}
  >
    <LooksTwo />
  </ElementButton>,
    },

    [HEADING3_COMMAND_KEY]: {
      button:
  <ElementButton
    id={HEADING3_COMMAND_KEY}
    key={HEADING3_COMMAND_KEY}
    title={options?.h3.buttonTitle || 'Heading level 3'}
    type={options?.h3?.type || ELEMENT_H3}
  >
    <Looks3 />
  </ElementButton>,
    },
  },
});
